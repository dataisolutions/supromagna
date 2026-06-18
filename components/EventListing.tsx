"use client";

import { useMemo, useState } from "react";
import type { SupEvent } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { cn } from "@/components/ui";

type Filter = {
  label: string;
  test: (e: SupEvent) => boolean;
};

const filters: Filter[] = [
  { label: "Tutti", test: () => true },
  { label: "Alba", test: (e) => e.category === "alba-in-sup" },
  { label: "Notturni", test: (e) => e.category === "astro-sup" },
  { label: "Yoga / Pilates", test: (e) => e.category === "yoga-sup" },
  { label: "Aperitivi", test: (e) => e.category === "aperisup" },
  { label: "Speciali", test: (e) => e.category === "eventi-speciali" },
  { label: "Principianti", test: (e) => e.beginnerFriendly },
  { label: "Con colazione", test: (e) => e.breakfastStatus !== "non inclusa" },
];

export function EventListing({ events }: { events: SupEvent[] }) {
  const [active, setActive] = useState(0);

  const filtered = useMemo(
    () => events.filter(filters[active].test),
    [events, active],
  );

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === i
                ? "bg-navy text-white shadow-[var(--shadow-soft)]"
                : "bg-white text-navy/70 ring-1 ring-navy/10 hover:ring-navy/20",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <EventCard key={e.slug} event={e} seed={i + 1} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[var(--radius-card)] bg-white p-10 text-center ring-1 ring-navy/8">
          <p className="font-display text-xl text-navy">Nessun evento con questo filtro… per ora.</p>
          <p className="mt-2 text-sm text-navy/60">
            Stiamo aggiungendo nuove date. Scrivici su WhatsApp e ti avvisiamo per primo.
          </p>
        </div>
      )}
    </div>
  );
}
