import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/content";
import { locales, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/urls";

const lastModified = "2026-10-29";

function entry(
  locale: Locale,
  path: string,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(locale, path),
    lastModified,
    changeFrequency: "monthly",
    priority,
    alternates: {
      languages: {
        en: absoluteUrl("en", path),
        ru: absoluteUrl("ru", path),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getProjectSlugs();
  const home = locales.map((locale) => entry(locale, "/", 1));
  const cases = locales.flatMap((locale) =>
    slugs.map((slug) => entry(locale, `/work/${slug}`, 0.8)),
  );
  return [...home, ...cases];
}
