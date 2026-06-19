import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Eyebrow } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Lezioni di SUP in Romagna — individuali e di gruppo",
  description:
    "Impara ad andare in SUP in Romagna con istruttori certificati: lezioni individuali, di gruppo e primo approccio. Adatte ai principianti. Prenota su WhatsApp.",
  alternates: { canonical: "/lezioni-sup" },
};

const types = [
  { icon: Icon.Users, title: "Lezione individuale", text: "Tu e un istruttore. Il modo più veloce per partire da zero e prendere sicurezza in acqua." },
  { icon: Icon.Heart, title: "Lezione di gruppo", text: "Impari con amici o nuove persone. Più leggera, più divertente, stesso risultato." },
  { icon: Icon.Board, title: "Primo approccio", text: "Non sei mai salito su una tavola? Iniziamo dalle basi, con calma e in sicurezza." },
  { icon: Icon.Timer, title: "Allenamento tecnico", text: "Già pratichi? Lavoriamo su pagaiata, postura ed efficienza per migliorare davvero." },
  { icon: Icon.Sunrise, title: "Preparazione agli eventi", text: "Vuoi essere pronto per un'alba o un'uscita lunga? Ti prepariamo passo passo." },
];

const steps = [
  { n: "1", title: "Ci scrivi", text: "Raccontaci il tuo livello e cosa vorresti ottenere." },
  { n: "2", title: "Definiamo insieme", text: "Scegliamo giorno, orario e spiaggia più comodi per te." },
  { n: "3", title: "Ti seguiamo in acqua", text: "Lezione su misura con istruttore certificato e attrezzatura inclusa." },
];

const faq = [
  { q: "Serve esperienza per la prima lezione?", a: "No, anzi. Le lezioni nascono proprio per chi parte da zero: iniziamo dalle basi a riva e poi entriamo in acqua." },
  { q: "Quanto dura una lezione?", a: "In media 60-90 minuti, ma adattiamo durata e intensità al tuo livello e ai tuoi obiettivi." },
  { q: "L'attrezzatura è inclusa?", a: "Sì, tavola, pagaia e cintura di galleggiamento sono sempre incluse nel prezzo della lezione." },
  { q: "Dove si svolgono le lezioni?", a: "Sulla Riviera Romagnola, tra Cesenatico, Rimini e Milano Marittima. Concordiamo insieme il punto più comodo." },
  { q: "Posso fare lezione con un amico?", a: "Certo: la lezione di gruppo è perfetta e costa meno a testa. Scrivici quanti siete e organizziamo." },
];

export default function LezioniPage() {
  return (
    <>
      <PageHero
        eyebrow="Lezioni SUP"
        title="Impara ad andare in SUP in Romagna"
        subtitle="Lezioni individuali e di gruppo con istruttori certificati. Per principianti che vogliono sicurezza in acqua e per chi vuole migliorare la tecnica."
        variant="yoga"
        seed={3}
        photo="/media/alba-3.jpg"
      />

      <Section>
        <Container>
          <Eyebrow>Per chi è</Eyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-navy sm:text-4xl">
            Per principianti, intermedi e per chi vuole sentirsi sicuro in mare
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {types.map(({ icon: I, title, text }) => (
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
        <Container>
          <Eyebrow>Come funziona</Eyebrow>
          <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">Tre passi e sei in acqua</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-navy/8">
                <span className="font-display text-5xl font-semibold text-coral/25">{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-navy/65">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>Domande frequenti</Eyebrow>
            <h2 className="mt-2 mb-6 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Prima di prenotare la tua lezione
            </h2>
            <FAQAccordion items={faq} />
          </div>
          <BookingForm variant="lezioni" className="lg:sticky lg:top-24" />
        </Container>
      </Section>
    </>
  );
}
