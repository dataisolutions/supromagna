import type { Metadata } from "next";
import { events } from "@/lib/events";
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
  // Ordina: prima gli attivi per data, poi gli altri
  const ordered = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        eyebrow="Calendario estate 2026"
        title="Tutti gli eventi in SUP in Romagna"
        subtitle="Albe, notti di stelle, yoga sull'acqua e brindisi al tramonto. Scegli l'esperienza, lascia i tuoi dati e ti scriviamo su WhatsApp."
        variant="aperisup"
        seed={4}
      />
      <Section>
        <Container>
          <EventListing events={ordered} />
        </Container>
      </Section>
    </>
  );
}
