import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.tier === "flagship" ? 0.9 : p.tier === "featured" ? 0.8 : 0.5,
    })),
    { url: `${site.url}/immersive`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
