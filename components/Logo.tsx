import Link from "next/link";
import { cn } from "@/components/ui";

/** Marchio: un sole che sorge dall'orizzonte + wordmark. */
export function Logo({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Functional SUP Tribe — home">
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <defs>
            <linearGradient id="logo-sun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FF7A59" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="22" r="9" fill="url(#logo-sun)" />
          <g stroke="#FF7A59" strokeWidth="2" strokeLinecap="round">
            <path d="M20 6v3M7.5 11.5 9.6 13.6M32.5 11.5 30.4 13.6" />
          </g>
          <path d="M5 27h30" stroke="#0E6F7F" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M5 31.5q5-2 10 0t10 0 10 0" stroke="#0E6F7F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold text-navy">Functional SUP Tribe</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Sup Romagna</span>
        </span>
      )}
    </Link>
  );
}
