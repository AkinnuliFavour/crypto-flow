import { apiClient } from "../lib/axios";
import type { NewsApiResponse, ArticleContent } from "../types/news.types";

export const newsApi = {
  // Get crypto news with pagination
  getCryptoNews: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> => {
    const { data } = await apiClient.get<NewsApiResponse>("/news/crypto", {
      params: { page, pageSize },
    });
    return data;
  },

  // Search news with custom query
  searchNews: async (
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> => {
    const { data } = await apiClient.get<NewsApiResponse>("/news/search", {
      params: { q: query, page, pageSize },
    });
    return data;
  },

  // Get individual article details
  getArticleDetails: async (articleUrl: string): Promise<ArticleContent> => {
    const { data } = await apiClient.get<ArticleContent>("/news/article", {
      params: { url: articleUrl },
    });
    return data;
  },
};
