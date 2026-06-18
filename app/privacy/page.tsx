import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali di Functional SUP Tribe.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Note legali" title="Privacy policy" variant="astro" seed={1} />
      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-[var(--radius-card)] bg-sand/40 p-5 text-sm text-navy/70 ring-1 ring-navy/8">
            ⚠️ <strong>Bozza da completare.</strong> Questo testo è un segnaposto: prima della
            pubblicazione va sostituito con l&apos;informativa privacy definitiva fornita dal cliente
            (titolare del trattamento, P.IVA, finalità, conservazione dati).
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-navy/75">
            <Para title="Titolare del trattamento">
              Il titolare del trattamento è {site.name} ({site.shortName}). Per qualsiasi richiesta
              relativa ai tuoi dati puoi scriverci a {site.email}.
            </Para>
            <Para title="Quali dati raccogliamo">
              Raccogliamo i dati che ci fornisci tramite i moduli del sito (nome, telefono, email,
              numero di partecipanti, eventuali note) e dati tecnici di navigazione (pagina di
              provenienza, parametri UTM) per gestire la tua richiesta di informazioni o prenotazione.
            </Para>
            <Para title="Come li usiamo">
              Usiamo i tuoi dati esclusivamente per ricontattarti su WhatsApp o via email in merito
              agli eventi e ai servizi richiesti. Non li cediamo a terzi per finalità di marketing.
            </Para>
            <Para title="Conservazione">
              Conserviamo i dati per il tempo necessario a gestire la tua richiesta e per gli obblighi
              di legge. Puoi chiederne la cancellazione in qualsiasi momento.
            </Para>
            <Para title="I tuoi diritti">
              Hai diritto di accedere, rettificare, cancellare e limitare il trattamento dei tuoi dati.
              Per esercitarli, scrivici a {site.email}.
            </Para>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Para({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-navy">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
