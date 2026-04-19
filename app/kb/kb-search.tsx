"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { articles, categoryLabel } from "@/lib/kb/articles";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function KbSearch() {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(articles, {
      includeScore: true,
      threshold: 0.4,
      keys: [
        { name: "title", weight: 0.5 },
        { name: "summary", weight: 0.2 },
        { name: "tags", weight: 0.2 },
        { name: "searchText", weight: 0.1 },
      ],
    });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="pl-9"
        />
      </div>
      {query.trim() && (
        <div className="rounded-lg border border-border bg-card">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">No matches.</p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((r) => (
                <li key={r.item.slug}>
                  <Link
                    href={`/kb/${r.item.slug}`}
                    className="flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-accent"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{r.item.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.item.summary}
                      </p>
                    </div>
                    <Badge variant="muted" className="shrink-0">
                      {categoryLabel[r.item.category]}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
