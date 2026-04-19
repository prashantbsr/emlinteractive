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
        <h1 className="font-mono text-3xl font-semibold tracking-tight">
          <span className="text-primary">&gt;</span> eml repl
        </h1>
        <p className="text-sm text-muted-foreground">
          Build EML expressions one node at a time. The tree and its value update as you type.
        </p>
      </div>
      <PlaygroundClient />
    </div>
  );
}
