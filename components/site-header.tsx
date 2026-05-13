"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/",            label: "Home"       },
  { href: "/paper",       label: "Paper"      },
  { href: "/playground",  label: "Playground" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* ── Window frame: raised chrome wrapping titlebar + menubar ─── */}
      <div className="raised bg-background">
        {/* Titlebar — indigo accent strip */}
        <div
          className="flex h-7 items-center justify-between gap-3 px-3 font-mono text-xs font-bold tracking-wide"
          style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
        >
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            style={{ color: "var(--accent-fg)" }}
          >
            <span aria-hidden>■</span>
            <span className="truncate">EML: The NAND of Mathematics</span>
          </Link>
        </div>

        {/* Menubar */}
        <div
          className="flex h-8 items-center justify-between gap-1 px-2 font-mono text-xs"
          style={{ borderTop: "1px solid var(--shadow)", background: "var(--bg)", color: "var(--fg)" }}
        >
          <nav className="flex items-center">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2 py-1 transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]",
                    active && "bg-[var(--accent)] text-[var(--accent-fg)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            suppressHydrationWarning
            className="raised inline-flex h-[22px] items-center gap-1.5 px-2 text-[11px] font-bold uppercase tracking-wide hover:bg-[var(--hilite)]"
            style={{ background: "var(--bg)", color: "var(--fg)" }}
          >
            <span suppressHydrationWarning className="inline-flex items-center">
              {mounted && theme === "light" ? (
                <>
                  <Moon className="h-3 w-3" aria-hidden />
                  <span className="ml-1">dark</span>
                </>
              ) : (
                <>
                  <Sun className="h-3 w-3" aria-hidden />
                  <span className="ml-1">light</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
