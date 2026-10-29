import type { Dictionary } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { CaseStory } from "@/components/CaseStory";
import { Reveal } from "@/components/Reveal";

type WorkProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Work({ locale, dict }: WorkProps) {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {dict.work.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.work.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{dict.work.subtitle}</p>
        </Reveal>
      </div>

      <div className="mt-10 space-y-4 lg:mt-6 lg:space-y-0">
        {dict.projects.map((project, index) => (
          <CaseStory
            key={project.id}
            project={project}
            index={index}
            locale={locale}
            labels={dict.work}
          />
        ))}
      </div>
    </section>
  );
}
