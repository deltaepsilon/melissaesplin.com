import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE_URL = "https://www.melissaesplin.com";
const UPDATED = new Date("2026-11-24T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/portfolio/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/inquire/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: UPDATED, changeFrequency: "monthly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/${post.year}/${post.month}/${post.slug}/`,
    lastModified: new Date(`${post.year}-${post.month}-01T00:00:00.000Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
