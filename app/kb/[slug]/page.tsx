import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles, getArticle, categoryLabel } from "@/lib/kb/articles";
import { Badge } from "@/components/ui/badge";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashantbsr.github.io/emlinteractive";
const personId = `${siteUrl}/about#person`;

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  const path = `/kb/${a.slug}`;
  return {
    title: a.title,
    description: a.summary,
    keywords: a.tags,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      url: path,
      tags: a.tags,
    },
    twitter: {
      card: "summary",
      title: a.title,
      description: a.summary,
    },
  };
}

async function loadMdx(slug: string) {
  try {
    const mod = await import(`@/content/knowledge-base/${slug}.mdx`);
    return mod.default;
  } catch {
    return null;
  }
}

export default async function KbArticle({ params }: Params) {
  const { slug } = await params;
  const meta = getArticle(slug);
  if (!meta) notFound();
  const MDX = await loadMdx(slug);
  if (!MDX) notFound();

  const articleUrl = `${siteUrl}/kb/${meta.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.summary,
    keywords: meta.tags.join(", "),
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteUrl}#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
    author: { "@id": personId },
    creator: { "@id": personId },
    publisher: { "@id": personId },
  };

  return (
    <article className="prose-kb max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/kb"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> All articles
        </Link>
        <Badge variant="muted">{categoryLabel[meta.category]}</Badge>
      </div>
      <MDX />
      <div className="mt-12 flex flex-wrap gap-1 border-t border-border pt-6">
        {meta.tags.map((t) => (
          <Badge key={t} variant="muted" className="text-[10px]">
            {t}
          </Badge>
        ))}
      </div>
    </article>
  );
}
