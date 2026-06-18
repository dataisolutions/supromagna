import { Container, Eyebrow } from "@/components/ui";
import { SceneImage, type SceneVariant } from "@/components/SceneImage";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "alba",
  seed = 5,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  variant?: SceneVariant;
  seed?: number;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SceneImage variant={variant} seed={seed} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/35 to-cream" />
      </div>
      <Container className="relative py-16 sm:py-24">
        <div className="max-w-2xl animate-[rise_0.8s_ease]">
          {eyebrow && <Eyebrow className="text-sun">{eyebrow}</Eyebrow>}
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.06] text-white drop-shadow-sm sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{subtitle}</p>}
        </div>
      </Container>
    </section>
  );
}
