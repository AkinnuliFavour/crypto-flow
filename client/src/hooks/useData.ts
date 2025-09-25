import { useQuery } from "@tanstack/react-query";
import type {
  NewsArticle,
  CryptoData,
  MarketStats,
  NewsCategory,
} from "../types";
import {
  mockNewsArticles,
  mockCryptoData,
  mockMarketStats,
} from "../data/mockData";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useNews = (category?: NewsCategory, searchTerm?: string) => {
  return useQuery({
    queryKey: ["news", category, searchTerm],
    queryFn: async (): Promise<NewsArticle[]> => {
      await delay(500); // Simulate API delay

      let filteredNews = mockNewsArticles;

      if (category && category !== "all") {
        filteredNews = filteredNews.filter(
          (news) => news.category === category
        );
      }

      if (searchTerm?.trim()) {
        const term = searchTerm.toLowerCase();
        filteredNews = filteredNews.filter(
          (news) =>
            news.title.toLowerCase().includes(term) ||
            news.excerpt.toLowerCase().includes(term) ||
            news.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      }

      return filteredNews;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useNewsArticle = (id: string) => {
  return useQuery({
    queryKey: ["news-article", id],
    queryFn: async (): Promise<NewsArticle | null> => {
      await delay(300); // Simulate API delay
      return mockNewsArticles.find((news) => news.id === id) || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ["crypto-prices"],
    queryFn: async (): Promise<CryptoData[]> => {
      await delay(800); // Simulate API delay
      return mockCryptoData;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 1000 * 30, // 30 seconds
  });
};

export const useMarketStats = () => {
  return useQuery({
    queryKey: ["market-stats"],
    queryFn: async (): Promise<MarketStats> => {
      await delay(600); // Simulate API delay
      return mockMarketStats;
    },
    refetchInterval: 60000, // Refetch every minute
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useTrendingTopics = () => {
  return useQuery({
    queryKey: ["trending-topics"],
    queryFn: async (): Promise<
      { tag: string; count: number; change: number }[]
    > => {
      await delay(400); // Simulate API delay

      // Mock trending topics based on news articles
      const tagCounts: Record<string, number> = {};
      mockNewsArticles.forEach((news) => {
        news.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      return Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([tag, count]) => ({
          tag,
          count,
          change: Math.floor(Math.random() * 200) - 100, // Random change between -100 and +100
        }));
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
