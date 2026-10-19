import { projects } from "@/content/site";
import { CaseStory } from "@/components/CaseStory";
import { Reveal } from "@/components/Reveal";

export function Work() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
            Selected work
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Cases framed the way product leaders make decisions.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Not a library tour — each story shows the business constraint, the bet I
            made, and the outcomes. Scroll a case on desktop to walk the narrative.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 space-y-8 lg:mt-6 lg:space-y-0">
        {projects.map((project, index) => (
          <CaseStory key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
