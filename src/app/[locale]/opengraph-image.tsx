import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dict = getDictionary(locale);
  const name = site.nameLocalized[locale];
  const eyebrow =
    locale === "ru" ? "Открыт к remote ролям" : "Open to remote roles";
  const footer =
    locale === "ru" ? "Рост · Retention · Поставка" : "Growth · Retention · Delivery";

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
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3d7aef",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#8b95a8",
              maxWidth: 820,
            }}
          >
            {dict.hero.role}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8b95a8",
          }}
        >
          {footer}
        </div>
      </div>
    ),
    { ...size },
  );
}
