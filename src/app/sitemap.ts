import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/content";
import { locales, type Locale } from "@/i18n/config";
import { getAllVisiblePosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/urls";

function entry(
  locale: Locale,
  path: string,
  priority: number,
  lastModified?: string | Date,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(locale, path),
    lastModified: lastModified ?? "2026-10-29",
    changeFrequency,
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
  const posts = getAllVisiblePosts().filter((post) => !post.draft);

  const home = locales.map((locale) => entry(locale, "/", 1));
  const blogIndex = locales.map((locale) =>
    entry(locale, "/blog", 0.9, undefined, "weekly"),
  );
  const cases = locales.flatMap((locale) =>
    slugs.map((slug) => entry(locale, `/work/${slug}`, 0.8)),
  );
  const blogPosts = posts.map((post) =>
    entry(
      post.locale as Locale,
      post.permalink,
      0.7,
      post.updated ?? post.date,
      "monthly",
    ),
  );

  return [...home, ...blogIndex, ...cases, ...blogPosts];
}
