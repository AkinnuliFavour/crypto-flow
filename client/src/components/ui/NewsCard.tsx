import React from "react";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import type { NewsArticle } from "../../types";

interface NewsCardProps {
  news: NewsArticle;
  variant?: "default" | "featured" | "compact";
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  variant = "default",
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Create article link - use URL if available (API data), otherwise use ID (mock data)
  const getArticleLink = () => {
    // Check if this is API data with a url property
    if ("url" in news && typeof news.url === "string" && news.url) {
      // For API data with URLs, encode the URL as base64
      const encodedUrl = btoa(encodeURIComponent(news.url));
      return `/article/${encodedUrl}`;
    }
    // For mock data with IDs
    return `/news/${news.id}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breaking: "bg-destructive",
      bitcoin: "bg-[hsl(45,93%,47%)]", // Gold color
      altcoin: "bg-primary",
      defi: "bg-[hsl(262,83%,58%)]", // Purple color
      regulation: "bg-[hsl(160,84%,39%)]", // Green color
      technology: "bg-primary",
      analysis: "bg-[hsl(188,95%,42%)]", // Cyan color
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 card-hover-glow">
        <Link to={getArticleLink()}>
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-3">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getCategoryColor(
                  news.category
                )}`}
              >
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                {news.source}
              </span>
            </div>
            <h3 className="text-xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
              {news.title}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {news.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{news.readTime} min read</span>
                </div>
              </div>
              <span>{formatDate(news.publishedAt)}</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
        <Link to={getArticleLink()} className="flex-1">
          <div className="flex items-start space-x-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${getCategoryColor(
                    news.category
                  )}`}
                >
                  {news.category.charAt(0).toUpperCase() +
                    news.category.slice(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {news.source}
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                {news.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {news.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.author}</span>
                <span>{formatDate(news.publishedAt)}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 card-hover-glow">
      <Link to={getArticleLink()}>
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white ${getCategoryColor(
                news.category
              )}`}
            >
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">{news.source}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors text-foreground">
            {news.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{news.readTime} min</span>
              </div>
            </div>
            <span>{formatDate(news.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
