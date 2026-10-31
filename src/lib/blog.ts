import { posts } from "#site/content";
import type { Locale } from "@/i18n/config";

export type BlogPost = (typeof posts)[number];

export type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== "production";
}

function isVisible(post: BlogPost): boolean {
  return includeDrafts() || !post.draft;
}

export function getPosts(locale: Locale): BlogPost[] {
  return posts
    .filter((post) => post.locale === locale && isVisible(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(
  locale: Locale,
  slug: string,
): BlogPost | undefined {
  return posts.find(
    (post) =>
      post.locale === locale && post.slug === slug && isVisible(post),
  );
}

export function getAllVisiblePosts(): BlogPost[] {
  return posts
    .filter(isVisible)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(locale: Locale): string[] {
  return getPosts(locale).map((post) => post.slug);
}

export function getSiblingPost(
  post: BlogPost,
  targetLocale: Locale,
): BlogPost | undefined {
  return posts.find(
    (candidate) =>
      candidate.translationKey === post.translationKey &&
      candidate.locale === targetLocale &&
      isVisible(candidate),
  );
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  if (post.tags.length === 0) return [];

  const tagSet = new Set(post.tags);
  return getPosts(post.locale as Locale)
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => tagSet.has(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || (a.post.date < b.post.date ? 1 : -1),
    )
    .slice(0, limit)
    .map((item) => item.post);
}

export function flattenToc(entries: TocEntry[]): { id: string; text: string }[] {
  const result: { id: string; text: string }[] = [];
  for (const entry of entries) {
    const id = entry.url.replace(/^#/, "");
    if (entry.title && id) {
      result.push({ id, text: entry.title });
    }
    if (entry.items?.length) {
      result.push(...flattenToc(entry.items));
    }
  }
  return result;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatPostDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
