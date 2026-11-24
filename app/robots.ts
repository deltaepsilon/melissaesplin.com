import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["OAI-SearchBot", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "*"],
      allow: "/",
    },
    sitemap: "https://www.melissaesplin.com/sitemap.xml",
  };
}
