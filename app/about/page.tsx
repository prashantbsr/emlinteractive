import type { Metadata } from "next";
import Link from "next/link";
import { ContactCard } from "@/components/landing/contact-card";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashantbsr.github.io/emlinteractive";
const personId = `${siteUrl}/about#person`;

const description =
  "About EMLinteractive and its author Dr. Prashant Sharma, founder of Pensieve Labs.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About · EMLinteractive",
    description,
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "About · EMLinteractive",
    description,
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${siteUrl}/about`,
  mainEntity: { "@id": personId },
  isPartOf: { "@id": `${siteUrl}#website` },
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <header className="mb-8 space-y-2">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ~/about
        </div>
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-primary md:text-4xl">
          about this site
        </h1>
        <p className="text-base text-muted-foreground">
          EMLinteractive is a personal research-and-learning playground for the
          EML operator from{" "}
          <a
            href="https://arxiv.org/html/2603.21852v2"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-2"
          >
            Odrzywołek&apos;s 2026 paper
          </a>
          . It is written and maintained by{" "}
          <strong className="font-semibold">Dr. Prashant Sharma</strong>.
        </p>
      </header>

      <section className="prose-nerd max-w-none space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Who maintains this</h2>
        <p>
          I&apos;m Prashant Sharma, founder of{" "}
          <a
            href="https://pensievelabs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pensieve Labs
          </a>
          . I came across this paper out of curiosity, found the NAND-for-math
          framing irresistible, and built this app to walk through the
          construction interactively. It pairs a live calculator, a function
          gallery, and a knowledge base of short notes.
        </p>

        <h2 className="text-xl font-semibold tracking-tight">What you&apos;ll find here</h2>
        <ul>
          <li>
            <Link href="/">Landing notes</Link> — intuition, NAND analogy,
            worked examples, ISA discussion.
          </li>
          <li>
            <Link href="/playground">Playground</Link> — interactive calculator
            and REPL backed by pure EML trees.
          </li>
          <li>
            <Link href="/gallery">Function gallery</Link> — verified EML
            decompositions of elementary functions.
          </li>
          <li>
            <Link href="/kb">Knowledge base</Link> — short articles on the
            paper, glossary, FAQ, math background.
          </li>
          <li>
            <Link href="/paper">The paper</Link> — full-text reproduction with
            KaTeX rendering.
          </li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight">Get in touch</h2>
      </section>

      <div className="mt-6">
        <ContactCard />
      </div>
    </div>
  );
}
