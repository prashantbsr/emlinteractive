import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { library, getFunction } from "@/lib/eml/library";
import { FunctionDetailClient } from "./function-detail-client";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashantbsr.github.io/emlinteractive";
const personId = `${siteUrl}/about#person`;

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return library.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const fn = getFunction(slug);
  if (!fn) return { title: "Function not found" };
  const title = fn.displayName;
  const description = `${fn.displayName} rebuilt as an EML tree of depth ${fn.depth}: ${fn.formula}`;
  const path = `/gallery/${fn.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function GalleryDetailPage({ params }: Params) {
  const { slug } = await params;
  const fn = getFunction(slug);
  if (!fn) notFound();
  const pageUrl = `${siteUrl}/gallery/${fn.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${fn.displayName} as an EML tree`,
    description: `${fn.displayName} rebuilt as an EML tree of depth ${fn.depth}: ${fn.formula}`,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    proficiencyLevel: "Expert",
    about: {
      "@type": "DefinedTerm",
      name: fn.displayName,
      description: fn.description,
    },
    author: { "@id": personId },
    creator: { "@id": personId },
    publisher: { "@id": personId },
  };

  return (
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-6">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to gallery
        </Link>
      </div>
      <FunctionDetailClient fn={fn} />
    </div>
  );
}
