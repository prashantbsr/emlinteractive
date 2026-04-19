"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocEntry {
  id: string;
  label: string;
  level?: 2 | 3;
}

export function Toc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (events) => {
        const visible = events
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        // contents
      </div>
      <ol className="space-y-1 border-l border-border">
        {entries.map((entry, i) => {
          const isActive = active === entry.id;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  "block border-l-2 py-1 pl-3 font-mono text-[0.85rem] transition-colors -ml-px",
                  entry.level === 3 && "pl-6",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="mr-1 text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
