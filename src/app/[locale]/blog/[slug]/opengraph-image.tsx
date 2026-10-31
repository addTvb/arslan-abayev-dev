import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getPost } from "@/lib/blog";

export const alt = `${site.name} — Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dict = getDictionary(locale);
  const post = getPost(locale, slug);
  const title = post?.title ?? dict.blog.title;
  const name = site.nameLocalized[locale];
  const eyebrow = dict.blog.eyebrow;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07090f",
          color: "#e8edf7",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#3d7aef",
              fontFamily: "monospace",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 70 ? 44 : 54,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#8b95a8",
          }}
        >
          <span>{name}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
