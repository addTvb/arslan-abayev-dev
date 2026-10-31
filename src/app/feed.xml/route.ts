import { site } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/urls";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPosts("en").filter((post) => !post.draft);
  const latest =
    posts
      .map((post) => post.updated || post.date)
      .sort((a, b) => (a < b ? 1 : -1))[0] ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = absoluteUrl("en", post.permalink);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${site.name} — Blog`)}</title>
    <link>${escapeXml(absoluteUrl("en", "/blog"))}</link>
    <description>${escapeXml(
      "Notes on frontend ownership, delivery, and product leverage.",
    )}</description>
    <language>en</language>
    <lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
