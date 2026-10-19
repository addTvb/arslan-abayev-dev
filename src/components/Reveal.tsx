"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        window.setTimeout(() => {
          node.classList.add("is-visible");
        }, delayMs);
        observer.unobserve(node);
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={`reveal transition-[opacity,transform] duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
