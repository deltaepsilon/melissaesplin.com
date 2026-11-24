import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  slug: string;
  year: string;
  month: string;
  href: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  topics: string[];
  thumbnail: string | null;
  html: string;
}

export type BlogIndexItem = Omit<BlogPost, "html">;

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (!cachedPosts) {
    const filePath = path.join(process.cwd(), "content", "blog-posts.json");
    cachedPosts = JSON.parse(fs.readFileSync(filePath, "utf8")) as BlogPost[];
  }
  return cachedPosts;
}

export function getPost(year: string, month: string, slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.year === year && p.month === month && p.slug === slug);
}

export function getPostsByMonth(year: string, month: string): BlogPost[] {
  return getAllPosts().filter((p) => p.year === year && p.month === month);
}

export function getAllMonthKeys(): { year: string; month: string }[] {
  const seen = new Set<string>();
  const months: { year: string; month: string }[] = [];
  for (const p of getAllPosts()) {
    const key = `${p.year}/${p.month}`;
    if (!seen.has(key)) {
      seen.add(key);
      months.push({ year: p.year, month: p.month });
    }
  }
  return months;
}

export function getAdjacentMonths(year: string, month: string) {
  const months = getAllMonthKeys(); // newest -> oldest
  const idx = months.findIndex((m) => m.year === year && m.month === month);
  return {
    newer: idx > 0 ? months[idx - 1] : null,
    older: idx >= 0 && idx < months.length - 1 ? months[idx + 1] : null,
  };
}

export function formatMonthYear(year: string, month: string): string {
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
