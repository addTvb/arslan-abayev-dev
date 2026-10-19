export const site = {
  name: "Arslan Abayev",
  role: "Senior Frontend Developer / Team Lead",
  tagline:
    "I turn frontend into growth, retention, and delivery reliability — and lead teams that ship it.",
  focus:
    "Best fit for product companies: B2B SaaS, analytics platforms, and growth-heavy web products.",
  availability:
    "Open to remote Senior Frontend / Team Lead roles in product companies.",
  location: "Remote",
  languages: "English · Russian",
  email: "arslan.web.dev@gmail.com",
  telegram: "https://t.me/addTvb",
  telegramHandle: "@addTvb",
  linkedin: "https://www.linkedin.com/in/arslan-abayev-addtvb/",
  url: "https://arslan-abayev-dev.vercel.app",
  firstNinetyDays:
    "In the first 90 days I map the product bottlenecks, stabilize critical UI paths, and set a delivery rhythm the team can trust.",
  keywords: [
    "Senior Frontend Developer",
    "Team Lead",
    "product engineering",
    "Next.js",
    "React",
    "TypeScript",
    "SaaS",
    "growth",
  ],
} as const;

export const proofPoints = [
  { label: "Organic traffic after rewrite", value: "3×" },
  { label: "Site traffic in a quarter", value: "+25–30%" },
  { label: "Post-release hotfixes", value: "−30%" },
  { label: "LCP → return visits lift", value: "−40% LCP" },
] as const;

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
    video: string | null;
  };
  live: boolean;
  note: string | null;
  story: StoryStep[];
  panels: PanelCopy;
};

