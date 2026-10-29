import Image from "next/image";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  const displayName = site.nameLocalized[locale];

  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-end gap-10 px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14"
    >
      <div className="relative z-10 min-w-0">
        <Reveal>
          <p className="mb-5 font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {dict.hero.availability}
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <h1 className="font-display text-[clamp(3.1rem,8vw,5.6rem)] leading-[0.92] font-semibold tracking-[-0.03em] text-foreground">
            {displayName}
          </h1>
        </Reveal>

        <Reveal delayMs={140}>
          <p className="mt-5 font-display text-xl text-muted sm:text-2xl">
            {dict.hero.role}
          </p>
        </Reveal>

        <Reveal delayMs={180}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
            {dict.hero.tagline}
          </p>
        </Reveal>

        <Reveal delayMs={220}>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {dict.hero.focus}
          </p>
        </Reveal>

        <Reveal delayMs={260}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              {dict.hero.ctaCases}
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

      <Reveal
        delayMs={120}
        className="relative mx-auto w-full max-w-96 lg:mx-0 lg:w-auto lg:max-w-none lg:justify-self-end"
      >
        <div className="relative mx-auto w-full max-w-80 p-6 sm:max-w-96 lg:w-md lg:max-w-none">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-accent/35 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[18%] rounded-full bg-accent/45 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12%] left-1/2 h-[60%] w-3/5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_68%)]"
          />
          <div className="relative aspect-square overflow-hidden rounded-full bg-background-elevated shadow-[0_0_56px_-12px_var(--accent-glow)] ring-1 ring-accent/25">
            <Image
              src="/me/ars.png"
              alt={`${displayName} — portrait`}
              width={768}
              height={768}
              priority
              fetchPriority="high"
              className="size-full object-cover object-[50%_18%]"
              sizes="(max-width: 640px) 20rem, (max-width: 1024px) 24rem, 28rem"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
