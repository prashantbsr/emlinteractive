"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { articles, categoryLabel, groupByCategory } from "@/lib/kb/articles";
import { cn } from "@/lib/utils";

export function KbSidebar() {
  const pathname = usePathname();
  const grouped = groupByCategory();
  const order: (keyof typeof grouped)[] = [
    "paper",
    "glossary",
    "faq",
    "math",
    "about",
  ];

  return (
    <nav className="space-y-6 text-sm">
      {order.map((cat) => {
        const list = grouped[cat];
        if (list.length === 0) return null;
        return (
          <div key={cat}>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {categoryLabel[cat]}
            </div>
            <ul className="space-y-1">
              {list.map((a) => {
                const href = `/kb/${a.slug}`;
                const active = pathname === href;
                return (
                  <li key={a.slug}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground",
                        active
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {a.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <p className="pt-4 text-xs text-muted-foreground">
        {articles.length} articles
      </p>
    </nav>
  );
}
