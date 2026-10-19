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

const STEP_DURATION = 0.38;
/** Accumulated wheel delta (px) required to take one step. */
const WHEEL_INTENT = 90;
/** Cap a single wheel event so one hard flick can't jump the threshold alone. */
const WHEEL_DELTA_CAP = 48;
/** After a step, ignore further wheel/touch for this long (kills trackpad inertia). */
const STEP_COOLDOWN_MS = 820;
const SWIPE_INTENT = 56;

/** Only one case can capture wheel/swipe at a time. */
let activeCaseId: string | null = null;

export function CaseStory({ project, index }: CaseStoryProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop:
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        isMobile:
          "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
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

        const total = steps.length;
        const headerOffset = isDesktop ? 80 : 72;
        const slideY = isMobile ? 16 : 22;

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
          autoAlpha: 0,
          y: slideY,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 0,
        });
        gsap.set(panels, {
          autoAlpha: 0,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 0,
        });
        gsap.set(steps[0], {
          autoAlpha: 1,
          y: 0,
          pointerEvents: "auto",
          zIndex: 2,
        });
        if (panels[0]) {
          gsap.set(panels[0], {
            autoAlpha: 1,
            pointerEvents: "auto",
            zIndex: 2,
          });
        }
        gsap.set(stepLabels, { opacity: 0.35 });
        if (stepLabels[0]) gsap.set(stepLabels[0], { opacity: 1 });
        gsap.set(dots, { opacity: 0.35, scale: 0.85 });
        if (dots[0]) gsap.set(dots[0], { opacity: 1, scale: 1 });
        gsap.set(progressBars, {
          scaleX: total > 1 ? 0 : 1,
          transformOrigin: "left center",
        });
        sizeStages();

        let current = 0;
        /** capturing = case owns input; released = page scroll may leave the pin */
        let mode: "idle" | "capturing" | "released" = "idle";
        let tween: gsap.core.Timeline | null = null;
        let animating = false;
        let lockedUntil = 0;
        let wheelAcc = 0;
        let touchStartY = 0;
        let touchActive = false;

        const applyChrome = (activeIndex: number) => {
          steps.forEach((step, i) => {
            const active = i === activeIndex;
            step.style.pointerEvents = active ? "auto" : "none";
            step.style.zIndex = active ? "2" : "0";
          });
          panels.forEach((panel, i) => {
            const active = i === activeIndex;
            panel.style.pointerEvents = active ? "auto" : "none";
            panel.style.zIndex = active ? "2" : "0";
          });
          stepLabels.forEach((label, i) => {
            gsap.set(label, { opacity: i === activeIndex ? 1 : 0.35 });
          });
          dots.forEach((dot, i) => {
            gsap.set(dot, {
              opacity: i === activeIndex ? 1 : 0.35,
              scale: i === activeIndex ? 1 : 0.85,
            });
          });
          const progress = total > 1 ? activeIndex / (total - 1) : 1;
          gsap.to(progressBars, {
            scaleX: progress,
            duration: STEP_DURATION,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const paintStep = (activeIndex: number, fromY: number) => {
          steps.forEach((step, i) => {
            const active = i === activeIndex;
            gsap.set(step, {
              autoAlpha: active ? 1 : 0,
              y: active ? 0 : fromY,
              pointerEvents: active ? "auto" : "none",
              zIndex: active ? 2 : 0,
            });
          });
          panels.forEach((panel, i) => {
            const active = i === activeIndex;
            gsap.set(panel, {
              autoAlpha: active ? 1 : 0,
              pointerEvents: active ? "auto" : "none",
              zIndex: active ? 2 : 0,
            });
          });
          applyChrome(activeIndex);
        };

        const goTo = (nextIndex: number, direction: 1 | -1) => {
          if (animating || nextIndex === current) return false;
          if (nextIndex < 0 || nextIndex >= total) return false;

          const prevIndex = current;
          current = nextIndex;
          animating = true;
          lockedUntil = performance.now() + STEP_COOLDOWN_MS;
          wheelAcc = 0;
          tween?.kill();
          applyChrome(nextIndex);

          const outY = direction > 0 ? -slideY : slideY;
          const inY = direction > 0 ? slideY : -slideY;

          tween = gsap.timeline({
            defaults: { duration: STEP_DURATION, ease: "power2.out" },
            onComplete: () => {
              animating = false;
              tween = null;
            },
          });

          tween.to(steps[prevIndex], { autoAlpha: 0, y: outY }, 0);
          if (panels[prevIndex]) {
            tween.to(panels[prevIndex], { autoAlpha: 0 }, 0);
          }
          tween.fromTo(
            steps[nextIndex],
            { autoAlpha: 0, y: inY },
            { autoAlpha: 1, y: 0 },
            0,
          );
          if (panels[nextIndex]) {
            tween.fromTo(
              panels[nextIndex],
              { autoAlpha: 0 },
              { autoAlpha: 1 },
              0,
            );
          }

          return true;
        };

        const pinDistance = () => Math.max(window.innerHeight * 0.8, 520);

        const engage = (fromBottom: boolean) => {
          activeCaseId = project.id;
          mode = "capturing";
          root.setAttribute("data-case-engaged", "true");
          animating = false;
          lockedUntil = 0;
          wheelAcc = 0;
          tween?.kill();
          if (fromBottom) {
            current = total - 1;
            paintStep(total - 1, -slideY);
          } else {
            current = 0;
            paintStep(0, slideY);
          }
        };

        const disengage = () => {
          if (activeCaseId === project.id) activeCaseId = null;
          root.removeAttribute("data-case-engaged");
        };

        const trigger = ScrollTrigger.create({
          id: `case-${project.id}`,
          trigger: root,
          start: `top top+=${headerOffset}`,
          end: () => `+=${pinDistance()}`,
          pin: pinTarget,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          preventOverlaps: true,
          onRefresh: sizeStages,
          onEnter: () => engage(false),
          onEnterBack: () => engage(true),
          onLeave: () => {
            mode = "idle";
            disengage();
          },
          onLeaveBack: () => {
            mode = "idle";
            disengage();
          },
        });

        if (trigger.isActive) {
          engage(trigger.progress > 0.5);
        }

        const isCapturing = () =>
          mode === "capturing" && activeCaseId === project.id;

        const holdPinScroll = () => {
          if (!isCapturing() || !trigger.isActive) return;
          const y = trigger.start + 1;
          if (Math.abs(window.scrollY - y) > 4) {
            window.scrollTo({ top: y, behavior: "auto" });
          }
        };

        const exitDown = () => {
          mode = "released";
          disengage();
          animating = false;
          wheelAcc = 0;
          lockedUntil = performance.now() + 200;
          window.scrollTo({ top: trigger.end + 32, behavior: "auto" });
        };

        const exitUp = () => {
          mode = "released";
          disengage();
          animating = false;
          wheelAcc = 0;
          lockedUntil = performance.now() + 200;
          window.scrollTo({
            top: Math.max(0, trigger.start - 32),
            behavior: "auto",
          });
        };

        const commitDirection = (direction: 1 | -1) => {
          holdPinScroll();
          if (direction > 0) {
            if (current < total - 1) goTo(current + 1, 1);
            else exitDown();
            return;
          }
          if (current > 0) goTo(current - 1, -1);
          else exitUp();
        };

        const onWheel = (event: WheelEvent) => {
          if (!isCapturing()) return;

          event.preventDefault();
          holdPinScroll();

          const now = performance.now();
          if (animating || now < lockedUntil) {
            wheelAcc = 0;
            return;
          }

          // Normalize line/page deltas to pixel-ish values, then soften spikes.
          let dy = event.deltaY;
          if (event.deltaMode === 1) dy *= 16;
          if (event.deltaMode === 2) dy *= window.innerHeight;
          dy = Math.sign(dy) * Math.min(Math.abs(dy), WHEEL_DELTA_CAP);

          wheelAcc += dy;

          if (Math.abs(wheelAcc) < WHEEL_INTENT) return;

          const direction: 1 | -1 = wheelAcc > 0 ? 1 : -1;
          wheelAcc = 0;
          commitDirection(direction);
        };

        const onTouchStart = (event: TouchEvent) => {
          if (!isCapturing()) return;
          touchActive = true;
          touchStartY = event.touches[0]?.clientY ?? 0;
        };

        const onTouchMove = (event: TouchEvent) => {
          if (!isCapturing() || !touchActive) return;
          event.preventDefault();
          holdPinScroll();
        };

        const onTouchEnd = (event: TouchEvent) => {
          if (!isCapturing() || !touchActive) return;
          touchActive = false;

          const now = performance.now();
          if (animating || now < lockedUntil) return;

          const endY = event.changedTouches[0]?.clientY ?? touchStartY;
          const delta = touchStartY - endY;
          if (Math.abs(delta) < SWIPE_INTENT) return;

          commitDirection(delta > 0 ? 1 : -1);
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        const onResize = () => {
          sizeStages();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);

        return () => {
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchmove", onTouchMove);
          window.removeEventListener("touchend", onTouchEnd);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("orientationchange", onResize);
          tween?.kill();
          trigger.kill();
          if (activeCaseId === project.id) activeCaseId = null;
          root.removeAttribute("data-case-active");
          root.removeAttribute("data-case-engaged");
          gsap.set([steps, panels, stage, visual], { clearProps: "all" });
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, [project.id]);

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
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
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
                    className="size-1.5 rounded-full bg-accent"
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
              className="relative min-h-72 overflow-hidden lg:min-h-120"
            >
              {project.story.map((step, stepIndex) => (
                <div
                  key={step.id}
                  data-case-step
                  className="w-full"
                  style={{
                    pointerEvents: stepIndex === 0 ? "auto" : "none",
                    zIndex: stepIndex === 0 ? 2 : 0,
                  }}
                >
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
                <span className="lg:hidden">
                  Swipe once to open the next beat
                </span>
                <span className="hidden lg:inline">
                  Scroll once to open the next beat
                </span>
              </p>
            </div>
          </div>

          <div
            data-case-visual
            className="relative w-full overflow-hidden lg:min-h-120"
          >
            {project.story.map((step, stepIndex) => (
              <div
                key={`${project.id}-${step.id}-panel`}
                data-case-panel
                className="w-full"
                style={{
                  pointerEvents: stepIndex === 0 ? "auto" : "none",
                  zIndex: stepIndex === 0 ? 2 : 0,
                }}
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

      {project.media.video && (
        <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
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
          The bet
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
          Executive snapshot
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
        {project.url && stepId === "product" && (
          <div className="border-t border-border px-4 py-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
            >
              Visit live site ↗
            </a>
          </div>
        )}
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
            className="relative z-10 mt-6 inline-flex text-sm font-medium text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
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
