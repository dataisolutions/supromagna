import type { Metadata } from "next";
import Stripe from "stripe";
import { Container, Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";
import { PurchaseTracking, type PurchaseData } from "@/components/PurchaseTracking";

export const metadata: Metadata = {
  title: "Prenotazione confermata",
  description: "Pagamento ricevuto. Riceverai tutte le informazioni via email.",
  robots: { index: false, follow: false },
};

/**
 * Recupera la sessione Stripe e, solo se il pagamento è confermato, prepara i
 * dati per l'evento conversione. In caso di errore (chiave, permessi, sessione
 * inesistente) ritorna null senza bloccare la pagina.
 */
async function getPurchase(sessionId?: string): Promise<PurchaseData | null> {
  if (!sessionId) return null;
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    const m = session.metadata ?? {};
    const people = Number(m.people);
    return {
      transactionId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "eur").toUpperCase(),
      eventTitle: m.eventTitle || undefined,
      eventSlug: m.eventSlug || undefined,
      people: Number.isFinite(people) ? people : undefined,
      source: m.source || undefined,
    };
  } catch (error) {
    console.error("Grazie: sessione Stripe non recuperabile.", error instanceof Error ? error.message : "unknown");
    return null;
  }
}

export default async function GraziePage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; session_id?: string }>;
}) {
  const { event, session_id } = await searchParams;
  const purchase = await getPurchase(session_id);
  // Nome evento da mostrare: dal pagamento confermato, o dal parametro (flusso WhatsApp).
  const eventName = purchase?.eventTitle ?? event;

  return (
    <section className="relative flex min-h-[calc(100vh+8rem)] flex-col overflow-hidden">
      {purchase && <PurchaseTracking {...purchase} />}
      <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
      <Container className="relative flex flex-1 flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-coral shadow-[var(--shadow-lift)] animate-[rise_0.6s_ease]">
          <Icon.Check className="h-10 w-10" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl">
          Sei dentro!
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/90">
          {eventName ? (
            <>Prenotazione per <strong>{eventName}</strong> confermata. Riceverai via email tutte le informazioni per prepararti al meglio.</>
          ) : (
            <>Prenotazione confermata. Riceverai via email tutte le informazioni per prepararti al meglio.</>
          )}
        </p>
        <p className="mt-2 text-sm text-white/75">
          Nel frattempo seguici su Instagram per aggiornamenti, foto e anticipazioni dei prossimi eventi.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href={site.instagram} external variant="primary" size="lg">
            <Icon.Instagram /> Seguici su Instagram
          </Button>
          <Button href="/eventi-sup" variant="secondary" size="lg">
            Vedi altri eventi
          </Button>
        </div>
      </Container>
    </section>
  );
}
