import type { Dictionary } from "@/content/types";

type TocItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  items: TocItem[];
  labels: Dictionary["blog"];
  variant?: "sidebar" | "mobile";
};

export function TableOfContents({
  items,
  labels,
  variant = "sidebar",
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  if (variant === "mobile") {
    return (
      <nav
        aria-label={labels.tocTitle}
        className="mb-10 rounded-2xl border border-border bg-background-elevated/60 px-4 py-4 lg:hidden"
      >
        <p className="mb-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {labels.tocTitle}
        </p>
        <ol className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      aria-label={labels.tocTitle}
      className="sticky top-28 hidden lg:block"
    >
      <p className="mb-3 font-mono text-xs tracking-[0.18em] text-accent uppercase">
        {labels.tocTitle}
      </p>
      <ol className="space-y-2.5 border-l border-border pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-sm leading-snug text-muted transition-colors hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
