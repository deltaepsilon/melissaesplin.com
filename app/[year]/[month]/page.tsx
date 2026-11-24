import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  formatMonthYear,
  getAdjacentMonths,
  getAllMonthKeys,
  getPostsByMonth,
} from "@/lib/blog";

interface PageProps {
  params: Promise<{ year: string; month: string }>;
}

export function generateStaticParams() {
  return getAllMonthKeys();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month } = await params;
  const label = formatMonthYear(year, month);
  return {
    title: `${label} — Blog Archive`,
    description: `Archived blog posts from ${label} on MelissaEsplin.com.`,
  };
}

export default async function MonthArchivePage({ params }: PageProps) {
  const { year, month } = await params;
  const posts = getPostsByMonth(year, month);
  if (posts.length === 0) {
    notFound();
  }

  const label = formatMonthYear(year, month);
  const { newer, older } = getAdjacentMonths(year, month);

  return (
    <div className="bg-[var(--background)] py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 space-y-3 border-b border-border/70 pb-8">
          <Link
            href="/blog/"
            className="text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground hover:text-foreground"
          >
            &larr; Back to Blog Archive
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">{label}</h1>
          <p className="text-sm text-muted-foreground">
            {posts.length} archived {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        <div className="space-y-14">
          {posts.map((post) => (
            <article
              key={post.href}
              className="border-b border-border/60 pb-12 last:border-b-0"
            >
              <Link href={post.href} className="group block space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {post.dateLabel}
                </p>
                <h2 className="text-3xl font-semibold text-foreground group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h2>
              </Link>
              <div
                className="legacy-post prose prose-neutral mt-6 max-w-none text-foreground/85"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </article>
          ))}
        </div>

        <nav
          aria-label="Month navigation"
          className="mt-14 flex items-center justify-between border-t border-border/70 pt-8 text-sm"
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
      </div>
    </div>
  );
}
