"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/portfolio";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  featuredOnly?: boolean;
  showFilters?: boolean;
}

export function PortfolioGallery({
  items,
  featuredOnly = false,
  showFilters = true,
}: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const baseItems = featuredOnly ? items.filter((item) => item.featured) : items;
  const visibleItems =
    activeCategory === "All"
      ? baseItems
      : baseItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {showFilters ? (
        <div className="mb-10 flex flex-wrap gap-2">
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-white/70 text-foreground/75 hover:border-foreground/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <button
            key={item.id + item.src}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white text-left shadow-sm transition-all duration-300 hover:border-foreground/40 hover:shadow-md"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--background-secondary)]">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="space-y-1 p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                {item.category}
              </p>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="max-h-[72vh] overflow-hidden bg-black/95">
              <img
                src={selected.src}
                alt={selected.alt}
                className="mx-auto max-h-[72vh] w-auto object-contain"
              />
            </div>
            <div className="space-y-1 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {selected.category}
              </p>
              <h3 className="text-2xl font-semibold text-foreground">{selected.title}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
