import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDictionary } from "@/content";
import type { Locale } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/urls";

function getGoogleVerification(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    site.googleSiteVerification ||
    undefined
  );
}

export function buildPageMetadata(
  locale: Locale,
  options: {
    title?: string;
    description?: string;
    path?: string;
  } = {},
): Metadata {
  const dict = getDictionary(locale);
  const path = options.path ?? "/";
  const title = options.title ?? dict.meta.title;
  const description = options.description ?? dict.meta.description;
  const canonical = absoluteUrl(locale, path);
  const ogImageUrl = absoluteUrl(locale, "/opengraph-image");
  const ogImage = {
    url: ogImageUrl,
    width: 1200,
    height: 630,
    alt: `${site.name} — ${dict.hero.role}`,
  };

  const google = getGoogleVerification();

  return {
    title,
    description,
    keywords: [...site.keywords],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      alternateLocale: [dict.meta.alternateOgLocale],
      url: canonical,
      siteName: site.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    ...(google ? { verification: { google } } : {}),
  };
}
