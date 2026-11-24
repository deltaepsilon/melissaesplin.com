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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
