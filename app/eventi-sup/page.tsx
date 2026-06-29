import type { Metadata } from "next";
import { nextEvents } from "@/lib/events";
import { PageHero } from "@/components/PageHero";
import { Section, Container } from "@/components/ui";
import { EventListing } from "@/components/EventListing";

export const metadata: Metadata = {
  title: "Eventi in SUP in Romagna — Calendario estate 2026",
  description:
    "Tutti gli eventi in SUP sulla Riviera Romagnola: albe, uscite notturne, yoga, AperiSUP ed eventi speciali. Filtra per tipo e prenota su WhatsApp.",
  alternates: { canonical: "/eventi-sup" },
};

export default function EventiPage() {
  // Solo i prossimi 3 eventi dalla data odierna, ordinati per data crescente.
  const ordered = nextEvents(3);

  return (
    <>
      <PageHero
        eyebrow="Calendario estate 2026"
        title="Tutti gli eventi in SUP in Romagna"
        subtitle="Albe, notti di stelle, yoga sull'acqua e brindisi al tramonto. Scegli l'esperienza, lascia i tuoi dati e ti scriviamo su WhatsApp."
        variant="aperisup"
        seed={4}
        photo="/media/alba-1.jpg"
      />
      <Section>
        <Container>
          <EventListing events={ordered} />
        </Container>
      </Section>
    </>
  );
}
