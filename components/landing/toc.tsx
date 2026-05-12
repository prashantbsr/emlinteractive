"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocEntry {
  id: string;
  label: string;
  level?: 2 | 3;
}

function useActiveSection(entries: TocEntry[]) {
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

  return active;
}

export function Toc({ entries }: { entries: TocEntry[] }) {
  const active = useActiveSection(entries);

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        contents
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

export function TocMobileBar({ entries }: { entries: TocEntry[] }) {
  const active = useActiveSection(entries);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const activeIdx = entries.findIndex((e) => e.id === active);
  const activeEntry = activeIdx >= 0 ? entries[activeIdx] : entries[0];
  const displayIdx = activeIdx >= 0 ? activeIdx : 0;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close table of contents"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
        />
      )}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden"
        )}
      >
        {open && (
          <nav
            aria-label="Table of contents"
            className="max-h-[60vh] overflow-y-auto px-4 pb-3 pt-4"
          >
            <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              contents
            </div>
            <ol className="space-y-1 border-l border-border">
              {entries.map((entry, i) => {
                const isActive = active === entry.id;
                return (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-l-2 py-1.5 pl-3 font-mono text-[0.85rem] transition-colors -ml-px",
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
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Collapse table of contents" : "Expand table of contents"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-full items-center justify-between gap-2 px-4 font-mono text-xs"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="text-muted-foreground/60">
              {String(displayIdx + 1).padStart(2, "0")}
            </span>
            <span className="truncate text-foreground">
              {activeEntry?.label ?? "contents"}
            </span>
          </span>
          <ChevronUp
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
      </div>
    </>
  );
}
