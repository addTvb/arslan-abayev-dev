export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Path without locale prefix, always starting with `/`. */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname || "/";
}

/**
 * Build a public URL path for a locale.
 * EN (default) has no prefix; RU uses `/ru`.
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized =
    path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
