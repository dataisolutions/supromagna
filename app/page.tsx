import Link from "next/link";
import { whatsappLink, site } from "@/lib/site";
import {
  categories,
  upcomingEvents,
  featuredEvent,
  categoryBySlug,
} from "@/lib/events";
import { Section, Container, Button, Eyebrow, StatusBadge } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ReviewCard, reviews } from "@/components/ReviewCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/icons";

const whyItems = [
  { icon: Icon.Board, title: "Anche se parti da zero", text: "Il 70% di chi viene è alla prima volta. Briefing prima di entrare in acqua e istruttori sempre vicini." },
  { icon: Icon.Shield, title: "Sicurezza prima di tutto", text: "Cintura di galleggiamento, gruppi piccoli e guida in mare. Esci solo se le condizioni sono giuste." },
  { icon: Icon.Sunrise, title: "Momenti, non solo sport", text: "Albe, stelle, tramonti e silenzio sull'acqua. Esperienze pensate per emozionare, non per allenarti." },
  { icon: Icon.Users, title: "Si vive in gruppo", text: "Conoscerai gente nuova. Vieni da solo, in coppia o con gli amici: il gruppo si crea da sé." },
  { icon: Icon.Board, title: "Attrezzatura inclusa", text: "Tavola e pagaia ti aspettano in spiaggia. Tu porta solo costume, telo e voglia di provare." },
  { icon: Icon.Camera, title: "Foto da ricordare", text: "Ti riprendiamo durante l'uscita: torni a casa con scatti che sembrano una vacanza intera." },
];

const homeFaq = [
  { q: "Serve esperienza?", a: "No. La maggior parte dei partecipanti non ha mai fatto SUP. Facciamo un briefing prima di entrare in acqua e gli istruttori ti seguono per tutta l'uscita." },
  { q: "Devo saper nuotare?", a: "Sì, è importante saper nuotare e sentirsi a proprio agio in mare. Indossi sempre una cintura di galleggiamento." },
  { q: "Cosa devo portare?", a: "Costume già indosso, telo, un cambio asciutto, ciabatte e acqua. Tavola e pagaia le mettiamo noi." },
  { q: "Cosa succede se il mare non permette l'uscita?", a: "Se le condizioni non sono sicure rimandiamo o annulliamo e ti avvisiamo su WhatsApp. La tua richiesta resta valida per la nuova data." },
  { q: "Posso venire con un amico o un'amica?", a: "Certo, anzi è il modo migliore. Puoi scegliere la tavola doppia per condividere l'esperienza o due tavole singole." },
];

