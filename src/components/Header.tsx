"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Leverage" },
  { href: "#contact", label: "Contact" },
] as const;

const socials = [
  { href: `mailto:${site.email}`, label: "Email", external: false },
  { href: site.linkedin, label: "LinkedIn", external: true },
  {
    href: site.telegram,
    label: "Telegram",
    external: true,
    accent: true,
  },
] as const;

function socialClassName(accent?: boolean) {
  return accent
    ? "rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
    : "rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground";
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 520px)").matches) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-background/55 transition-opacity duration-280 ease-out min-[520px]:hidden motion-reduce:transition-none ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={close}
      />

      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
          <a
            href="#top"
            className="shrink-0 font-display text-sm font-semibold tracking-[0.18em] uppercase text-foreground"
            onClick={close}
          >
            {site.name}
          </a>

          <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <div className="hidden items-center gap-2 min-[520px]:flex sm:gap-2.5">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={socialClassName("accent" in item && item.accent)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 hover:text-accent min-[520px]:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="relative block h-3.5 w-4" aria-hidden>
                <span
                  className={`absolute left-0 block h-0.5 w-full origin-center bg-current transition-[transform,top] duration-280 ease-out motion-reduce:transition-none ${
                    open ? "top-1.5 rotate-45" : "top-0 rotate-0"
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 block h-0.5 w-full bg-current transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full origin-center bg-current transition-[transform,top] duration-280 ease-out motion-reduce:transition-none ${
                    open ? "top-1.5 -rotate-45" : "top-3 rotate-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id={menuId}
          className={`grid min-[520px]:hidden motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          } transition-[grid-template-rows] duration-280 ease-out`}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            <div
              className={`border-t border-border bg-background/95 backdrop-blur-md transition-[opacity,transform] duration-280 ease-out motion-reduce:transition-none ${
                open
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0"
              }`}
            >
              <nav
                className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4"
                inert={!open || undefined}
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    tabIndex={open ? undefined : -1}
                    className="rounded-lg px-3 py-3 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                  {socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      tabIndex={open ? undefined : -1}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={
                        "accent" in item && item.accent
                          ? "rounded-full border border-accent/40 bg-accent-soft px-4 py-2.5 text-center text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
                          : "rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
                      }
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
