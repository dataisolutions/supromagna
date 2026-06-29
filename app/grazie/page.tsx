import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prenotazione confermata",
  description: "Pagamento ricevuto. Riceverai tutte le informazioni via email.",
  robots: { index: false, follow: false },
};

export default async function GraziePage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; session_id?: string }>;
}) {
  const { event } = await searchParams;

  return (
    <section className="relative flex min-h-[calc(100vh+8rem)] flex-col overflow-hidden">
      <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
      <Container className="relative flex flex-1 flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-coral shadow-[var(--shadow-lift)] animate-[rise_0.6s_ease]">
          <Icon.Check className="h-10 w-10" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl">
          Sei dentro!
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/90">
          {event ? (
            <>Prenotazione per <strong>{event}</strong> confermata. Riceverai via email tutte le informazioni per prepararti al meglio.</>
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
