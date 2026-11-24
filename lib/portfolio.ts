import portfolioData from "@/content/portfolio.json";

export interface PortfolioItem {
  id: string;
  src: string;
  title: string;
  category: string;
  featured: boolean;
  alt: string;
}

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Engraving & Onsite",
  "Calligraphy & Stationery",
  "Weddings & Events",
  "Watercolor & Art",
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = portfolioData;
