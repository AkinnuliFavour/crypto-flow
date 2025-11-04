export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface ArticleContent {
  title: string;
  content: string;
  description?: string;
  url: string;
  author?: string;
  publishedAt?: string;
  image?: string;
  siteName?: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
