import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  categories,
  categoryBySlug,
  eventsByCategory,
  type CategorySlug,
} from "@/lib/events";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Button } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { sceneForCategory } from "@/components/SceneImage";
import { Icon } from "@/components/icons";
import { whatsappLink, site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} in Romagna`,
    description: cat.intro,
    alternates: { canonical: `/eventi-sup/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  if (!cat) notFound();

  const list = eventsByCategory(cat.slug as CategorySlug);

  return (
    <>
      <PageHero
        eyebrow={`${cat.emoji} ${cat.name}`}
        title={cat.tagline}
        subtitle={cat.intro}
        variant={sceneForCategory(cat.slug)}
        seed={6}
        photo={cat.photo}
      />

      <Section>
        <Container>
          <nav className="flex flex-wrap gap-2 pb-8" aria-label="Categorie">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/eventi-sup/${c.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  c.slug === cat.slug
                    ? "bg-navy text-white"
                    : "bg-white text-navy/70 ring-1 ring-navy/10 hover:ring-navy/20"
                }`}
              >
                {c.emoji} {c.name}
              </Link>
            ))}
          </nav>

          {list.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((e, i) => (
                <EventCard key={e.slug} event={e} seed={i + 1} />
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-card)] bg-white p-10 text-center ring-1 ring-navy/8">
              <p className="font-display text-2xl text-navy">Nuove date in arrivo</p>
              <p className="mx-auto mt-2 max-w-md text-navy/60">
                Stiamo definendo il calendario di {cat.name}. Scrivici su WhatsApp: ti avvisiamo
                appena apriamo le prenotazioni.
              </p>
              <Button
                href={whatsappLink(`Ciao ${site.shortName}, vorrei essere avvisato/a per gli eventi "${cat.name}".`)}
                external
                variant="whatsapp"
                className="mt-6"
              >
                <Icon.Whatsapp /> Avvisami su WhatsApp
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
