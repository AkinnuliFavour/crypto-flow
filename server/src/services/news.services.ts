import {
  ArticleContent,
  JinaReaderResponse,
  NewsApiResponse,
  NewsArticle,
} from "../types/news.types";
import { config } from "../config/env";

const NEWS_API_BASE = "https://newsapi.org/v2";
const JINA_READER_BASE = "https://r.jina.ai";

export class NewsService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCryptoNews(
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> {
    try {
      const url = new URL(`${NEWS_API_BASE}/everything`);
      url.searchParams.append("q", "cryptocurrency OR bitcoin OR ethereum");
      url.searchParams.append("sortBy", "publishedAt");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("apiKey", this.apiKey);
      url.searchParams.append("language", "en");

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(
          errorData.message || "Failed to fetch news from NewsAPI"
        );
      }

      const data = (await response.json()) as NewsApiResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`News API Error: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching news");
    }
  }

  async searchNews(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> {
    try {
      const url = new URL(`${NEWS_API_BASE}/everything`);
      url.searchParams.append("q", query);
      url.searchParams.append("sortBy", "publishedAt");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("apiKey", this.apiKey);
      url.searchParams.append("language", "en");

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to search news");
      }

      const data = (await response.json()) as NewsApiResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`News API Error: ${error.message}`);
      }
      throw new Error("An unknown error occurred while searching news");
    }
  }

  // Since NewsAPI doesn't provide individual article endpoints,
  // this would need to use the article URL to fetch from original source
  // or return cached data
  async getArticleDetails(articleUrl: string): Promise<ArticleContent | null> {
    try {
      // Jina AI Reader - Simple HTTP request
      const response = await fetch(`${JINA_READER_BASE}/${articleUrl}`, {
        headers: {
          Accept: "application/json",
          "X-Return-Format": "markdown", // or 'text', 'html', 'screenshot'
          // Optional: Add API key if you have one for higher rate limits
          Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Jina Reader failed: ${response.statusText}`);
      }

      const data = (await response.json()) as JinaReaderResponse;

      // Transform Jina response to our ArticleContent format
      return {
        title: data.data.title || "Untitled",
        content: data.data.content || "Content could not be extracted",
        description: data.data.description,
        url: articleUrl,
        author: data.data.author,
        publishedAt: data.data.publishedTime,
        image: data.data.images?.[0],
        siteName: data.data.siteName,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to extract article: ${error.message}`);
      }
      throw new Error("An unknown error occurred while extracting article");
    }
  }
}

export const newsService = new NewsService(config.NEWS_API_KEY);
