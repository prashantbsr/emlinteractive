import type { Metadata } from "next";
import { PlaygroundClient } from "./playground-client";

const description =
  "Interactive EML playground. Build expressions from only `eml` and `1`, watch the tree assemble, and see the live numeric result.";

export const metadata: Metadata = {
  title: "Playground",
  description,
  alternates: { canonical: "/playground" },
  openGraph: {
    type: "website",
    title: "Playground · EMLinteractive",
    description,
    url: "/playground",
  },
  twitter: {
    card: "summary",
    title: "Playground · EMLinteractive",
    description,
  },
};

export default function PlaygroundPage() {
  return (
    <div className="container py-8">
      <div className="mb-6 space-y-1">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ~/playground
        </div>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-primary">
          eml playground
        </h1>
        <p className="text-sm text-muted-foreground">
          A scientific calculator whose every operation is a pure EML tree, plus
          a REPL for hand-rolled expressions. Switch with the tabs below, each
          answer comes with the underlying <code>eml(x, y)</code> expansion you
          can inspect.
        </p>
      </div>
      <PlaygroundClient />
    </div>
  );
}
