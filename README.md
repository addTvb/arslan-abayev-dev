# Arslan Abayev — Portfolio

Personal portfolio for **Arslan Abayev**, Senior Frontend Developer / Team Lead.

The site is built as a product-facing one-pager: case stories framed around business outcomes (growth, retention, delivery), not a library demo list.

**Live:** _add Vercel URL after deploy_  
**Contact:** [@addTvb](https://t.me/addTvb) · [arslan.web.dev@gmail.com](mailto:arslan.web.dev@gmail.com)

---

## Positioning

- Frontend ownership for SaaS / analytics / growth-heavy products
- Case format: challenge → bet → outcomes → proof
- Open to remote Senior Frontend / Team Lead roles in product companies

---

## Features

- Dark, calm UI with scroll storytelling (GSAP ScrollTrigger pin + scrub)
- Mobile: same story flow via swipe/scroll, no overlapping steps
- SEO baseline: metadata, Open Graph image, `sitemap.xml`, `robots.txt`
- Content-driven: most copy lives in one file for fast iteration
- Static-friendly Next.js App Router setup (Vercel-ready)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS 4 |
| Motion | GSAP + ScrollTrigger |
| Fonts | Syne · Manrope · IBM Plex Mono |
| Deploy target | Vercel |

---

## Project structure

```text
src/
  app/                 # layout, page, SEO routes (sitemap, robots, OG image)
  components/          # Hero, Work/CaseStory, Approach, Stack, Contact…
  content/site.ts      # all portfolio copy, metrics, case stories
public/
  me/                  # portrait
  projects/whattofarm/ # case screenshots / video slot
```

---

## Edit content

Almost all text is in:

```text
src/content/site.ts
```

There you can update:

- hero / availability / focus
- proof metrics
- case stories (WhatToFarm, Clipshub)
- leadership / leverage blocks
- contacts and site URL (used by SEO metadata)

**Clipshub media:** drop screenshots into `public/projects/clipshub/` and wire paths in `site.ts`.  
**WhatToFarm video:** `public/projects/whattofarm/whattofarm-live.webm` or `.mp4`.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

---

## Deploy

1. Import this repo in [Vercel](https://vercel.com/new)
2. Framework preset: Next.js
3. Set production domain
4. Update `site.url` in `src/content/site.ts` to the final domain (affects canonical, sitemap, OG)

---

## Roadmap (SEO / content)

- [ ] Final domain + Search Console
- [ ] JSON-LD `Person`
- [ ] Clipshub screenshots + short walkthrough
- [ ] Image/CWV pass on production
- [ ] Optional: dedicated case pages (`/work/...`)

---

## License

Private portfolio project. Source is shared for deployment and review; please don’t copy the design/content as your own.
