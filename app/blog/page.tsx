import type { Metadata } from "next";
import { BlogPortal } from "@/components/blog-portal";

export const metadata: Metadata = {
  title: "Blog Archive",
  description:
    "Explore 1,467 archived articles, free printables, calligraphy tutorials, and watercolor posts from Melissa Esplin (2007–2021).",
};

export default function BlogPage() {
  return (
    <div className="bg-[var(--background)]">
      <section className="border-b border-border/60 bg-[var(--background-secondary)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/75">
              Blog Archive &middot; 2007–2021
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Articles, Printables &amp; Tutorials
            </h1>
            <p className="text-base leading-relaxed text-foreground/75">
              Browse 15 years of calligraphy tutorials, free printables, watercolor studies,
              and DIY projects by topic, year, or keyword.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <BlogPortal />
        </div>
      </section>
    </div>
  );
}
