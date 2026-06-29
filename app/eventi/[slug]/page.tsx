import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  events,
  eventBySlug,
  categoryBySlug,
  upcomingEvents,
} from "@/lib/events";
import { site } from "@/lib/site";
import { Container, Button, StatusBadge } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/icons";
import { FAQAccordion } from "@/components/FAQAccordion";
import { BookingForm } from "@/components/BookingForm";
import { StickyCTA } from "@/components/StickyCTA";
import { EventCard } from "@/components/EventCard";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) return {};
  return {
    title: event.seoTitle,
    description: event.seoDescription,
    alternates: { canonical: `/eventi/${event.slug}` },
    openGraph: {
      title: event.seoTitle,
      description: event.seoDescription,
      type: "website",
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();

  const cat = categoryBySlug(event.category);
  const others = upcomingEvents().filter((e) => e.slug !== event.slug).slice(0, 3);
  const quickFacts = [
    { icon: Icon.Calendar, label: "Data", value: event.dateLabel },
    { icon: Icon.Clock, label: "Ritrovo", value: event.meetingTime },
    ...(event.sunriseTime ? [{ icon: Icon.Sunrise, label: "Alba", value: event.sunriseTime }] : []),
    { icon: Icon.Pin, label: "Luogo", value: `${event.locationName}, ${event.locationAddress}` },
    { icon: Icon.Timer, label: "Durata", value: event.duration },
    { icon: Icon.Board, label: "Livello", value: event.difficulty },
    { icon: Icon.Coffee, label: "Colazione", value: `Colazione ${event.breakfastStatus}` },
    { icon: Icon.Users, label: "Prenotazione", value: "Obbligatoria" },
  ];

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: `${event.date}T${event.meetingTime}:00+02:00`,
    eventStatus:
      event.status === "Sold out"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: event.seoDescription,
    location: {
      "@type": "Place",
      name: event.locationName,
      address: { "@type": "PostalAddress", addressLocality: event.locationAddress, addressCountry: "IT" },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    ...(event.priceFrom && {
      offers: {
        "@type": "Offer",
        price: event.priceFrom.replace(/[^\d]/g, ""),
        priceCurrency: "EUR",
        availability:
          event.status === "Sold out"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        url: `${site.url}/eventi/${event.slug}`,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* ===== Above the fold ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Photo src={event.photo} alt={event.title} priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/65 via-navy/45 to-cream" />
        </div>
        <Container className="relative pb-10 pt-14 sm:pb-16 sm:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
              {cat?.emoji} {cat?.name}
            </span>
            <StatusBadge status={event.status} className="bg-white/90 backdrop-blur" />
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white drop-shadow-sm sm:text-5xl">
            {event.title}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90">
            <span className="flex items-center gap-1.5">
              <Icon.Calendar className="h-4 w-4" /> {event.dateLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon.Pin className="h-4 w-4" /> {event.locationName}, {event.locationAddress}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#prenota" variant="primary" size="lg">
              Prenota questo evento
            </Button>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        {/* ===== Colonna contenuti ===== */}
        <div className="min-w-0">
          {/* Scheda rapida */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickFacts.map(({ icon: I, label, value }) => (
              <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]">
                <I className="h-5 w-5 text-coral" />
                <p className="mt-2 text-xs uppercase tracking-wide text-navy/45">{label}</p>
                <p className="text-sm font-semibold text-navy">{value}</p>
              </div>
            ))}
          </div>

          <Block title="Cosa vivrai">
            <p className="text-lg leading-relaxed text-navy/75">{event.experienceStory}</p>
          </Block>

          <Block title="Il programma">
            <ol className="relative ml-3 border-l-2 border-dashed border-coral/30">
              {event.timeline.map((step, i) => (
                <li key={i} className="relative mb-5 pl-6 last:mb-0">
                  <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-coral ring-4 ring-cream" />
                  <span className="font-display text-lg font-semibold text-navy">{step.time}</span>
                  <span className="ml-2 text-navy/70">{step.label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-sm text-navy/50">Gli orari possono variare leggermente in base alle condizioni del mare.</p>
          </Block>

          <Block title="Cosa è incluso">
            <ul className="grid gap-3 sm:grid-cols-2">
              {event.included.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-navy/8">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/12 text-teal">
                    <Icon.Check className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-navy/80">{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Opzioni tavola">
            <div className="grid gap-4 sm:grid-cols-2">
              {event.tableOptions.map((opt) => (
                <div key={opt.name} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-lg font-semibold text-navy">{opt.name}</h4>
                    {opt.price && <span className="rounded-full bg-coral/12 px-3 py-1 text-sm font-semibold text-coral-deep">{opt.price}</span>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy/65">{opt.forWho}</p>
                </div>
              ))}
            </div>
          </Block>

          {event.breakfastStatus !== "non inclusa" && event.breakfastDescription && (
            <Block title="La colazione">
              <div className="overflow-hidden rounded-2xl bg-sand/50 ring-1 ring-navy/8">
                {event.breakfastImage && (
                  <div className="relative aspect-[16/10]">
                    <Photo src={event.breakfastImage} alt={`Colazione di ${event.title}`} sizes="(max-width: 1024px) 100vw, 55vw" />
                  </div>
                )}
                <div className="flex items-start gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-coral">
                    <Icon.Coffee className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-navy">Colazione {event.breakfastStatus}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/70">{event.breakfastDescription}</p>
                  </div>
                </div>
              </div>
            </Block>
          )}

          <Block title="Cosa portare">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {event.whatToBring.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-navy/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Serve esperienza?">
            <div className="rounded-2xl bg-teal/8 p-6 ring-1 ring-teal/15">
              <p className="text-lg leading-relaxed text-navy/80">
                No, non serve esperienza. Prima di entrare in acqua facciamo un briefing e gli istruttori ti
                seguono per tutta l'uscita — {event.instructors.toLowerCase()}. È comunque importante saper nuotare
                e sentirsi a proprio agio in mare.
              </p>
            </div>
          </Block>

          <Block title="Meteo e sicurezza">
            <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy/8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral/12 text-coral">
                <Icon.Shield className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-navy/70">{event.weatherPolicy}</p>
            </div>
          </Block>

          <Block title="Domande frequenti">
            <FAQAccordion items={event.faq} />
          </Block>
        </div>

        {/* ===== Colonna prenotazione (sticky desktop) ===== */}
        <aside id="prenota" className="lg:sticky lg:top-24 scroll-mt-24">
          <BookingForm
            variant="event"
            eventTitle={event.title}
            eventDate={event.dateLabel}
            eventSlug={event.slug}
            tableOptions={event.tableOptions}
          />
          <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-navy/8">
            <p className="text-sm font-semibold text-navy">{event.capacityNote}</p>
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:underline"
            >
              <Icon.Pin className="h-4 w-4" /> Apri il punto di ritrovo su Maps
            </a>
          </div>
        </aside>
      </Container>

      {/* ===== Altri eventi ===== */}
      {others.length > 0 && (
        <section className="bg-cream-deep py-14">
          <Container>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">Altri eventi in programma</h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((e, i) => (
                <EventCard key={e.slug} event={e} seed={i + 4} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== CTA finale ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
        <Container className="relative py-14 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-white drop-shadow-sm sm:text-4xl">
            Vuoi partecipare a {event.title}?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/90">
            Lascia i tuoi dati, poi completa l'acquisto sulla pagina di pagamento sicura Stripe.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="#prenota" variant="secondary" size="lg">Compila il modulo</Button>
          </div>
        </Container>
      </section>

      <StickyCTA priceFrom={event.priceFrom} />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-8">
      <h2 className="mb-4 font-display text-2xl font-semibold text-navy">{title}</h2>
      {children}
    </div>
  );
}
