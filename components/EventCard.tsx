import Link from "next/link";
import type { SupEvent } from "@/lib/events";
import { categoryBySlug } from "@/lib/events";
import { SceneImage, sceneForCategory } from "@/components/SceneImage";
import { StatusBadge, cn } from "@/components/ui";
import { Icon } from "@/components/icons";

export function EventCard({ event, seed = 1 }: { event: SupEvent; seed?: number }) {
  const cat = categoryBySlug(event.category);
  return (
    <Link
      href={`/eventi/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-navy/8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SceneImage
          variant={sceneForCategory(event.category)}
          seed={seed}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur">
            <span>{cat?.emoji}</span> {cat?.name}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <StatusBadge status={event.status} className="bg-white/90 backdrop-blur" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-tight text-navy">{event.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy/60">
          <span className="flex items-center gap-1.5">
            <Icon.Calendar className="h-4 w-4 text-coral" /> {event.dateLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon.Pin className="h-4 w-4 text-coral" /> {event.locationAddress}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy/65">
          {event.descriptionShort}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-navy/65">
          <Quick icon={<Icon.Timer className="h-3.5 w-3.5" />} label={event.duration} />
          <Quick icon={<Icon.Board className="h-3.5 w-3.5" />} label={event.beginnerFriendly ? "Anche principianti" : event.difficulty} />
          {event.breakfastStatus !== "non inclusa" && (
            <Quick icon={<Icon.Coffee className="h-3.5 w-3.5" />} label={`Colazione ${event.breakfastStatus}`} />
          )}
        </div>

        <div className="mt-5 flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-navy">
            {event.priceFrom ? (
              <>
                <span className="text-navy/50">da</span> {event.priceFrom}
              </>
            ) : (
              "Info su richiesta"
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-coral transition-transform group-hover:translate-x-0.5">
            Vedi evento <Icon.ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Quick({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1")}>
      <span className="text-teal">{icon}</span>
      {label}
    </span>
  );
}
