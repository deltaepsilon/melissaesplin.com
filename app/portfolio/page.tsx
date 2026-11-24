import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Curated live engraving, onsite brand activations, pointed-pen calligraphy, wedding stationery, and watercolor work by Melissa Esplin.",
};

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-border/60 bg-[var(--background-secondary)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
              Curated Portfolio
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Engraving, Calligraphy &amp; Studio Work
            </h1>
            <p className="text-base leading-relaxed text-foreground/75">
              A timeless selection of Melissa&apos;s live onsite engraving, hand-painted
              activations, pointed-pen wedding stationery, and watercolor lettering.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <PortfolioGallery items={PORTFOLIO_ITEMS} showFilters />

          <div className="mt-20 rounded-2xl border border-border/80 bg-[var(--background-secondary)] p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/70">
              Planning an Event or Commission?
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">
              Let&apos;s bring live lettering or engraving to your guests
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/75">
              Share your event date, location, and surfaces to receive availability and a
              custom quote.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Link
                href="/inquire/"
                className="rounded-md bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book an Event
              </Link>
              <a
                href="https://www.instagram.com/melissapher/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground/5"
              >
                Follow @melissapher
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
