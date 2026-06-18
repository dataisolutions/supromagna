import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Richiesta ricevuta",
  description: "Abbiamo ricevuto la tua richiesta. Ti contattiamo su WhatsApp con tutte le informazioni.",
  robots: { index: false, follow: false },
};

export default async function GraziePage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event } = await searchParams;
  const waMsg = event
    ? `Ciao ${site.shortName}, ho appena inviato la richiesta per "${event}".`
    : `Ciao ${site.shortName}, ho appena inviato una richiesta dal sito.`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#25D366] shadow-[var(--shadow-lift)] animate-[rise_0.6s_ease]">
          <Icon.Check className="h-10 w-10" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl">
          Richiesta ricevuta
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/90">
          {event ? (
            <>Grazie! Ti contattiamo su WhatsApp con tutte le informazioni per completare la prenotazione di <strong>{event}</strong>.</>
          ) : (
            <>Grazie! Ti contattiamo su WhatsApp con tutte le informazioni il prima possibile.</>
          )}
        </p>
        <p className="mt-2 text-sm text-white/75">
          Non si è aperto WhatsApp? Nessun problema, scrivici tu direttamente qui sotto.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink(waMsg)} external variant="whatsapp" size="lg">
            <Icon.Whatsapp /> Scrivici subito su WhatsApp
          </Button>
          <Button href="/eventi-sup" variant="secondary" size="lg">
            Vedi altri eventi
          </Button>
        </div>
      </Container>
    </section>
  );
}
