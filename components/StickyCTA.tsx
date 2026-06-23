"use client";

/** Barra CTA sticky in basso, solo mobile, per le pagine evento. */
export function StickyCTA({
  priceFrom,
}: {
  priceFrom?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/8 bg-cream/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 pb-[env(safe-area-inset-bottom)]">
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
    </div>
  );
}
