export type StoryStep = {
  id: string;
  label: string;
  title: string;
  body: string;
  points?: string[];
  metrics?: { value: string; label: string }[];
};

export type PanelCopy = {
  challengeTitle: string;
  challengeNote: string;
  solutionSteps: string[];
  solutionNote: string;
  outcomesTitle: string;
  outcomesNote: string;
};

export type Project = {
  id: string;
  name: string;
  url: string | null;
  period: string;
  role: string;
  summary: string;
  stakeholder: string;
  stack: string[];
  media: {
    images: string[];
    imageAlts: string[];
    video: string | null;
  };
  live: boolean;
  note: string | null;
  story: StoryStep[];
  panels: PanelCopy;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
    alternateOgLocale: string;
  };
  nav: {
    work: string;
    about: string;
    approach: string;
    stack: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    langEn: string;
    langRu: string;
  };
  hero: {
    availability: string;
    role: string;
    tagline: string;
    focus: string;
    ctaCases: string;
  };
  proof: { label: string; value: string }[];
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    forLabel: string;
    openLive: string;
    visitLive: string;
    readCase: string;
    backToWork: string;
    businessBrief: string;
    theBet: string;
    executiveSnapshot: string;
    productProof: string;
    mediaPlaceholder: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    yearsLabel: string;
    yearsValue: string;
    locationLabel: string;
    companiesLabel: string;
    stackLabel: string;
    openToLabel: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; text: string }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    subtitle: string;
    areas: { title: string; items: string[] }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    firstNinetyDays: string;
    prefer: string;
    telegramCta: string;
    linkedin: string;
    github: string;
    cv: string;
    languages: string;
    locationLine: string;
  };
  projects: Project[];
};
