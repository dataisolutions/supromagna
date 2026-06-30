import { createHash, randomUUID } from "node:crypto";
import Stripe from "stripe";
import { eventBySlug } from "@/lib/events";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_FILL_MS = 1_500;
const ACTIVE_STATUSES = new Set(["In programma", "Posti limitati", "In arrivo"]);

type RateEntry = { count: number; resetAt: number };

declare global {
  // Persistente solo finché l'istanza serverless rimane calda. Il WAF Vercel resta
  // la protezione autorevole distribuita tra tutte le istanze.
  var leadRateLimits: Map<string, RateEntry> | undefined;
}

const rateLimits = globalThis.leadRateLimits ?? new Map<string, RateEntry>();
globalThis.leadRateLimits = rateLimits;

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  people?: unknown;
  tables?: unknown;
  notes?: unknown;
  eventSlug?: unknown;
  page?: unknown;
  source?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  referrer?: unknown;
  landing?: unknown;
  consent?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };

  if (request.headers.get("content-type")?.split(";", 1)[0] !== "application/json") {
    return Response.json({ error: "Formato richiesta non valido." }, { status: 415, headers });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Richiesta troppo grande." }, { status: 413, headers });
  }

  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (!origin || origin !== requestOrigin) {
    return Response.json({ error: "Origine richiesta non valida." }, { status: 403, headers });
  }

  const clientKey = hashClient(request);
  if (isRateLimited(clientKey)) {
    return Response.json(
      { error: "Troppe richieste. Attendi qualche minuto e riprova." },
      { status: 429, headers: { ...headers, "Retry-After": "600" } },
    );
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Dati del modulo non validi." }, { status: 400, headers });
  }

  // Honeypot e tempo minimo: non sostituiscono il WAF, ma eliminano molti bot banali.
  if (asString(body.website, 200) || !isPlausibleFillTime(body.startedAt)) {
    return Response.json({ ok: true }, { status: 202, headers });
  }

  const validation = validateLead(body);
  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400, headers });
  }

  const event = eventBySlug(validation.data.eventSlug);
  if (!event || !ACTIVE_STATUSES.has(event.status) || event.date < todayInRome()) {
    return Response.json(
      { error: "Questo evento non è più disponibile per l'acquisto." },
      { status: 409, headers },
    );
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  const webhookApiKey = process.env.MAKE_WEBHOOK_API_KEY;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePriceId = process.env.STRIPE_PRICE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!webhookUrl || !stripeSecretKey || !stripePriceId || !baseUrl) {
    console.error("Lead API non configurata: mancano variabili ambiente server-side.");
    return Response.json(
      { error: "Prenotazione temporaneamente non disponibile. Riprova più tardi." },
      { status: 503, headers },
    );
  }

  const leadId = randomUUID();

  // Chiama Make webhook (fire-and-forget tollerante: non blocca il checkout se fallisce)
  try {
    const makeHeaders: Record<string, string> = { "Content-Type": "application/json" };
    if (webhookApiKey) makeHeaders["x-make-apikey"] = webhookApiKey;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: makeHeaders,
      body: JSON.stringify({
        leadId,
        name: validation.data.name,
        phone: validation.data.phone,
        email: validation.data.email || null,
        people: validation.data.people,
        tables: validation.data.tables,
        notes: validation.data.notes || null,
        eventTitle: event.title,
        eventDate: event.date,
        eventSlug: event.slug,
        page: validation.data.page,
        source: validation.data.source || "diretto",
        utmSource: validation.data.utmSource || null,
        utmMedium: validation.data.utmMedium || null,
        utmCampaign: validation.data.utmCampaign || null,
        referrer: validation.data.referrer || null,
        landing: validation.data.landing || null,
        status: "Checkout avviato",
        privacyConsent: true,
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Make ha rifiutato il lead.", { status: response.status });
    }
  } catch (error) {
    console.error("Errore di connessione a Make.", error instanceof Error ? error.message : "unknown");
  }

  // Crea sessione Stripe con quantità = numero di persone
  let checkoutUrl: string;
  try {
    const stripe = new Stripe(stripeSecretKey);

    // Crea un Customer con i dati del form: Stripe pre-compila nome, email e telefono
    const customer = await stripe.customers.create({
      name: validation.data.name,
      ...(validation.data.email ? { email: validation.data.email } : {}),
      phone: validation.data.phone,
      metadata: { leadId },
    });

    // Recupera prezzo/valuta dal Price ID (unica fonte di verità per l'importo),
    // ma mostra al cliente il nome dell'evento nel checkout.
    const price = await stripe.prices.retrieve(stripePriceId);
    if (price.unit_amount == null) {
      throw new Error("Il prezzo Stripe non ha un importo fisso.");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      phone_number_collection: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: price.currency,
            unit_amount: price.unit_amount,
            product_data: {
              name: event.title,
              description: `${event.dateLabel} · ${event.locationName} — quota a persona`,
            },
          },
          quantity: validation.data.people,
        },
      ],
      success_url: `${baseUrl}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${validation.data.page}`,
      metadata: {
        leadId,
        name: validation.data.name,
        phone: validation.data.phone,
        eventSlug: validation.data.eventSlug,
        tables: String(validation.data.tables),
        people: String(validation.data.people),
        source: validation.data.source || "diretto",
      },
    });

    if (!session.url) throw new Error("Stripe non ha restituito un URL di checkout.");
    checkoutUrl = session.url;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown";
    console.error("Errore Stripe.", detail);
    // DEBUG TEMPORANEO: espone il messaggio Stripe per diagnosi (i log Vercel sono off).
    return Response.json(
      { error: `Pagamento non avviato. [debug: ${detail}]` },
      { status: 502, headers },
    );
  }

  return Response.json({ ok: true, checkoutUrl }, { status: 201, headers });
}

