import type { MetadataRoute } from "next";
import { library } from "@/lib/eml/library";
import { articles } from "@/lib/kb/articles";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashantbsr.github.io/emlinteractive";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const stat = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    stat("/", 1.0),
    stat("/playground", 0.95),
    stat("/gallery", 0.8),
    stat("/kb", 0.8),
    ...library.map((f) => stat(`/gallery/${f.slug}`, 0.7)),
    ...articles.map((a) => stat(`/kb/${a.slug}`, 0.6)),
  ];
}
