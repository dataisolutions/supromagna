"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav } from "@/lib/site";
import { upcomingEvents } from "@/lib/events";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

const iconMap = {
  home: Icon.Home,
  calendar: Icon.Calendar,
  board: Icon.Board,
  info: Icon.Info,
} as const;

/** Prossima alba (o, in mancanza, prossimo evento) per il banner mobile. */
function nextAlba() {
  const upcoming = upcomingEvents();
  return upcoming.find((e) => e.category === "alba-in-sup") ?? upcoming[0];
}

export function BottomNav() {
  const pathname = usePathname();
  const event = nextAlba();

  // Il banner non serve dove c'è già una CTA sticky (scheda evento) o sulla thank you page.
  const showBanner =
    !!event && !pathname.startsWith("/eventi/") && !pathname.startsWith("/grazie");

  // Data compatta senza anno: "Domenica 21 giugno 2026" -> "domenica 21 giugno"
  const shortDate = event
    ? event.dateLabel.replace(/\s\d{4}$/, "").toLowerCase()
    : "";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      {showBanner && (
        <Link
          href={`/eventi/${event.slug}#prenota`}
          className="flex items-stretch overflow-hidden border-t border-navy/10 bg-gradient-to-r from-[#d6e7f3] via-[#eceaee] to-[#fbe2d0] text-navy shadow-[0_-8px_24px_-14px_rgba(7,59,76,0.35)]"
          aria-label={`Prossima alba ${shortDate} — prenota ora`}
        >
          <span className="flex min-w-0 flex-1 flex-col justify-center py-2.5 pl-4 pr-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
              Prossima alba
            </span>
            <span className="truncate font-display text-[15px] font-bold leading-tight text-navy">
              {shortDate}
            </span>
          </span>
          <span className="flex shrink-0 items-center bg-coral px-5 font-semibold text-white">
            <span className="inline-block animate-pulse-scale">Prenota ora</span>
          </span>
        </Link>
      )}

      <nav
        aria-label="Navigazione principale"
        className="border-t border-navy/8 bg-cream/95 backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {bottomNav.map((item) => {
            const I = iconMap[item.icon as keyof typeof iconMap];
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                    active ? "text-coral" : "text-navy/55",
                  )}
                >
                  <I className={cn("h-6 w-6", active && "stroke-[1.9]")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
