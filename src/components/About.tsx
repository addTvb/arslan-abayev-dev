import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { Reveal } from "@/components/Reveal";

type AboutProps = {
  dict: Dictionary;
};

export function About({ dict }: AboutProps) {
  const facts = [
    {
      label: dict.about.yearsLabel,
      value: dict.about.yearsValue,
    },
    {
      label: dict.about.locationLabel,
      value: dict.contact.locationLine,
    },
    {
      label: dict.about.companiesLabel,
      value: site.companies.join(" · "),
    },
    {
      label: dict.about.stackLabel,
      value: "React · Next.js · TypeScript",
    },
    {
      label: dict.about.openToLabel,
      value: dict.hero.availability,
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
          {dict.about.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {dict.about.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {dict.about.body}
        </p>
      </Reveal>

      <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact, index) => (
          <Reveal key={fact.label} delayMs={index * 60}>
            <div className="border-t border-accent/40 pt-5">
              <dt className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                {fact.label}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {fact.value}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
