import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

// Fixed date keeps the sitemap static. Bump it when content changes.
const updated = new Date("2026-10-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/work", "/about", "/careers", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/privacy" || p === "/terms" ? 0.3 : 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
