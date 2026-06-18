import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sup Romagna — Eventi, Albe e Lezioni in SUP | Functional SUP Tribe",
    template: "%s | Functional SUP Tribe",
  },
  description: site.description,
  keywords: [
    "Alba in SUP Romagna",
    "SUP Romagna",
    "Eventi SUP Romagna",
    "AstroSUP",
    "Yoga SUP",
    "Lezioni SUP Cesenatico",
    "Team building SUP",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.name,
    title: "Sup Romagna — Eventi, Albe e Lezioni in SUP",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: "Riviera Romagnola",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cesenatico",
      addressRegion: "FC",
      addressCountry: "IT",
    },
    sameAs: [site.instagram],
  };

  return (
    <html lang="it" className={`${fraunces.variable} ${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
