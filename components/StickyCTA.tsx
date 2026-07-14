"use client";

import { useEffect, useState } from "react";

/** Barra CTA sticky in basso, solo mobile, per le pagine evento. */
export function StickyCTA({
  priceFrom,
  eventLabel,
}: {
  priceFrom?: string;
  eventLabel?: string;
}) {
  const [formVisible, setFormVisible] = useState(false);

  // Nasconde la barra quando il form #prenota entra nel viewport.
  useEffect(() => {
    const el = document.getElementById("prenota");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (formVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/8 bg-cream/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-medium uppercase tracking-wide text-navy/50">
            {priceFrom ? "A partire da" : "Posto"}
          </span>
          <span className="font-display text-lg font-semibold text-navy">
            {priceFrom ?? "Su richiesta"}
          </span>
        </div>
        <a
          href="#prenota"
          className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-coral)] transition-transform active:scale-[0.98]"
        >
          Prenota ora
        </a>
      </div>
      {eventLabel && (
        <p className="mx-auto mt-1.5 max-w-md text-center text-[11px] text-navy/45">{eventLabel}</p>
      )}
    </div>
  );
}
