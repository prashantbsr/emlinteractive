import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { library, pendingFunctions } from "@/lib/eml/library";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const description =
  "Browse elementary functions rebuilt from the EML operator. Each card shows the formula, tree depth, and a working derivation.";

export const metadata: Metadata = {
  title: "Function Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    title: "Function Gallery · EMLinteractive",
    description,
    url: "/gallery",
  },
  twitter: {
    card: "summary",
    title: "Function Gallery · EMLinteractive",
    description,
  },
};

const categoryLabel: Record<string, string> = {
  constant: "Constant",
  unary: "Unary",
  binary: "Binary",
  transcendental: "Transcendental",
};

export default function GalleryPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Function Gallery</h1>
        <p className="max-w-2xl text-muted-foreground">
          Each card is an elementary function rebuilt in pure EML. Click one to see the full tree and
          walk through the derivation. Depth is the height of the EML tree — lower is simpler.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {library.map((f) => (
          <Link key={f.slug} href={`/gallery/${f.slug}`} className="block">
            <Card className="h-full transition-colors hover:border-primary/60">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="font-mono text-base">{f.symbol}</CardTitle>
                  <Badge variant="outline">depth {f.depth}</Badge>
                </div>
                <CardDescription>{f.displayName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <code className="block truncate rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {f.formula}
                </code>
                <div className="flex items-center justify-between">
                  <Badge variant="muted">{categoryLabel[f.category]}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-md border border-dashed border-border bg-muted/30 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold tracking-tight">
            Coming in v2
          </h2>
          <span className="text-xs text-muted-foreground">
            Paper Table 4 — verified trees pending
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          These functions exist in the paper but their concrete EML trees are
          not yet shipped in this library. They depend on multi-step
          constructions that the v1 release intentionally defers.
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {pendingFunctions.map((p) => (
            <li
              key={p.name}
              className="flex items-start justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
            >
              <div className="min-w-0">
                <p className="font-mono text-sm">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.note}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                K = {p.codeLength}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
