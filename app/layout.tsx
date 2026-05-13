import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashantbsr.github.io/emlinteractive";
const title = "EMLinteractive, One operator, all of math";
const description =
  "Interactive learning playground for the EML operator: how a single binary operation can generate every elementary mathematical function.";
const authorName = "Dr. Prashant Sharma";
const authorUrl = "https://prashant.pensievelabs.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · EMLinteractive",
  },
  description,
  applicationName: "EMLinteractive",
  keywords: [
    "EML",
    "EML operator",
    "Sheffer stroke",
    "elementary functions",
    "exp",
    "ln",
    "symbolic regression",
    "interactive math",
    "Odrzywolek",
    "Prashant Sharma",
    "Pensieve Labs",
  ],
  authors: [{ name: authorName, url: authorUrl }],
  creator: authorName,
  publisher: authorName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "EMLinteractive",
    title,
    description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "EMLinteractive — one operator, all of math",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@prashantbsr",
    images: [`${siteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personId = `${siteUrl}/about#person`;
const websiteId = `${siteUrl}#website`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: authorName,
      alternateName: ["Prashant Sharma", "Prashant"],
      url: authorUrl,
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        name: "Pensieve Labs",
        url: "https://pensievelabs.org",
      },
      sameAs: [
        "https://github.com/prashantbsr",
        "https://www.linkedin.com/in/dr-prashant-sharma-pensieve-trishulguy",
        "https://prashant.pensievelabs.org",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: "EMLinteractive",
      description,
      inLanguage: "en-US",
      author: { "@id": personId },
      creator: { "@id": personId },
      publisher: { "@id": personId },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plexMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
