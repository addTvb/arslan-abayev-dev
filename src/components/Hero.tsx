import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-end gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10"
    >
      <div className="relative z-10 min-w-0">
        <Reveal>
          <p className="mb-5 font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {site.availability}
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3.1rem,8vw,5.6rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-foreground">
            {site.name}
          </h1>
        </Reveal>

        <Reveal delayMs={140}>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-xl text-muted sm:text-2xl">
            {site.role}
          </p>
        </Reveal>

        <Reveal delayMs={180}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {site.tagline}
          </p>
        </Reveal>

        <Reveal delayMs={220}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {site.focus}
          </p>
        </Reveal>

        <Reveal delayMs={260}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-[transform,opacity] hover:opacity-90 active:scale-[0.98]"
            >
              See business cases
            </a>
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft"
            >
              {site.telegramHandle}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delayMs={120} className="relative w-full lg:justify-self-end">
        <div className="relative mx-auto w-full max-w-[28rem] sm:max-w-[34rem] lg:mx-0 lg:max-w-[38rem]">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-background-elevated ring-1 ring-border">
            <Image
              src="/me/arslan.jpg"
              alt={`${site.name} — portrait`}
              width={768}
              height={960}
              priority
              className="h-auto w-full object-cover object-[50%_18%]"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 34rem, 38rem"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
