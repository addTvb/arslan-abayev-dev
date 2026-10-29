import { site } from "@/content/site";
import type { Dictionary, Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/urls";

export function personJsonLd(locale: Locale, dict: Dictionary) {
  const sameAs: string[] = [site.linkedin, site.telegram];
  if (site.github) sameAs.push(site.github);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.nameLocalized[locale],
    alternateName:
      locale === "en" ? site.nameLocalized.ru : site.nameLocalized.en,
    jobTitle: dict.hero.role,
    description: dict.meta.description,
    url: absoluteUrl(locale),
    email: site.email,
    image: `${site.url}/me/ars.png`,
    sameAs,
    knowsAbout: [...site.knowsAbout],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GE",
        addressLocality: site.location.region,
      },
      name: `${site.location.country} (${site.location.timezoneLabel})`,
    },
    worksFor: site.companies.map((name) => ({
      "@type": "Organization",
      name,
    })),
    knowsLanguage: ["en", "ru"],
  };
}

export function websiteJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl(locale),
    description: dict.meta.description,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: site.name,
      url: absoluteUrl(locale),
    },
  };
}

export function caseStudyJsonLd(
  locale: Locale,
  project: Project,
  dict: Dictionary,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} — ${dict.work.readCase}`,
    headline: project.summary,
    description: project.summary,
    url: absoluteUrl(locale, `/work/${project.id}`),
    inLanguage: locale,
    about: project.stack,
    author: {
      "@type": "Person",
      name: site.name,
      jobTitle: dict.hero.role,
      url: absoluteUrl(locale),
    },
    creator: {
      "@type": "Person",
      name: site.name,
    },
    ...(project.media.images[0]
      ? { image: `${site.url}${project.media.images[0]}` }
      : {}),
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
