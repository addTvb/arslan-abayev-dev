import { leadership } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Approach() {
  return (
    <section
      id="approach"
      className="border-y border-border bg-background-elevated/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            How I work
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Product decisions first. Code second.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Promoted to Team Lead when the company needed someone who could set
            direction, cut scope, and still own the critical path.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {leadership.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <div className="border-t border-accent/40 pt-6">
                <h3 className="font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