export const projects: Project[] = [
  {
    id: "whattofarm",
    name: "WhatToFarm",
    url: "https://whattofarm.io/",
    period: "2021 — 2023",
    role: "Frontend owner of the platform rewrite",
    summary:
      "Unlocked organic growth for a DeFi analytics product by replacing a SEO-limited SPA with a product foundation built for acquisition and dense realtime data.",
    stakeholder: "Investors and traders who need trustworthy market data fast",
    stack: ["Next.js", "React", "TypeScript", "SSR / ISR", "SEO", "Virtualization"],
    media: {
      images: [
        "/projects/whattofarm/scanner.png",
        "/projects/whattofarm/pair-chart.png",
      ],
      // Drop whattofarm-live.webm (and optional .mp4) into public/projects/whattofarm/ then set the path here.
      video: null,
    },
    live: true,
    note: null,
    panels: {
      challengeTitle: "Acquisition was blocked by the product shell.",
      challengeNote:
        "If Google cannot read the product, growth stays paid-only — and dense tables still have to stay usable.",
      solutionSteps: [
        "Unblock crawlable, indexable product pages",
        "Keep high-density realtime UX fast under load",
        "Ship funnels that feed the core product again",
      ],
      solutionNote:
        "The rewrite was a business bet: reopen organic acquisition without freezing the analytics product.",
      outcomesTitle: "Growth and engagement moved together.",
      outcomesNote:
        "More discoverable pages, longer sessions, deeper exploration — the signals a product team can take into planning.",
    },
    story: [
      {
        id: "challenge",
        label: "01 · Challenge",
        title: "Organic growth was capped by the old product foundation.",
        body: "WhatToFarm served investors and traders who need dense DeFi data in real time. The Angular SPA made SEO weak, Core Web Vitals poor, and acquisition features expensive to ship — so growth depended on a broken shell.",
        points: [
          "Stakeholder need: trustworthy scanners and pair analytics under realtime pressure",
          "Business constraint: discoverability mattered as much as the dashboard itself",
          "Risk: a rewrite could freeze delivery if scoped as a pure tech migration",
        ],
      },
      {
        id: "solution",
        label: "02 · Solution",
        title: "I scoped the rewrite around what the business needed to unlock.",
        body: "I owned the migration end-to-end. The goal was not “move to Next.js” — it was to reopen organic acquisition, keep dense data usable, and give product a surface that could ship growth features again.",
        points: [
          "SSR/ISR and technical SEO so key pages could rank and convert",
          "Virtualized, optimized tables so thousands of rows stayed operable",
          "Landing and funnel surfaces shipped alongside the app — not after it",
        ],
      },
      {
        id: "outcomes",
        label: "03 · Business outcomes",
        title: "The bet paid back in traffic and engagement.",
        body: "After launch, the product became discoverable and stickier. Leadership got measurable movement on acquisition and session quality — not just a cleaner codebase.",
        metrics: [
          { value: "3×", label: "Organic traffic after launch" },
          { value: "+28%", label: "Organic growth in 3 months" },
          { value: "+22%", label: "Average time on site" },
          { value: "+1.4", label: "Pages per session" },
        ],
      },
      {
        id: "product",
        label: "04 · Product proof",
        title: "The interface users actually trade and research in.",
        body: "Scanner tables, pair charts, and live market surfaces — production UI that had to stay fast while carrying millions of tokens and pools.",
      },
    ],
  },
  {
    id: "clipshub",
    name: "Clipshub",
    url: "https://clipshub-two.vercel.app/",
    period: "2023 — 2026",
    role: "Senior Frontend Developer / Team Lead · GGHub",
    summary:
      "Built a high-load video SaaS frontend from scratch, then led the team so performance and release quality scaled with the business.",
    stakeholder: "Advertisers, creators, and internal ops running campaigns at volume",
    stack: ["React", "Next.js", "TypeScript", "Performance", "SaaS"],
    media: {
      images: [],
      video: null,
    },
    live: true,
    note: "Screenshots and screen recording coming soon.",
    panels: {
      challengeTitle: "Ops and revenue lived inside a fragile UI surface.",
      challengeNote:
        "When dashboards and moderation slow down, campaigns slip — and every hotfix burns trust.",
      solutionSteps: [
        "Ship multi-role product surfaces that match real workflows",
        "Treat performance as a revenue and retention lever",
        "Install delivery habits that cut emergency fixes",
      ],
      solutionNote:
        "I led both the critical code path and the operating system around it — prioritization, reviews, and CI gates.",
      outcomesTitle: "Speed and stability showed up in commercial signals.",
      outcomesNote:
        "Faster pages and fewer fire drills correlated with traffic and return visits — the language product leadership already tracks.",
    },
    story: [
      {
        id: "challenge",
        label: "01 · Challenge",
        title: "The SaaS could not grow if the frontend became the bottleneck.",
        body: "Clipshub had to support advertisers, creators, and internal ops across dashboards, admin, and moderation — under heavy video and ad volume. Slow pages and unpredictable releases directly hurt campaign operations.",
        points: [
          "50,000+ video clips / month and 5,000+ ad banners in production",
          "Multiple roles sharing one product surface with different jobs-to-be-done",
          "Team growth needed predictable delivery, not heroics after every release",
        ],
      },
      {
        id: "solution",
        label: "02 · Solution",
        title: "I built the product surface — then led how we decided what to ship.",
        body: "I owned frontend architecture and the hard paths, while setting planning, review, and CI gates so the team could move faster with less risk. Scope was driven by operational bottlenecks and business metrics, not by tooling preferences.",
        points: [
          "Multi-role dashboards, admin, and moderation matched to real workflows",
          "Performance program (splitting, lazy loading, caching) tied to LCP and return visits",
          "As Team Lead: prioritization, mentoring, and a Definition of Done the business could trust",
        ],
      },
      {
        id: "outcomes",
        label: "03 · Business outcomes",
        title: "Performance and process turned into commercial signals.",
        body: "Faster critical pages and cleaner releases correlated with traffic and retention — while urgent post-release hotfixes dropped. That is the ROI of frontend leadership.",
        metrics: [
          { value: "30 → 90+", label: "Lighthouse performance" },
          { value: "~40%", label: "LCP improvement" },
          { value: "+25–30%", label: "Site traffic in a quarter" },
          { value: "~30%", label: "Fewer post-release hotfixes" },
        ],
      },
      {
        id: "product",
        label: "04 · Product proof",
        title: "Private SaaS — media coming next.",
        body: "Screenshots and a short product walkthrough will land here. Until then, the story above is the operating model I bring to a product company.",
      },
    ],
  },
];

export const leadership = [
  {
    title: "Decide from bottlenecks",
    text: "I start from the user or revenue constraint — then choose the smallest frontend bet that moves the metric, and cut the rest.",
  },
  {
    title: "Trade-offs over tooling",
    text: "I connect tech debt, scope, and risk to outcomes leaders already track: traffic, retention, incident rate, and time-to-ship.",
  },
  {
    title: "Lead without leaving the code",
    text: "I still own the hard path — migrations, performance, critical UX — while installing a delivery rhythm the team can trust.",
  },
] as const;

export const leverageAreas = [
  {
    title: "Growth surfaces",
    items: ["SEO foundations", "Core Web Vitals", "Funnels & landings", "SSR / ISR"],
  },
  {
    title: "Dense product UX",
    items: ["Realtime data UI", "Virtualization", "Multi-role dashboards", "Caching"],
  },
  {
    title: "Delivery leverage",
    items: ["Architecture ownership", "CI quality gates", "Prioritization", "Mentoring"],
  },
  {
    title: "Core stack",
    items: ["React", "Next.js", "TypeScript", "TanStack Query"],
  },
] as const;
