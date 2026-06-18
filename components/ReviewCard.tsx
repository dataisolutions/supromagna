import { cn } from "@/components/ui";

export interface Review {
  name: string;
  origin: string;
  text: string;
  rating: number;
  event: string;
}

export const reviews: Review[] = [
  {
    name: "Giulia M.",
    origin: "Bologna",
    text: "Non avevo mai fatto SUP e avevo un po' di paura. Dopo cinque minuti ero in piedi e ridevo. L'alba dall'acqua non la dimentico più.",
    rating: 5,
    event: "Alba in SUP",
  },
  {
    name: "Marco e Sara",
    origin: "Cesena",
    text: "Abbiamo regalato l'AperiSUP per il nostro anniversario. Tramonto, brindisi in mezzo al mare e foto pazzesche. Rifaremo tutto.",
    rating: 5,
    event: "AperiSUP",
  },
  {
    name: "Federico T.",
    origin: "Rimini",
    text: "Gli istruttori ti mettono a tuo agio dal primo secondo. Sicurezza, calma e zero stress. La notte di San Lorenzo in SUP è stata magica.",
    rating: 5,
    event: "AstroSUP",
  },
  {
    name: "Anna R.",
    origin: "Forlì",
    text: "Yoga in SUP è stata la cosa più rilassante dell'estate. Cadere in acqua fa parte del gioco — e ridi come una bambina.",
    rating: 5,
    event: "Yoga in SUP",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-sun" aria-label={`${rating} stelle su 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M10 1.6l2.5 5.1 5.6.8-4 4 .9 5.6L10 14.5 5 17.1l.9-5.6-4-4 5.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <Stars rating={review.rating} />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy/80">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-navy/8 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full sky-gradient-soft text-sm font-bold text-white">
          {review.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-navy">
            {review.name} <span className="font-normal text-navy/45">· {review.origin}</span>
          </span>
          <span className="text-xs text-teal">{review.event}</span>
        </span>
      </figcaption>
    </figure>
  );
}
