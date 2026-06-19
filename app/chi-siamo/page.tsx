import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Eyebrow, Button } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { ReviewCard, reviews } from "@/components/ReviewCard";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi siamo — la community Functional SUP Tribe",
  description:
    "La storia di Functional SUP Tribe: la community che fa vivere il mare di Romagna da un punto di vista diverso. Mare, persone, movimento, natura, sicurezza.",
  alternates: { canonical: "/chi-siamo" },
};

const values = [
  { icon: Icon.Wave, title: "Mare", text: "È il nostro punto di partenza e il motivo di tutto. Lo rispettiamo e lo facciamo amare." },
  { icon: Icon.Users, title: "Persone", text: "Prima dei principianti e degli esperti ci sono le persone. Il gruppo è il cuore di ogni uscita." },
  { icon: Icon.Board, title: "Movimento", text: "Il SUP è movimento dolce e naturale: fa bene al corpo e ancora di più alla testa." },
  { icon: Icon.Shield, title: "Sicurezza", text: "Gruppi piccoli, attrezzatura adeguata e decisioni prese guardando il mare, non il calendario." },
];

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero
        eyebrow="Chi siamo"
        title="La community che ti fa vivere la Romagna dal mare"
        subtitle="Functional SUP Tribe è nata da una passione semplice: stare in acqua all'alba e condividerlo con gli altri. Oggi siamo un gruppo che cresce a ogni uscita."
        variant="alba"
        seed={2}
        photo="/media/alba-2.jpg"
      />

      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>La nostra storia</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Tutto è iniziato con un'alba
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-navy/75">
              <p>
                Una mattina d'estate siamo usciti in mare prima dell'alba, solo per vedere il sole salire
                dall'acqua. Quel silenzio, quella luce — abbiamo capito subito che non poteva restare una cosa
                solo nostra.
              </p>
              <p>
                Così è nata Functional SUP Tribe: una community per vivere il mare di Romagna in modo diverso.
                Albe, uscite sotto le stelle, momenti wellness, lezioni e aperitivi sull'acqua, aperti anche a
                chi non è mai salito su una tavola.
              </p>
              <p>
                Non ci interessa fare i numeri. Ci interessa che ogni persona torni a riva con un ricordo che si
                porta dietro per tutta l'estate.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            <Photo src="/media/alba-6.jpg" alt="Gruppo in SUP all'alba a Cesenatico" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-deep">
        <Container>
          <Eyebrow>In cosa crediamo</Eyebrow>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Quattro cose, sempre</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: I, title, text }) => (
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

      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            <Photo src="/media/alba-4.jpg" alt="Istruttori e partecipanti in mare al sorgere del sole" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <Eyebrow>Il team</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Istruttori certificati, dal vivo al tuo fianco
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/75">
              Le uscite sono guidate da {site.founderName} e dal team di istruttori SUP della community.
              In acqua siamo sempre presenti: prima ti spieghiamo tutto con calma, poi restiamo accanto a te
              per tutta l'esperienza.
            </p>
            <p className="mt-3 text-sm text-navy/50">
              Collaboriamo con stabilimenti e partner della Riviera come {site.partners.join(", ")}.
            </p>
            <Button
              href={whatsappLink(`Ciao ${site.shortName}, ho una domanda sulla vostra community.`)}
              external
              variant="whatsapp"
              className="mt-6"
            >
              <Icon.Whatsapp /> Scrivici due righe
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-cream-deep">
        <Container>
          <Eyebrow>Cosa dicono di noi</Eyebrow>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Le voci della tribe</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
