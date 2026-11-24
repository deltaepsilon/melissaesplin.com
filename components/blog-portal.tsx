"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X } from "lucide-react";
import type { BlogIndexItem } from "@/lib/blog";

const PAGE_SIZE = 36;

export function BlogPortal() {
  const [posts, setPosts] = useState<BlogIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch("/blog-index.json")
      .then((res) => res.json())
      .then((data: BlogIndexItem[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "topics", weight: 1.2 },
          { name: "excerpt", weight: 0.8 },
          { name: "dateLabel", weight: 0.5 },
        ],
        threshold: 0.32,
      }),
    [posts]
  );

  const topicCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.topics) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const yearCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      counts.set(p.year, (counts.get(p.year) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [posts]);

  const filtered = useMemo(() => {
    let list = query.trim() ? fuse.search(query.trim()).map((r) => r.item) : posts;
    if (selectedTopic !== "All") {
      list = list.filter((p) => p.topics.includes(selectedTopic));
    }
    if (selectedYear !== "All") {
      list = list.filter((p) => p.year === selectedYear);
    }
    return list;
  }, [posts, fuse, query, selectedTopic, selectedYear]);

  const shown = filtered.slice(0, visibleCount);
  const hasFilters = query.trim() !== "" || selectedTopic !== "All" || selectedYear !== "All";

  function resetFilters() {
    setQuery("");
    setSelectedTopic("All");
    setSelectedYear("All");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="space-y-10">
      {/* Search + Filters */}
      <div className="space-y-6 rounded-2xl border border-border/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search 1,467 archived articles (e.g., watercolor, printable, pointed pen, Valentine)..."
            className="w-full rounded-lg border border-border bg-[var(--background)] py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {/* Topical Discovery */}
        <div className="space-y-2.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Browse by Topic
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedTopic("All");
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedTopic === "All"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground/80 hover:border-foreground/50"
              }`}
            >
              All Topics ({posts.length})
            </button>
            {topicCounts.map(([topic, count]) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSelectedTopic(topic);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedTopic === topic
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground/80 hover:border-foreground/50"
                }`}
              >
                {topic} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Discovery */}
        <div className="space-y-2.5 border-t border-border/50 pt-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Browse by Year
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedYear("All");
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedYear === "All"
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground/75 hover:border-foreground/50"
              }`}
            >
              All Years
            </button>
            {yearCounts.map(([year, count]) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setSelectedYear(year);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedYear === year
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground/75 hover:border-foreground/50"
                }`}
              >
                {year} <span className="opacity-65">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {loading
            ? "Loading archive..."
            : `Showing ${shown.length} of ${filtered.length} articles`}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground underline underline-offset-4"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {/* Article Cards */}
      {!loading && shown.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white p-12 text-center">
          <p className="text-lg font-medium text-foreground">No matching articles found.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try clearing your search or switching topics/years.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-white p-6 transition-all duration-200 hover:border-foreground/40 hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  <span>{post.dateLabel || `${post.year}-${post.month}`}</span>
                </div>
                <h2 className="text-xl font-semibold leading-snug text-foreground group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="line-clamp-3 text-sm leading-relaxed text-foreground/70">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                {post.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[var(--background-secondary)] px-2.5 py-0.5 text-[0.68rem] font-medium text-foreground/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {shown.length < filtered.length ? (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-md border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Load More Articles ({filtered.length - shown.length} remaining)
          </button>
        </div>
      ) : null}
    </div>
  );
}
