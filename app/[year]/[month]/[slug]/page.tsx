import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatMonthYear,
  getAdjacentMonths,
  getAllPosts,
  getPost,
} from "@/lib/blog";

interface PageProps {
  params: Promise<{ year: string; month: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({
    year: p.year,
    month: p.month,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const post = getPost(year, month, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — archived article by Melissa Esplin.`,
    alternates: {
      canonical: `/${year}/${month}/${slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { year, month, slug } = await params;
  const post = getPost(year, month, slug);
  if (!post) {
    notFound();
  }

  const monthLabel = formatMonthYear(year, month);
  const { newer, older } = getAdjacentMonths(year, month);

  return (
    <div className="bg-[var(--background)] py-16">
      <article className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 space-y-4 border-b border-border/70 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Link href="/blog/" className="hover:text-foreground">
              Blog Archive
            </Link>
            <span>/</span>
            <Link href={`/${year}/${month}/`} className="hover:text-foreground">
              {monthLabel}
            </Link>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-sm font-medium text-muted-foreground">
              {post.dateLabel}
            </span>
            {post.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-[var(--background-secondary)] px-3 py-0.5 text-xs font-medium text-foreground/75"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div
          className="legacy-post prose prose-neutral prose-lg max-w-none text-foreground/85"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Quiet studio CTA at bottom of archived posts */}
        <div className="mt-16 rounded-2xl border border-border/70 bg-[var(--background-secondary)] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Melissa Esplin Studio
          </p>
          <p className="mt-2 text-base leading-relaxed text-foreground/80">
            Looking for live onsite engraving, calligraphy commissions, or online classes?
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/inquire/"
              className="rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book an Event
            </Link>
            <Link
              href="/blog/"
              className="rounded-md border border-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-foreground/5"
            >
              Explore Blog Archive
            </Link>
          </div>
        </div>

        <nav
          aria-label="Archive navigation"
          className="mt-12 flex items-center justify-between border-t border-border/70 pt-8 text-sm"
        >
          {older ? (
            <Link
              href={`/${older.year}/${older.month}/`}
              className="inline-flex items-center gap-1.5 font-medium text-foreground underline underline-offset-4"
            >
              <ChevronLeft className="h-4 w-4" />
              {formatMonthYear(older.year, older.month)}
            </Link>
          ) : (
            <span />
          )}

          <Link
            href={`/${year}/${month}/`}
            className="font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {monthLabel}
          </Link>

          {newer ? (
            <Link
              href={`/${newer.year}/${newer.month}/`}
              className="inline-flex items-center gap-1.5 font-medium text-foreground underline underline-offset-4"
            >
              {formatMonthYear(newer.year, newer.month)}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </div>
  );
}
