import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories, events } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/eventi-sup",
    "/lezioni-sup",
    "/per-aziende",
    "/chi-siamo",
    "/faq",
    "/contatti",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/eventi-sup/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...events.map((e) => ({
      url: `${site.url}/eventi/${e.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
