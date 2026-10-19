import { leverageAreas } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
          Leverage
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Where frontend creates business leverage.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Tools matter only as far as they unlock growth, usable product surfaces,
          and reliable delivery.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        {leverageAreas.map((group, index) => (
          <Reveal key={group.title} delayMs={index * 70}>
            <div>
              <h3 className="text-sm font-medium tracking-wide text-accent uppercase">
                {group.title}
              </h3>
              <p className="mt-4 font-display text-2xl leading-snug font-medium tracking-tight text-foreground">
                {group.items.join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
