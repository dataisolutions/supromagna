/**
 * Placeholder immagine "scena" on-brand, generato in SVG.
 * Sostituisce le foto reali finché il cliente non le fornisce (cap. 21 brief).
 * Varianti coerenti con la palette dell'alba; riempie sempre il contenitore.
 */
import type { CategorySlug } from "@/lib/events";

export type SceneVariant = "alba" | "astro" | "aperisup" | "yoga" | "special";

export function sceneForCategory(c: CategorySlug): SceneVariant {
  switch (c) {
    case "alba-in-sup":
      return "alba";
    case "astro-sup":
      return "astro";
    case "aperisup":
      return "aperisup";
    case "yoga-sup":
      return "yoga";
    case "eventi-speciali":
      return "special";
  }
}

type Palette = {
  skyTop: string;
  skyMid: string;
  skyLow: string;
  glow: string;
  sea: string;
  seaDeep: string;
  orb: string;
  orbGlow: string;
  night?: boolean;
};

const PALETTES: Record<SceneVariant, Palette> = {
  alba: { skyTop: "#0E6F7F", skyMid: "#FF7A59", skyLow: "#FFB26B", glow: "#FFD166", sea: "#0E6F7F", seaDeep: "#073B4C", orb: "#FFD166", orbGlow: "#FF7A59" },
  aperisup: { skyTop: "#8a3a6b", skyMid: "#FF7A59", skyLow: "#FFD166", glow: "#FFB26B", sea: "#0a5562", seaDeep: "#073B4C", orb: "#FFB26B", orbGlow: "#FF7A59" },
  yoga: { skyTop: "#5fb4c4", skyMid: "#FFB26B", skyLow: "#FFE3B0", glow: "#FFD166", sea: "#2a93a4", seaDeep: "#0E6F7F", orb: "#FFD166", orbGlow: "#FFE3B0" },
  astro: { skyTop: "#041726", skyMid: "#073B4C", skyLow: "#0a5562", glow: "#0E6F7F", sea: "#062430", seaDeep: "#02121a", orb: "#FFF3D6", orbGlow: "#FFD166", night: true },
  special: { skyTop: "#06182a", skyMid: "#0E2A3F", skyLow: "#1d4a5c", glow: "#FFD166", sea: "#08303d", seaDeep: "#041a22", orb: "#FFF6E2", orbGlow: "#FFE3B0", night: true },
};

export function SceneImage({
  variant = "alba",
  className,
  seed = 1,
}: {
  variant?: SceneVariant;
  className?: string;
  seed?: number;
}) {
  const p = PALETTES[variant];
  const uid = `${variant}-${seed}`;
  // sole/luna: di notte alto, di giorno basso sull'orizzonte
  const orbY = p.night ? 78 : 168;
  const orbX = 150 + ((seed * 53) % 200);

  // stelle deterministiche
  const stars = p.night
    ? Array.from({ length: 26 }, (_, i) => ({
        x: ((i * 37 + seed * 11) % 500),
        y: ((i * 53 + seed * 7) % 150) + 8,
        r: (i % 3) * 0.4 + 0.5,
      }))
    : [];

  return (
    <svg
      viewBox="0 0 500 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustrazione di un'uscita in SUP — ${variant}`}
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="55%" stopColor={p.skyMid} />
          <stop offset="100%" stopColor={p.skyLow} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="100%" r="75%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.9" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`orb-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.orb} />
          <stop offset="70%" stopColor={p.orb} />
          <stop offset="100%" stopColor={p.orbGlow} stopOpacity="0.2" />
        </radialGradient>
        <linearGradient id={`sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sea} />
          <stop offset="100%" stopColor={p.seaDeep} />
        </linearGradient>
      </defs>

      {/* cielo */}
      <rect x="0" y="0" width="500" height="190" fill={`url(#sky-${uid})`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFF8F0" opacity={0.85} />
      ))}

      {/* bagliore sull'orizzonte */}
      <rect x="0" y="60" width="500" height="130" fill={`url(#glow-${uid})`} />

      {/* sole / luna */}
      <circle cx={orbX} cy={orbY} r={p.night ? 26 : 34} fill={`url(#orb-${uid})`} />
      <circle cx={orbX} cy={orbY} r={p.night ? 22 : 30} fill={p.orb} opacity={p.night ? 0.95 : 1} />

      {/* mare */}
      <rect x="0" y="186" width="500" height="114" fill={`url(#sea-${uid})`} />
      {/* scia di luce sull'acqua */}
      <path
        d={`M${orbX - 26} 186 L${orbX + 26} 186 L${orbX + 60} 300 L${orbX - 60} 300 Z`}
        fill={p.orb}
        opacity={0.22}
      />
      {/* increspature */}
      {[200, 222, 246, 272].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} q 25 -6 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0`}
          stroke="#FFF8F0"
          strokeOpacity={0.12 - i * 0.02}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* silhouette paddler */}
      <g transform={`translate(${320 - (seed % 3) * 40}, 150)`} fill={p.seaDeep} opacity="0.92">
        <path d="M0 36 q30 -6 60 0 l-2 6 q-28 -5 -56 0 Z" />
        <rect x="27" y="2" width="5" height="34" rx="2.5" />
        <circle cx="29.5" cy="-4" r="5" />
        <path d="M29.5 2 l11 10" stroke={p.seaDeep} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M40 12 l3 12" stroke={p.seaDeep} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
