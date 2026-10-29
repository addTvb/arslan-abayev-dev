import type { Dictionary } from "@/content/types";
import { Reveal } from "@/components/Reveal";

type ApproachProps = {
  dict: Dictionary;
};

export function Approach({ dict }: ApproachProps) {
  return (
    <section
      id="approach"
      className="border-y border-border bg-background-elevated/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {dict.approach.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.approach.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{dict.approach.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {dict.approach.items.map((item, index) => (
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
