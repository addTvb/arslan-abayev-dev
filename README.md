# Arslan Abayev — Portfolio

Personal portfolio for **Arslan Abayev**, Senior Frontend Developer / Team Lead.

The site is built as a product-facing portfolio: case stories framed around business outcomes (growth, retention, delivery), with EN + RU locales for recruiters and employers.

**Live:** [arslan-abayev-dev.vercel.app](https://arslan-abayev-dev.vercel.app)  
**RU:** [arslan-abayev-dev.vercel.app/ru](https://arslan-abayev-dev.vercel.app/ru)  
**Contact:** [@addTvb](https://t.me/addTvb) · [arslan.web.dev@gmail.com](mailto:arslan.web.dev@gmail.com) · [LinkedIn](https://www.linkedin.com/in/arslan-abayev-addtvb/)

---



## Positioning

- Frontend ownership for SaaS / analytics / growth-heavy products
- Case format: challenge → bet → outcomes → proof
- Open to remote Senior Frontend / Team Lead roles in product companies
- Bilingual: English (default, no URL prefix) · Russian (`/ru`)

---



## Features

- Dark, calm UI with scroll storytelling
- EN + RU content, `hreflang`, locale-aware metadata
- JSON-LD `Person` / `WebSite` / case `CreativeWork`
- Dedicated case pages (`/work/[slug]`, `/ru/work/[slug]`)
- SEO: Open Graph, `sitemap.xml`, `robots.txt`, Search Console verification hook
- Content-driven dictionaries in `src/content/`
- Static-friendly Next.js App Router setup (Vercel-ready)

---



## Stack


| Layer         | Choice                                        |
| ------------- | --------------------------------------------- |
| Framework     | Next.js 16 (App Router)                       |
| Language      | TypeScript                                    |
| UI            | Tailwind CSS 4                                |
| Fonts         | Montserrat (latin + cyrillic) · IBM Plex Mono |
| Deploy target | Vercel                                        |


---



## Project structure

```text
src/
  app/[locale]/       # pages, OG image, case routes
  app/sitemap.ts      # EN + RU + case URLs
  app/robots.ts
  components/         # Hero, About, Work/CaseStory, …
  content/            # site.ts + en.ts + ru.ts dictionaries
  i18n/config.ts      # locales, localePath helpers
  lib/                # seo, json-ld, urls
  proxy.ts            # EN unprefixed · RU under /ru
public/
  me/                 # portrait
  projects/whattofarm/
  projects/clipshub/  # drop screenshots here when ready
```

---



## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (EN) and [http://localhost:3000/ru](http://localhost:3000/ru).

```bash
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # TypeScript
npm run check      # lint + typecheck + build
```



### Pre-commit checks

Husky runs `npm run check` before every commit.  
If a check fails, the commit is blocked. To skip in an emergency: `HUSKY=0 git commit …`.

---



## License

Private portfolio project. Source is shared for deployment and review; please don’t copy the design/content as your own.