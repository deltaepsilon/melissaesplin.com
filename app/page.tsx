import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const ENGRAVING_HIGHLIGHTS = [
  {
    title: "Fragrance & Glass",
    description:
      "Hand-engraved calligraphy and botanical flourishes on perfume bottles, wine, spirits, candles, and glassware.",
  },
  {
    title: "Live Bag Painting",
    description:
      "Bespoke florals and monograms hand-painted onsite onto leather goods, velvet totes, and cosmetic cases.",
  },
  {
    title: "Brand Activations",
    description:
      "Polished, guest-ready personalization for luxury retail launches, VIP trunk shows, and press previews.",
  },
  {
    title: "Corporate & Private",
    description:
      "Memorable live keepsakes for galas, holiday parties, executive gifting, and milestone celebrations.",
  },
];

const CALLIGRAPHY_SERVICES = [
  {
    title: "Envelopes & Suites",
    description:
      "Pointed-pen envelope addressing, custom monograms, and heirloom calligraphy for wedding invitations.",
  },
  {
    title: "Menus & Place Cards",
    description:
      "Deckled-edge menus, escort cards, and table details crafted in metallic, white, or custom-mixed inks.",
  },
  {
    title: "Bespoke Commissions",
    description:
      "Original framed quotes, event signage, brand lettering, and custom watercolor-and-script pieces.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Editorial Hero */}
      <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-[var(--background-dark)]">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Melissa Esplin writing pointed-pen calligraphy in gold ink"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#060606]/82 via-[#0f0f0f]/70 to-[#201b18]/60" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-28">
          <div className="max-w-3xl space-y-8 text-left text-[var(--text-light)] drop-shadow-[0_15px_45px_rgba(0,0,0,0.45)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/75">
              Draper, Utah &middot; Nationwide Travel
            </p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              Live Onsite Engraving &amp; Modern Calligraphy
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              Elevated guest experiences and heirloom lettering for luxury brand activations,
              private events, weddings, and custom studio commissions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/inquire/"
                className="inline-flex items-center justify-center rounded-md border border-white bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#2c2c2c] transition-colors hover:bg-white/90"
              >
                Book an Event
              </Link>
              <Link
                href="/portfolio/"
                className="inline-flex items-center justify-center rounded-md border border-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Onsite Engraving & Brand Activations */}
      <section id="services" className="bg-[var(--background)] py-28">
        <div id="engraving" className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="order-2 space-y-8 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
                Onsite Events &amp; Engraving
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Unforgettable Live Personalization
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-foreground/75">
                Turn luxury products into keepsakes right before your guests&apos; eyes.
                With years of studio and live-event experience across glass, metal, fragrance
                bottles, leather, and textiles, Melissa brings calm precision and artistic
                flair to every activation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/inquire/"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Check Event Availability
                </Link>
                <Link
                  href="/portfolio/"
                  className="inline-flex items-center justify-center rounded-md border border-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground/5"
                >
                  See Engraving Work
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_35px_60px_-30px_rgba(0,0,0,0.45)]">
                <img
                  src="/images/section-engraving.jpg"
                  alt="Miss Dior perfume bottle hand-engraved in calligraphy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ENGRAVING_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-white/75 p-6 transition-colors duration-300 hover:border-foreground/40"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-foreground/80">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Calligraphy & Commissions */}
      <section id="calligraphy" className="bg-[var(--background-secondary)] py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
                Calligraphy &amp; Commissions
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Heirloom Lettering by Hand
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-foreground/75">
                From pointed-pen wedding envelopes and gold-ink dinner menus to bespoke
                watercolor florals and custom brand lettering, every piece is lettered by
                hand in Melissa&apos;s Utah studio and shipped nationwide.
              </p>
              <Link
                href="/inquire/"
                className="inline-flex items-center justify-center rounded-md border border-foreground px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Request a Commission Quote
              </Link>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_35px_60px_-30px_rgba(0,0,0,0.45)]">
                <img
                  src="/images/section-calligraphy.jpg"
                  alt="Navy and copper pointed-pen wedding stationery suite"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {CALLIGRAPHY_SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-3 rounded-xl border border-border/60 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/40 hover:bg-white/90"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-foreground/80">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Curated Timeless Gallery */}
      <section className="bg-[var(--background)] py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
                Selected Work
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Portfolio Highlights
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio/"
                className="inline-flex items-center justify-center rounded-md border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Full Portfolio
              </Link>
              <a
                href="https://www.instagram.com/melissapher/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
              >
                @melissapher on Instagram
              </a>
            </div>
          </div>

          <PortfolioGallery items={PORTFOLIO_ITEMS} featuredOnly showFilters />
        </div>
      </section>

      {/* Section 4: Meet Melissa & Booking CTA */}
      <section id="about" className="bg-[var(--background-secondary)] py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="overflow-hidden rounded-[1.5rem] shadow-[0_35px_60px_-30px_rgba(0,0,0,0.35)]">
              <img
                src="/images/portrait.jpg"
                alt="Melissa Esplin smiling in her Draper, Utah studio"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
                Meet the Artist
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Melissa Esplin
              </h2>
              <p className="text-base leading-relaxed text-foreground/75">
                Melissa Esplin is a calligrapher, live-event engraver, and educator based in
                Draper, Utah. She letters weddings, luxury retail activations, envelopes, and
                custom commissions, has taught workshops for Michaels and Sakura of America,
                authored a brush lettering book with Close To My Heart, and founded{" "}
                <a
                  href="https://www.calligraphy.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Calligraphy.org
                </a>
                .
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/inquire/"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Inquire About Your Event
                </Link>
                <a
                  href="https://www.calligraphy.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-foreground px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground/5"
                >
                  Learn at Calligraphy.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
