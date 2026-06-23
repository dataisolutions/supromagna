import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Eyebrow } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti — scrivici per info e prenotazioni",
  description:
    "Contatta Functional SUP Tribe per informazioni e prenotazioni sugli eventi in SUP in Romagna. Rispondiamo su WhatsApp.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiPage() {
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Parliamone in mare"
        subtitle="Per info, prenotazioni o semplici curiosità: il modo più veloce è WhatsApp. Ti rispondiamo davvero."
        variant="aperisup"
        seed={9}
        photo="/media/alba-7.jpg"
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <BookingForm variant="contatti" className="lg:sticky lg:top-24" />

          <div>
            <Eyebrow>Come raggiungerci</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Scegli il canale che preferisci
            </h2>
            <div className="mt-7 space-y-4">
              <a
                href={whatsappLink(`Ciao ${site.shortName}, vorrei qualche informazione.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/8 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <Icon.Whatsapp />
                </span>
                <span>
                  <span className="block font-semibold text-navy">WhatsApp</span>
                  <span className="text-sm text-navy/60">Il canale più rapido, per info e prenotazioni</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/8 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/12 text-teal">
                  <Icon.Mail />
                </span>
                <span>
                  <span className="block font-semibold text-navy">Email</span>
                  <span className="text-sm text-navy/60">{site.email}</span>
                </span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/8 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coral/12 text-coral">
                  <Icon.Camera />
                </span>
                <span>
                  <span className="block font-semibold text-navy">Instagram</span>
                  <span className="text-sm text-navy/60">{site.instagramHandle} · foto e prossimi eventi</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl bg-sand/50 p-5 ring-1 ring-navy/8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-coral">
                  <Icon.Pin />
                </span>
                <span>
                  <span className="block font-semibold text-navy">Dove operiamo</span>
                  <span className="text-sm text-navy/60">{site.baseLocation} e dintorni</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
