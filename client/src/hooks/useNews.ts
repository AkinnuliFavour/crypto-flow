import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { newsApi } from "../data/newsApi";
import type { NewsApiResponse, ArticleContent } from "../types/news.types";

// Hook for fetching crypto news
export const useCryptoNews = (
  page: number = 1,
  pageSize: number = 20
): UseQueryResult<NewsApiResponse, Error> => {
  return useQuery({
    queryKey: ["cryptoNews", page, pageSize],
    queryFn: () => newsApi.getCryptoNews(page, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

// Hook for searching news
export const useSearchNews = (
  query: string,
  page: number = 1,
  pageSize: number = 20,
  enabled: boolean = true
): UseQueryResult<NewsApiResponse, Error> => {
  return useQuery({
    queryKey: ["searchNews", query, page, pageSize],
    queryFn: () => newsApi.searchNews(query, page, pageSize),
    enabled: enabled && query.length > 0, // Only fetch when query exists and enabled
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

// Hook for fetching individual article details
export const useArticleDetails = (
  articleUrl: string | null
): UseQueryResult<ArticleContent, Error> => {
  return useQuery({
    queryKey: ["articleDetails", articleUrl],
    queryFn: () => newsApi.getArticleDetails(articleUrl!),
    enabled: !!articleUrl, // Only fetch when URL is provided
    staleTime: 30 * 60 * 1000, // 30 minutes (articles don't change often)
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });
};
