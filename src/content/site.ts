export const site = {
  name: "Arslan Abayev",
  nameLocalized: {
    en: "Arslan Abayev",
    ru: "Арслан Абаев",
  },
  role: "Senior Frontend Developer / Team Lead",
  url: "https://arslan-abayev-dev.vercel.app",
  email: "arslan.web.dev@gmail.com",
  telegram: "https://t.me/addTvb",
  telegramHandle: "@addTvb",
  linkedin: "https://www.linkedin.com/in/arslan-abayev-addtvb/",
  /** Set when the public GitHub profile URL is ready. */
  github: null as string | null,
  /** Path under /public or absolute URL. Set when CV PDF is uploaded. */
  cvUrl: null as string | null,
  yearsOfExperience: 5,
  location: {
    remote: true,
    country: "Georgia",
    region: "Tbilisi",
    timezone: "Asia/Tbilisi",
    timezoneLabel: "UTC+4",
  },
  companies: ["WhatToFarm", "GGHub"] as const,
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Core Web Vitals",
    "SSR",
    "ISR",
    "SEO",
    "Team Leadership",
    "Product Engineering",
    "SaaS",
    "Performance Optimization",
    "Mentoring",
  ] as const,
  keywords: [
    "Senior Frontend Developer",
    "Frontend Engineer",
    "Team Lead",
    "React",
    "Next.js",
    "TypeScript",
    "Core Web Vitals",
    "SSR",
    "ISR",
    "SaaS",
    "product engineering",
    "growth",
    "mentoring",
    "remote",
    "DeFi analytics",
    "video SaaS",
  ] as const,
  /**
   * Google Search Console HTML-tag verification code.
   * Prefer NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in env; this is a fallback.
   */
  googleSiteVerification: null as string | null,
} as const;

export type SiteConfig = typeof site;
