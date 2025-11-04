export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  source: string;
  author: string;
  publishedAt: Date;
  category:
    | "breaking"
    | "bitcoin"
    | "altcoin"
    | "defi"
    | "regulation"
    | "technology"
    | "analysis";
  tags: string[];
  readTime: number;
  url?: string; // Optional URL for API data navigation
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  imageUrl: string;
  sparklineData: number[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: Date;
  likes: number;
}

export interface PortfolioItem {
  cryptoId: string;
  symbol: string;
  name: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  activeCryptocurrencies: number;
  trendingCoins: CryptoData[];
}

export interface WatchlistItem {
  cryptoId: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  imageUrl: string;
}

export type NewsCategory =
  | "all"
  | "breaking"
  | "bitcoin"
  | "altcoin"
  | "defi"
  | "regulation"
  | "technology"
  | "analysis";

export interface SearchFilters {
  category: NewsCategory;
  searchTerm: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy: "newest" | "oldest" | "popular";
}

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
