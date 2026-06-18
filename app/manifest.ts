import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Functional SUP Tribe — Sup Romagna",
    short_name: "Sup Romagna",
    description:
      "Eventi, albe e lezioni in SUP sulla Riviera Romagnola.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#FF7A59",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
