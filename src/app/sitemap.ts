import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: "2026-10-19",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
