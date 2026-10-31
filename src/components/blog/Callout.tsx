import type { ReactNode } from "react";

type CalloutProps = {
  title?: string;
  children: ReactNode;
};

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="my-8 rounded-2xl border border-border bg-background-elevated px-5 py-4 sm:px-6 sm:py-5">
      {title ? (
        <p className="mb-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {title}
        </p>
      ) : null}
      <div className="text-[0.95rem] leading-relaxed text-muted [&_a]:text-accent [&_p]:m-0 [&_p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
