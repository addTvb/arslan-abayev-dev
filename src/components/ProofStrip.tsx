import { proofPoints } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function ProofStrip() {
  return (
    <section className="border-y border-border bg-background-elevated/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {proofPoints.map((item, index) => (
          <Reveal key={item.label} delayMs={index * 60}>
            <div className="px-5 py-8 sm:px-8">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
