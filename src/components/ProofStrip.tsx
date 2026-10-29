import type { Dictionary } from "@/content/types";
import { Reveal } from "@/components/Reveal";

type ProofStripProps = {
  dict: Dictionary;
};

export function ProofStrip({ dict }: ProofStripProps) {
  return (
    <section
      aria-label={dict.work.eyebrow}
      className="border-y border-border bg-background-elevated/60"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {dict.proof.map((item, index) => (
          <Reveal key={item.label} delayMs={index * 60}>
            <div className="px-5 py-8 sm:px-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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
