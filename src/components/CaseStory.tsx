import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary, Project } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";

type CaseLabels = Dictionary["work"];

type CaseStoryProps = {
  project: Project;
  index: number;
  locale: Locale;
  labels: CaseLabels;
  /** When true, hide the “full case” link (already on the case page). */
  standalone?: boolean;
};

export function CaseStory({
  project,
  index,
  locale,
  labels,
  standalone = false,
}: CaseStoryProps) {
  const primaryImage = project.media.images[0] ?? null;
  const secondaryImage = project.media.images[1] ?? primaryImage;
  const caseHref = localePath(locale, `/work/${project.id}`);

  return (
    <article
      id={project.id}
      className="relative py-10 lg:py-16"
      aria-label={`${project.name} case study`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 lg:mb-14">
          <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-muted">0{index + 1}</span>
            {standalone ? (
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.name}
              </h1>
            ) : (
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <Link
                  href={caseHref}
                  className="transition-colors hover:text-accent"
                >
                  {project.name}
                </Link>
              </h3>
            )}
          </div>
          <p className="mb-2 text-sm text-accent">
            {project.role} · {project.period}
          </p>
          <p className="max-w-xl text-sm text-muted">
            {labels.forLabel} {project.stakeholder}
          </p>
          {!standalone && (
            <Link
              href={caseHref}
              className="mt-4 inline-flex text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
            >
              {labels.readCase} →
            </Link>
          )}
        </div>

        <div className="space-y-14 lg:space-y-20">
          {project.story.map((step) => (
            <div
              key={step.id}
              className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                  {step.label}
                </p>
                <h4 className="mt-3 max-w-xl font-display text-[1.45rem] leading-snug font-semibold tracking-tight sm:mt-4 sm:text-[1.85rem]">
                  {step.title}
                </h4>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
                  {step.body}
                </p>

                {step.points && step.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-foreground/90 sm:mt-6 sm:space-y-3">
                    {step.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.metrics && step.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
                    {step.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-border bg-background-elevated/80 px-3 py-3 sm:px-4 sm:py-4"
                      >
                        <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-muted sm:mt-1.5 sm:text-xs">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {step.id === "product" && (
                  <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {step.id === "product" && project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline sm:mt-7"
                  >
                    {labels.openLive}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>

              <div className="w-full">
                <StoryPanel
                  project={project}
                  stepId={step.id}
                  primaryImage={primaryImage}
                  secondaryImage={secondaryImage}
                  labels={labels}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {project.media.video && (
        <div className="mx-auto mt-10 max-w-6xl px-5 sm:mt-14 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated">
            <video
              className="aspect-video w-full bg-black/40 object-cover"
              controls
              playsInline
              preload="metadata"
              poster={primaryImage ?? undefined}
            >
              <source src={project.media.video} type="video/webm" />
              {project.media.video.endsWith(".webm") && (
                <source
                  src={project.media.video.replace(/\.webm$/, ".mp4")}
                  type="video/mp4"
                />
              )}
            </video>
          </div>
        </div>
      )}
    </article>
  );
}

function StoryPanel({
  project,
  stepId,
  primaryImage,
  secondaryImage,
  labels,
}: {
  project: Project;
  stepId: string;
  primaryImage: string | null;
  secondaryImage: string | null;
  labels: CaseLabels;
}) {
  if (stepId === "challenge") {
    return (
      <PanelShell>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {labels.businessBrief}
        </p>
        <div className="mt-auto">
          <p className="font-display text-xl leading-snug font-semibold tracking-tight sm:text-3xl">
            {project.panels.challengeTitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
            {project.summary}
          </p>
          <div className="mt-6 rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm text-foreground/90 sm:mt-8">
            {project.panels.challengeNote}
          </div>
        </div>
      </PanelShell>
    );
  }

  if (stepId === "solution") {
    return (
      <PanelShell>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {labels.theBet}
        </p>
        <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
          {project.panels.solutionSteps.map((item, i) => (
            <li key={item} className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs text-accent">
                {i + 1}
              </span>
              <span className="pt-1.5 text-sm text-foreground/90 sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-8 text-sm leading-relaxed text-muted sm:pt-10">
          {project.panels.solutionNote}
        </p>
      </PanelShell>
    );
  }

  if (stepId === "outcomes") {
    return (
      <PanelShell>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {labels.executiveSnapshot}
        </p>
        <div className="mt-auto">
          <p className="font-display text-xl leading-snug font-semibold tracking-tight sm:text-3xl">
            {project.panels.outcomesTitle}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
            {project.panels.outcomesNote}
          </p>
        </div>
      </PanelShell>
    );
  }

  if (primaryImage) {
    const imageIndex =
      stepId === "product" && secondaryImage && project.media.images[1]
        ? 1
        : 0;
    const imageSrc =
      stepId === "product" && secondaryImage ? secondaryImage : primaryImage;
    const imageAlt =
      project.media.imageAlts[imageIndex] ??
      `${project.name} product interface`;

    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1440}
          height={900}
          className="h-auto w-full object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 560px"
          quality={85}
        />
        {project.url && stepId === "product" && (
          <div className="border-t border-border px-4 py-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
            >
              {labels.visitLive} ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <PanelShell>
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
        {labels.productProof}
      </p>
      <div className="mt-auto">
        <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          {project.note ?? labels.mediaPlaceholder}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
          >
            {labels.visitLive} ↗
          </a>
        )}
      </div>
    </PanelShell>
  );
}

function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background-elevated p-5 sm:min-h-88 sm:p-9 lg:h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/15 via-transparent to-transparent"
      />
      <div className="relative flex min-h-0 flex-1 flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
