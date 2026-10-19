"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

type CaseStoryProps = {
  project: Project;
  index: number;
};

export function CaseStory({ project, index }: CaseStoryProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isMobile, reduceMotion } = context.conditions ?? {};
        const pinTarget = root.querySelector<HTMLElement>("[data-case-pin]");
        const stage = root.querySelector<HTMLElement>("[data-case-stage]");
        const visual = root.querySelector<HTMLElement>("[data-case-visual]");
        const steps = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-case-step]"),
        );
        const panels = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-case-panel]"),
        );
        const progressBars = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-case-progress]"),
        );
        const stepLabels = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-case-label]"),
        );
        const dots = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-case-dot]"),
        );

        if (!pinTarget || !stage || steps.length === 0) return;

        if (reduceMotion) {
          gsap.set([steps, panels], {
            clearProps: "all",
            autoAlpha: 1,
            y: 0,
            position: "relative",
          });
          return;
        }

        root.setAttribute("data-case-active", "true");

        const sizeStages = () => {
          const tallestStep = Math.max(
            ...steps.map((step) => step.scrollHeight),
            isMobile ? 280 : 420,
          );
          const stageHeight = tallestStep + (isMobile ? 16 : 32);
          stage.style.height = `${stageHeight}px`;
          stage.style.minHeight = `${stageHeight}px`;

          if (visual) {
            if (isMobile) {
              visual.style.height = "auto";
              visual.style.minHeight = "0";
              // Size to the tallest visible panel content.
              const tallestPanel = Math.max(
                ...panels.map((panel) => panel.scrollHeight),
                220,
              );
              visual.style.height = `${tallestPanel}px`;
              visual.style.minHeight = `${tallestPanel}px`;
            } else {
              const visualHeight = Math.max(stageHeight + 96, 520);
              visual.style.height = `${visualHeight}px`;
              visual.style.minHeight = `${visualHeight}px`;
            }
          }
        };

        gsap.set(steps, {
          autoAlpha: 1,
          y: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
        gsap.set(panels, {
          autoAlpha: 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        });
        sizeStages();

        gsap.set(steps, { autoAlpha: 0, y: isMobile ? 12 : 20 });
        gsap.set(steps[0], { autoAlpha: 1, y: 0 });
        gsap.set(panels, { autoAlpha: 0 });
        if (panels[0]) gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(stepLabels, { opacity: 0.35 });
        if (stepLabels[0]) gsap.set(stepLabels[0], { opacity: 1 });
        gsap.set(dots, { opacity: 0.35, scale: 0.85 });
        if (dots[0]) gsap.set(dots[0], { opacity: 1, scale: 1 });
        gsap.set(progressBars, { scaleX: 0, transformOrigin: "left center" });

        const headerOffset = isDesktop ? 80 : 72;
        const scrollDistance = isMobile
          ? Math.max(window.innerHeight * steps.length * 0.95, 1600)
          : Math.max(window.innerHeight * (steps.length + 0.35), 2800);

        const setActiveDot = (activeIndex: number) => {
          dots.forEach((dot, i) => {
            gsap.set(dot, {
              opacity: i === activeIndex ? 1 : 0.35,
              scale: i === activeIndex ? 1 : 0.85,
            });
          });
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: `top top+=${headerOffset}`,
            end: () => `+=${scrollDistance}`,
            pin: pinTarget,
            scrub: isMobile ? 0.45 : 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: true,
            fastScrollEnd: true,
            onRefresh: sizeStages,
            onUpdate: (self) => {
              const activeIndex = Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length),
              );
              setActiveDot(activeIndex);
            },
          },
        });

        progressBars.forEach((bar) => {
          tl.to(bar, { scaleX: 1, duration: steps.length }, 0);
        });

        steps.forEach((_, stepIndex) => {
          if (stepIndex === 0) return;
          const at = stepIndex;

          tl.to(steps[stepIndex - 1], { autoAlpha: 0, y: -14, duration: 0.8 }, at);
          tl.to(steps[stepIndex], { autoAlpha: 1, y: 0, duration: 0.8 }, at);

          if (panels[stepIndex - 1] && panels[stepIndex]) {
            tl.to(panels[stepIndex - 1], { autoAlpha: 0, duration: 0.8 }, at);
            tl.to(panels[stepIndex], { autoAlpha: 1, duration: 0.8 }, at);
          }

          if (stepLabels[stepIndex - 1] && stepLabels[stepIndex]) {
            tl.to(stepLabels[stepIndex - 1], { opacity: 0.35, duration: 0.45 }, at);
            tl.to(stepLabels[stepIndex], { opacity: 1, duration: 0.45 }, at);
          }
        });

        const onResize = () => {
          sizeStages();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("orientationchange", onResize);
          root.removeAttribute("data-case-active");
          gsap.set([steps, panels, stage, visual], { clearProps: "all" });
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  const primaryImage = project.media.images[0] ?? null;
  const secondaryImage = project.media.images[1] ?? primaryImage;

  return (
    <article
      ref={rootRef}
      id={project.id}
      className="relative"
      aria-label={`${project.name} case study`}
    >
      <div
        data-case-pin
        className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-6 lg:min-h-[calc(100svh-5.5rem)] lg:py-8"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-8">
          <div className="flex min-w-0 flex-col">
            <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="font-mono text-xs text-muted">0{index + 1}</span>
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.name}
              </h3>
            </div>
            <p className="mb-2 text-sm text-accent">
              {project.role} · {project.period}
            </p>
            <p className="mb-6 max-w-xl text-sm text-muted lg:mb-8">
              For: {project.stakeholder}
            </p>

            <div className="mb-5 flex gap-2 lg:mb-8 lg:gap-5">
              {project.story.map((step) => (
                <span
                  key={step.id}
                  data-case-label
                  className="hidden font-mono text-[11px] tracking-[0.14em] text-foreground uppercase lg:inline"
                >
                  {step.label.split("·")[0]?.trim()}
                </span>
              ))}
              <div className="flex items-center gap-2 lg:hidden">
                {project.story.map((step) => (
                  <span
                    key={`dot-${step.id}`}
                    data-case-dot
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                ))}
                <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  Swipe to continue
                </span>
              </div>
            </div>

            <div
              data-case-stage
              className="relative min-h-[18rem] overflow-hidden lg:min-h-[30rem]"
            >
              {project.story.map((step) => (
                <div
                  key={step.id}
                  data-case-step
                  className="w-full"
                >
                  <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                    {step.label}
                  </p>
                  <h4 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-[1.45rem] leading-snug font-semibold tracking-tight sm:mt-4 sm:text-[1.85rem]">
                    {step.title}
                  </h4>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
                    {step.body}
                  </p>

                  {step.points && step.points.length > 0 && (
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-foreground/90 sm:mt-6 sm:space-y-3">
                      {step.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
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
                          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground sm:text-2xl">
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
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80 sm:mt-7"
                    >
                      Open live product
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 lg:mt-6">
              <div className="h-px overflow-hidden bg-border">
                <div
                  data-case-progress
                  className="h-full origin-left scale-x-0 bg-accent"
                />
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px] lg:mt-4">
                <span className="lg:hidden">Swipe up to walk the business case</span>
                <span className="hidden lg:inline">
                  Scroll to walk the business case
                </span>
              </p>
            </div>
          </div>

          <div
            data-case-visual
            className="relative w-full overflow-hidden lg:min-h-[30rem]"
          >
            {project.story.map((step) => (
              <div
                key={`${project.id}-${step.id}-panel`}
                data-case-panel
                className="w-full"
              >
                <StoryPanel
                  project={project}
                  stepId={step.id}
                  primaryImage={primaryImage}
                  secondaryImage={secondaryImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.id === "whattofarm" && primaryImage && (
        <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated">
            <video
              className="aspect-video w-full bg-black/40 object-cover"
              controls
              playsInline
              preload="metadata"
              poster={primaryImage}
            >
              <source src={project.media.video ?? undefined} type="video/webm" />
              <source
                src="/projects/whattofarm/whattofarm-live.mp4"
                type="video/mp4"
              />
            </video>
            <p className="border-t border-border px-4 py-3 text-xs text-muted">
              Add recording:{" "}
              <code className="text-foreground/80">
                public/projects/whattofarm/whattofarm-live.webm
              </code>
            </p>
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
}: {
  project: Project;
  stepId: string;
  primaryImage: string | null;
  secondaryImage: string | null;
}) {
  if (stepId === "challenge") {
    return (
      <PanelShell>
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          Business brief
        </p>
        <div className="mt-auto">
          <p className="font-[family-name:var(--font-display)] text-xl leading-snug font-semibold tracking-tight sm:text-3xl">
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
          The bet
        </p>
        <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
          {project.panels.solutionSteps.map((item, i) => (
            <li key={item} className="flex items-start gap-3 sm:gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs text-accent">
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
          Executive snapshot
        </p>
        <div className="mt-auto">
          <p className="font-[family-name:var(--font-display)] text-xl leading-snug font-semibold tracking-tight sm:text-3xl">
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
    const imageSrc =
      stepId === "product" && secondaryImage ? secondaryImage : primaryImage;

    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated">
        <Image
          src={imageSrc}
          alt={`${project.name} product interface`}
          width={1440}
          height={900}
          className="h-auto w-full object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
      </div>
    );
  }

  return (
    <PanelShell>
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
        Product proof
      </p>
      <div className="mt-auto">
        <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          {project.note ??
            "Screenshots and walkthrough media will be added in this panel."}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-medium text-accent"
          >
            Visit live site ↗
          </a>
        )}
      </div>
    </PanelShell>
  );
}

function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[16rem] flex-col justify-between rounded-2xl border border-border bg-gradient-to-br from-accent/15 via-transparent to-transparent bg-background-elevated p-5 sm:min-h-[22rem] sm:p-9 lg:min-h-full lg:h-full">
      {children}
    </div>
  );
}
