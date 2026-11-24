import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.melissaesplin.com"),
  title: {
    default: "Melissa Esplin — Live Onsite Engraving & Modern Calligraphy",
    template: "%s | Melissa Esplin",
  },
  description:
    "Live onsite fragrance & glass engraving, luxury brand activations, wedding calligraphy, and bespoke lettering by Melissa Esplin in Draper, Utah & nationwide.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.melissaesplin.com/",
    siteName: "Melissa Esplin",
    title: "Melissa Esplin — Live Onsite Engraving & Modern Calligraphy",
    description:
      "Live onsite fragrance & glass engraving, luxury brand activations, wedding calligraphy, and bespoke lettering in Draper, Utah & nationwide.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const studioJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["Person", "LocalBusiness", "ProfessionalService"],
    "@id": "https://www.melissaesplin.com/#studio",
    name: "Melissa Esplin",
    url: "https://www.melissaesplin.com/",
    jobTitle: "Calligrapher & Live Onsite Engraver",
    description:
      "Live onsite fragrance and glass engraving, luxury brand activations, wedding calligraphy, and bespoke lettering based in Draper, Utah and traveling nationwide.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Draper",
      addressRegion: "UT",
      addressCountry: "US",
    },
    areaServed: ["Utah", "United States"],
    sameAs: [
      "https://www.instagram.com/melissapher",
      "https://calligraphy.org",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
