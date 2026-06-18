import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Eyebrow } from "@/components/ui";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Team building in SUP sulla Riviera Romagnola",
  description:
    "Attività di team building ed eventi aziendali in SUP in Romagna: albe, tramonti, AperiSUP e format su misura. Memorabili, accessibili, anche per principianti.",
  alternates: { canonical: "/per-aziende" },
};

const proposals = [
  { icon: Icon.Sunrise, title: "Alba aziendale in SUP", text: "Iniziate la giornata insieme, in mare, prima di tutti gli altri." },
  { icon: Icon.Drink, title: "Uscita al tramonto", text: "Pagaiata leggera e brindisi sull'acqua per chiudere un evento." },
  { icon: Icon.Drink, title: "AperiSUP di gruppo", text: "Il format più social: poco sforzo, tante risate, foto pazzesche." },
  { icon: Icon.Coffee, title: "SUP + colazione", text: "Uscita al mattino seguita da colazione in spiaggia con il team." },
  { icon: Icon.Yoga, title: "SUP + wellness", text: "Movimento sull'acqua e momento di benessere per ricaricare il gruppo." },
  { icon: Icon.Users, title: "Evento privato su misura", text: "Costruiamo il format intorno ai vostri obiettivi e numeri." },
];

const why = [
  { title: "Esperienza memorabile", text: "Non un'altra sala riunioni: un ricordo condiviso che resta." },
  { title: "Crea gruppo davvero", text: "L'acqua abbatte le gerarchie. Si collabora, si ride, ci si fida." },
  { title: "Adatta anche ai principianti", text: "Nessuno resta a guardare: tutti possono salire in tavola." },
  { title: "Contenuto fotografico forte", text: "Foto e video pronti per i vostri canali e la comunicazione interna." },
];

export default function AziendePage() {
  return (
    <>
      <PageHero
        eyebrow="Per aziende"
        title="Team building in SUP sulla Riviera Romagnola"
        subtitle="Attività guidate, accessibili e personalizzabili per team building, incentive, eventi aziendali e gruppi privati. Anche per chi non ha mai fatto SUP."
        variant="aperisup"
        seed={8}
      />

      <Section>
        <Container>
          <Eyebrow>Cosa possiamo organizzare</Eyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-navy sm:text-4xl">
            Un format per ogni team
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proposals.map(({ icon: I, title, text }) => (
              <div key={title} className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl sky-gradient-soft text-white">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-deep">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>Perché funziona</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Un'attività che il team ricorda
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {why.map((w) => (
                <div key={w.title} className="rounded-2xl bg-white p-5 ring-1 ring-navy/8">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/12 text-teal">
                    <Icon.Check className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-semibold text-navy">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/65">{w.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-navy p-6 text-white">
              <p className="font-display text-lg">Lavorate con hotel o stabilimenti?</p>
              <p className="mt-1 text-sm text-white/75">
                Creiamo pacchetti SUP per le vostre strutture e i vostri ospiti. Parliamone.
              </p>
            </div>
          </div>
          <B2BLeadForm className="lg:sticky lg:top-24" />
        </Container>
      </Section>
    </>
  );
}
