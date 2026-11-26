import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Book an Event or Commission",
  description:
    "Inquire to book Melissa Esplin for live onsite engraving, brand activations, wedding calligraphy, or custom studio commissions.",
  alternates: {
    canonical: "/inquire/",
  },
};

const STEPS = [
  {
    step: "01",
    title: "Share Your Details",
    description:
      "Tell us your date, location, service type, and estimated guest count or piece quantity.",
  },
  {
    step: "02",
    title: "Availability & Quote",
    description:
      "Melissa's studio reviews your project and replies within 1–2 business days with a tailored proposal.",
  },
  {
    step: "03",
    title: "Reserve Your Date",
    description:
      "Once confirmed, we coordinate surfaces, ink/engraving tests, and day-of setup details.",
  },
];

const INQUIRE_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      "name": "What surfaces can Melissa Esplin engrave onsite at events?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Melissa engraves fragrance bottles, wine and champagne bottles, glassware, cosmetics packaging, leather goods, and metal accessories live onsite for luxury brand activations, corporate events, and weddings.",
      },
    },
    {
      "@type": "Question",
      "name": "Does Melissa Esplin travel outside of Utah for live engraving?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While based in Draper, Utah, Melissa travels nationwide for retail brand activations, VIP gifting events, and destination weddings.",
      },
    },
  ],
};

export default function InquirePage() {
  return (
    <div className="bg-[var(--background)] py-20">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(INQUIRE_FAQ_JSON_LD) }}
        type="application/ld+json"
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
              Booking &amp; Inquiries
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Book Melissa for Your Event or Commission
            </h1>
            <p className="text-base leading-relaxed text-foreground/75">
              Available for live onsite engraving, brand activations, and custom calligraphy
              in Utah and nationwide.
            </p>
          </div>

          <div className="my-12 grid gap-4 sm:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border/70 bg-[var(--background-secondary)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Step {item.step}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
