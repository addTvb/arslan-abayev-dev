import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { Reveal } from "@/components/Reveal";

type ContactProps = {
  dict: Dictionary;
};

export function Contact({ dict }: ContactProps) {
  return (
    <section
      id="contact"
      className="border-t border-border bg-background-elevated/50"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {dict.contact.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.contact.title}
          </h2>
          <p className="mt-5 max-w-2xl text-muted">
            {dict.contact.firstNinetyDays}
          </p>
          <p className="mt-3 max-w-xl text-sm text-muted">{dict.contact.prefer}</p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {dict.contact.telegramCta} {site.telegramHandle}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft"
            >
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft"
            >
              {dict.contact.linkedin}
            </a>
            {site.github ? (
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                {dict.contact.github}
              </a>
            ) : null}
            {site.cvUrl ? (
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                {dict.contact.cv}
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 {site.name}</p>
          <p>
            {dict.contact.locationLine} · {dict.contact.languages}
          </p>
        </div>
      </footer>
    </section>
  );
}
