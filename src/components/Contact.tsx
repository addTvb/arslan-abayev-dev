import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-border bg-background-elevated/50"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Looking for a remote product role where frontend owns outcomes — not
            just tickets.
          </h2>
          <p className="mt-5 max-w-2xl text-muted">{site.firstNinetyDays}</p>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Prefer Telegram for a quick intro. Email or LinkedIn for formal
            recruiting threads.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Telegram {site.telegramHandle}
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
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 {site.name}</p>
          <p>
            {site.location} · {site.languages}
          </p>
        </div>
      </footer>
    </section>
  );
}