function validateLead(body: LeadPayload):
  | { ok: false; error: string }
  | {
      ok: true;
      data: {
        name: string;
        phone: string;
        email: string;
        people: number;
        tables: number;
        notes: string;
        eventSlug: string;
        page: string;
        source: string;
        utmSource: string;
        utmMedium: string;
        utmCampaign: string;
        referrer: string;
        landing: string;
      };
    } {
  const name = asString(body.name, 100);
  const phone = asString(body.phone, 30);
  const email = asString(body.email, 254).toLowerCase();
  const notes = asString(body.notes, 1_000);
  const eventSlug = asString(body.eventSlug, 160);
  const page = asString(body.page, 300);
  const source = asString(body.source, 100);
  const utmSource = asString(body.utmSource, 100);
  const utmMedium = asString(body.utmMedium, 100);
  const utmCampaign = asString(body.utmCampaign, 150);
  const referrer = asString(body.referrer, 300);
  const landing = asString(body.landing, 300);
  const people = asInteger(body.people);
  const tables = asInteger(body.tables);

  if (name.length < 2) return { ok: false, error: "Inserisci il tuo nome." };
  if (!/^[+()\d\s.-]{7,30}$/.test(phone)) return { ok: false, error: "Inserisci un numero di telefono valido." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Inserisci un indirizzo email valido." };
  }
  if (!Number.isInteger(people) || people < 1 || people > 10) {
    return { ok: false, error: "Il numero di partecipanti deve essere compreso tra 1 e 10." };
  }
  if (!Number.isInteger(tables) || tables < 1 || tables > 50) {
    return { ok: false, error: "Inserisci un numero di tavole valido." };
  }
  if (tables > people) {
    return { ok: false, error: "Il numero di tavole non può superare il numero di partecipanti." };
  }
  if (!eventSlug || !page.startsWith("/eventi/") || body.consent !== true) {
    return { ok: false, error: "Controlla i dati e accetta la privacy policy." };
  }

  return {
    ok: true,
    data: { name, phone, email, people, tables, notes, eventSlug, page, source, utmSource, utmMedium, utmCampaign, referrer, landing },
  };
}

function asString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function asInteger(value: unknown) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isInteger(parsed) ? parsed : Number.NaN;
}

function isPlausibleFillTime(value: unknown) {
  const startedAt = typeof value === "number" ? value : Number(value);
  return Number.isFinite(startedAt) && Date.now() - startedAt >= MIN_FORM_FILL_MS && Date.now() - startedAt < 86_400_000;
}

function hashClient(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim() ?? "unknown";
  const salt = process.env.LEAD_RATE_LIMIT_SALT ?? "unconfigured";
  return createHash("sha256").update(`${salt}:${forwarded}`).digest("hex");
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    if (rateLimits.size > 1_000) {
      for (const [entryKey, entry] of rateLimits) {
        if (entry.resetAt <= now) rateLimits.delete(entryKey);
      }
    }
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function todayInRome() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
