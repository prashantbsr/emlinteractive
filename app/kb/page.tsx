import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { groupByCategory, categoryLabel, articles } from "@/lib/kb/articles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const description =
  "Searchable reference: paper summaries, glossary, FAQ, and math background for the EML operator.";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description,
  alternates: { canonical: "/kb" },
  openGraph: {
    type: "website",
    title: "Knowledge Base · EMLinteractive",
    description,
    url: "/kb",
  },
  twitter: {
    card: "summary",
    title: "Knowledge Base · EMLinteractive",
    description,
  },
};

export default function KbIndex() {
  const grouped = groupByCategory();
  const order: (keyof typeof grouped)[] = [
    "paper",
    "glossary",
    "faq",
    "math",
    "about",
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="max-w-2xl text-muted-foreground">
          {articles.length} short articles covering the paper, glossary entries, frequently asked
          questions, and the math background you might want to brush up on.
        </p>
      </header>

      {order.map((cat) => {
        const list = grouped[cat];
        if (list.length === 0) return null;
        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                {categoryLabel[cat]}
              </h2>
              <span className="text-xs text-muted-foreground">{list.length} articles</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((a) => (
                <Link key={a.slug} href={`/kb/${a.slug}`} className="block">
                  <Card className="h-full transition-colors hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{a.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{a.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {a.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="muted" className="text-[10px]">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs text-primary">
                          Read <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
