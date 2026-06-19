import Link from "next/link";
import type { Category } from "@/lib/events";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

export function CategoryCard({
  category,
  large,
}: {
  category: Category;
  seed?: number;
  large?: boolean;
}) {
  return (
    <Link
      href={`/eventi-sup/${category.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-[var(--radius-card)] ring-1 ring-navy/8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        large ? "min-h-64" : "min-h-48",
      )}
    >
      <Photo
        src={category.photo}
        alt={category.name}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
      <div className="relative z-10 mt-auto p-5 text-white">
        <p className="text-2xl">{category.emoji}</p>
        <h3 className="mt-1 font-display text-xl font-semibold">{category.name}</h3>
        <p className="mt-1 max-w-xs text-sm leading-snug text-white/85">{category.short}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sun">
          Scopri <Icon.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
