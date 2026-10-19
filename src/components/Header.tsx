import { site } from "@/content/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Leverage" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] uppercase text-foreground"
        >
          {site.name}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
        >
          Telegram
        </a>
      </div>
    </header>
  );
}