export default function HomePage() {
  const featured = featuredEvent();
  const featCat = categoryBySlug(featured.category);
  const next = upcomingEvents()
    .filter((e) => e.slug !== featured.slug)
    .slice(0, 3);

  const heroMsg = `Ciao ${site.shortName}, vorrei informazioni per "${featured.title}" (${featured.dateLabel}).`;

  return (
    <>
      {/* ===== Sezione 1 — Hero con prossimo evento ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Photo src="/media/alba-1.jpg" alt="" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-navy/75 via-navy/45 to-coral/35" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-[rise_0.9s_ease]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-navy backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-coral" />
              Prossima alba in programma · {featured.locationAddress}
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] text-white drop-shadow-sm sm:text-6xl">
              Vivi la Romagna
              <br />
              <span className="text-sun">dal mare.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90">
              Albe, stelle e momenti speciali in SUP sulla Riviera Romagnola. Esperienze guidate,
              adatte anche a chi non è mai salito su una tavola.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={whatsappLink(heroMsg)} external variant="primary" size="lg">
                <Icon.Whatsapp /> Ottieni info su WhatsApp
              </Button>
              <Button href={`/eventi/${featured.slug}`} variant="secondary" size="lg">
                Scopri i dettagli
              </Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/80">
              <Icon.Heart className="h-4 w-4 text-sun" /> Oltre 1.200 persone hanno già vissuto un'alba con noi
            </p>
          </div>

          {/* Card evento in evidenza */}
          <div className="animate-[rise_1.1s_ease]">
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[16/11]">
                <Photo src={featured.photo} alt={featured.title} sizes="(max-width: 1024px) 100vw, 45vw" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
                    {featCat?.emoji} {featCat?.name}
                  </span>
                  <StatusBadge status={featured.status} className="bg-white/90 backdrop-blur" />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="font-display text-2xl font-semibold text-navy">{featured.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{featured.descriptionShort}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <HeroFact icon={<Icon.Calendar />} label="Data" value={featured.dateLabel} />
                  <HeroFact icon={<Icon.Pin />} label="Luogo" value={`${featured.locationName}, ${featured.locationAddress}`} />
                  <HeroFact icon={<Icon.Clock />} label="Ritrovo" value={featured.meetingTime} />
                  {featured.sunriseTime && <HeroFact icon={<Icon.Sunrise />} label="Alba" value={featured.sunriseTime} />}
                </dl>
                <Button href={`/eventi/${featured.slug}`} variant="primary" className="mt-5 w-full" size="lg">
                  Vedi l'evento <Icon.ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Sezione 2 — Prossimi eventi ===== */}
      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>In calendario</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
                I prossimi appuntamenti in mare
              </h2>
            </div>
            <Link href="/eventi-sup" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-coral hover:underline sm:inline-flex">
              Tutti gli eventi <Icon.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {next.map((e, i) => (
              <EventCard key={e.slug} event={e} seed={i + 2} />
            ))}
          </div>
          <div className="mt-7 sm:hidden">
            <Button href="/eventi-sup" variant="secondary" className="w-full">
              Vedi tutti gli eventi <Icon.ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ===== Sezione 3 — Categorie ===== */}
      <Section className="bg-cream-deep">
        <Container>
          <Eyebrow>Cosa puoi vivere</Eyebrow>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-navy sm:text-4xl">
            Scegli il tuo momento sull'acqua
          </h2>
          <p className="mt-3 max-w-xl text-navy/65">
            Cinque modi diversi di stare in mare. Trova quello che fa per te — o provali tutti.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <CategoryCard key={c.slug} category={c} seed={i + 3} large={i === 0} />
            ))}
            <Link
              href="/eventi-sup"
              className="flex min-h-48 flex-col items-start justify-end rounded-[var(--radius-card)] bg-navy p-6 text-white transition-transform hover:-translate-y-1"
            >
              <Icon.Calendar className="h-7 w-7 text-sun" />
              <h3 className="mt-3 font-display text-xl font-semibold">Tutti gli eventi</h3>
              <p className="mt-1 text-sm text-white/70">Vedi il calendario completo dell'estate.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sun">
                Apri il calendario <Icon.ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ===== Sezione 4 — Cos'è Functional SUP Tribe ===== */}
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            <Photo src="/media/alba-4.jpg" alt="Alba in SUP sulla Riviera Romagnola" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <Eyebrow>Chi siamo</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Una community nata per vivere il mare in modo diverso
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/70">
              Functional SUP Tribe organizza albe, uscite serali, momenti wellness e lezioni in SUP
              sulla Riviera Romagnola. Crediamo che il mare sia il modo più semplice per staccare —
              e che chiunque possa salire su una tavola, anche partendo da zero.
            </p>
            <ul className="mt-6 space-y-3">
              {["Istruttori certificati e gruppi piccoli", "Esperienze pensate per emozionare", "Aperte a tutti, dai 12 anni in su"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-navy/80">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/12 text-teal">
                    <Icon.Check className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Button href="/chi-siamo" variant="secondary" className="mt-7">
              La nostra storia <Icon.ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ===== Sezione 5 — Perché provarlo ===== */}
      <Section className="bg-cream-deep">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Perché provarlo</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Sei in buone mani, anche alla prima uscita
            </h2>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map(({ icon: I, title, text }) => (
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

      {/* ===== Sezione 6 — Social proof ===== */}
      <Section>
        <Container>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Chi l'ha provato lo racconta così</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
                Le storie valgono più di mille foto
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]">
              <span className="font-display text-2xl font-semibold text-navy">4,9</span>
              <span className="text-sm text-navy/60">
                su 5 · oltre
                <br />
                300 recensioni
              </span>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="/eventi-sup" variant="primary" size="lg">
              Guarda i prossimi eventi <Icon.ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ===== Sezione 7 — FAQ rapide ===== */}
      <Section className="bg-cream-deep">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Domande veloci</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
              Le risposte che cerchi prima di prenotare
            </h2>
            <p className="mt-3 text-navy/65">
              Hai un'altra domanda? Scrivici su WhatsApp, rispondiamo a tutto.
            </p>
            <Button href="/faq" variant="secondary" className="mt-5">
              Tutte le FAQ
            </Button>
          </div>
          <FAQAccordion items={homeFaq} />
        </Container>
      </Section>

      {/* ===== Sezione 8 — CTA finale ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
        <Container className="relative py-16 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-5xl">
            La tua prossima esperienza in mare è già in programma
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
            Scegli l'evento, lascia i tuoi dati e ti scriviamo su WhatsApp con tutto il necessario.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={whatsappLink(`Ciao ${site.shortName}, vorrei info sui prossimi eventi in SUP.`)} external variant="whatsapp" size="lg">
              <Icon.Whatsapp /> Scrivici su WhatsApp
            </Button>
            <Button href="/eventi-sup" variant="secondary" size="lg">
              Vedi il calendario
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function HeroFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-coral">{icon}</span>
      <span className="flex flex-col">
        <dt className="text-xs uppercase tracking-wide text-navy/45">{label}</dt>
        <dd className="font-medium text-navy">{value}</dd>
      </span>
    </div>
  );
}
