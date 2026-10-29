import { site } from "@/content/site";
import { localePath, type Locale } from "@/i18n/config";

export function absoluteUrl(locale: Locale, path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  const localized = localePath(locale, path);
  return localized === "/" ? base : `${base}${localized}`;
}

export function languageAlternates(path = "/") {
  return {
    en: absoluteUrl("en", path),
    ru: absoluteUrl("ru", path),
    "x-default": absoluteUrl("en", path),
  } as const;
}
