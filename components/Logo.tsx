import Link from "next/link";
import Image from "next/image";
import { cn } from "@/components/ui";

/**
 * Marchio ufficiale Functional SUP Tribe (logo bianco a linea).
 * `light` = su sfondo scuro/foto (testo bianco), altrimenti su crema (testo navy).
 */
export function Logo({
  className,
  compact,
  light,
}: {
  className?: string;
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Functional SUP Tribe — home"
    >
      <span
        className={cn(
          "relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-colors",
          light ? "bg-white/15 ring-white/30 backdrop-blur" : "bg-navy ring-navy/10",
        )}
      >
        <Image
          src="/media/logo-white.png"
          alt=""
          width={32}
          height={32}
          className="h-7 w-7 object-contain"
          priority
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display text-[15px] font-bold", light ? "text-white" : "text-navy")}>
            Functional SUP Tribe
          </span>
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.2em]",
              light ? "text-sun" : "text-teal",
            )}
          >
            Sup Romagna
          </span>
        </span>
      )}
    </Link>
  );
}
