import { createHash, randomUUID } from "node:crypto";
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
  utmSource?: unknown;
  utmCampaign?: unknown;
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
  const checkoutUrl = process.env.STRIPE_EVENT_PAYMENT_URL;

  if (!webhookUrl || !webhookApiKey || !checkoutUrl) {
    console.error("Lead API non configurata: mancano variabili ambiente server-side.");
    return Response.json(
      { error: "Prenotazione temporaneamente non disponibile. Riprova più tardi." },
      { status: 503, headers },
    );
  }

  try {
    const leadId = randomUUID();
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-make-apikey": webhookApiKey,
      },
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
        utmSource: validation.data.utmSource || null,
        utmCampaign: validation.data.utmCampaign || null,
        status: "Checkout avviato",
        privacyConsent: true,
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Make ha rifiutato il lead.", { status: response.status });
      return Response.json(
        { error: "Non siamo riusciti a registrare i dati. Riprova tra poco." },
        { status: 502, headers },
      );
    }

    const result = (await response.json().catch(() => null)) as { ok?: unknown } | null;
    if (result?.ok !== true) {
      console.error("Make non ha confermato il salvataggio del lead.");
      return Response.json(
        { error: "Non siamo riusciti a confermare i dati. Riprova tra poco." },
        { status: 502, headers },
      );
    }
  } catch (error) {
    console.error("Errore di connessione a Make.", error instanceof Error ? error.message : "unknown");
    return Response.json(
      { error: "Non siamo riusciti a registrare i dati. Riprova tra poco." },
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
        utmSource: string;
        utmCampaign: string;
      };
    } {
  const name = asString(body.name, 100);
  const phone = asString(body.phone, 30);
  const email = asString(body.email, 254).toLowerCase();
  const notes = asString(body.notes, 1_000);
  const eventSlug = asString(body.eventSlug, 160);
  const page = asString(body.page, 300);
  const utmSource = asString(body.utmSource, 100);
  const utmCampaign = asString(body.utmCampaign, 150);
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
  if (!Number.isInteger(tables) || tables < 1 || tables > people) {
    return { ok: false, error: "Il numero di tavole deve essere compreso tra 1 e il numero di partecipanti." };
  }
  if (!eventSlug || !page.startsWith("/eventi/") || body.consent !== true) {
    return { ok: false, error: "Controlla i dati e accetta la privacy policy." };
  }

  return {
    ok: true,
    data: { name, phone, email, people, tables, notes, eventSlug, page, utmSource, utmCampaign },
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
