import type { Metadata } from "next";
import Script from "next/script";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { AttributionTracker } from "@/components/Attribution";

// ID container Google Tag Manager (pubblico). Override possibile via env.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NHZBRWWP";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alba in SUP sulla Riviera Romagnola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
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
    <html lang="it" className={`${baloo.variable} ${jakarta.variable} h-full`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col bg-cream text-navy">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AttributionTracker />
        <Header />
        <main className="flex-1 pb-32 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
