import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { Layout } from "../components/layout";
import { NewsCard, Button } from "../components/ui";
import { useArticleDetails, useCryptoNews } from "../hooks/useNews";

export const Article: React.FC = () => {
  const { "*": urlParam } = useParams<{ "*": string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  // Decode the URL parameter (it should be a base64 encoded URL)
  const articleUrl = urlParam ? decodeURIComponent(atob(urlParam)) : null;

  const {
    data: articleData,
    isLoading,
    isError,
    error,
  } = useArticleDetails(articleUrl);

  // Get related articles from crypto news API
  const { data: relatedNewsData } = useCryptoNews(1, 6);

  if (!urlParam || !articleUrl) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Article URL</h1>
          <p className="text-muted-foreground mb-6">
            The article URL parameter is missing or invalid.
          </p>
          <Button asChild>
            <Link to="/news">Back to News</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-muted rounded mb-8 w-1/4"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !articleData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error?.message ||
              "The article you're looking for doesn't exist or couldn't be loaded."}
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/news">Back to News</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Transform related articles from NewsAPI format to NewsCard format
  const relatedArticles =
    relatedNewsData?.articles?.slice(0, 3).map((article) => ({
      id: article.url,
      title: article.title,
      excerpt: article.description || "",
      content: article.content || "Content not available",
      imageUrl: article.urlToImage || "/placeholder-news.jpg",
      source: article.source.name,
      author: article.author || "Unknown Author",
      publishedAt: new Date(article.publishedAt),
      category: "bitcoin" as const,
      tags: [],
      readTime: Math.max(1, Math.floor((article.content?.length || 0) / 200)),
    })) || [];

  // Mock comments
  const mockComments = [
    {
      id: "1",
      author: "CryptoEnthusiast",
      content:
        "Great article! This really helps explain the current market dynamics.",
      publishedAt: new Date("2024-01-15T14:30:00Z"),
      likes: 12,
    },
    {
      id: "2",
      author: "BlockchainDev",
      content:
        "I've been following this trend for months. The institutional adoption is definitely accelerating.",
      publishedAt: new Date("2024-01-15T15:45:00Z"),
      likes: 8,
    },
    {
      id: "3",
      author: "MarketWatcher",
      content:
        "What are your thoughts on how this will affect retail investors?",
      publishedAt: new Date("2024-01-15T16:20:00Z"),
      likes: 5,
    },
  ];

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown date";
    try {
      const dateObj = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(dateObj);
    } catch {
      return "Invalid date";
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: articleData.title,
        text: articleData.description || articleData.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast notification here
    }
  };

  return (
    <Layout>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white bg-blue-500">
              {articleData.siteName || "News Article"}
            </span>
            <span className="text-muted-foreground">
              {articleData.siteName ? `${articleData.siteName} • Crypto News` : "Crypto News"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {articleData.title}
          </h1>

          {articleData.description && (
            <p className="text-xl text-muted-foreground mb-6">
              {articleData.description}
            </p>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              {articleData.author && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{articleData.author}</span>
                </div>
              )}
              {articleData.siteName && (
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{articleData.siteName}</span>
                </div>
              )}
              {articleData.publishedAt && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(articleData.publishedAt)}</span>
                </div>
              )}
              <span>
                {Math.max(
                  1,
                  Math.floor((articleData.content?.length || 0) / 200)
                )}{" "}
                min read
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                />
                {likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
            </div>
          </div>
        </header>

        {/* Article Image */}
        {articleData.image && (
          <div className="mb-8">
            <img
              src={articleData.image}
              alt={articleData.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: articleData.content
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
            }}
          />
        </div>

        {/* Social Sharing */}
        <div className="flex items-center justify-center space-x-4 py-8 border-y mb-12">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Article
          </Button>
          <Button variant="outline" asChild>
            <a href={articleData.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Original
            </a>
          </Button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard key={relatedArticle.id} news={relatedArticle} />
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Comments ({mockComments.length})
          </h2>

          {/* Comment Form */}
          <div className="mb-8">
            <textarea
              placeholder="Share your thoughts..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button size="sm">Post Comment</Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {mockComments.map((comment) => (
              <div key={comment.id} className="border-b pb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-sm">
                        {comment.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.publishedAt.toISOString())}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {comment.content}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                      >
                        <Heart className="mr-1 h-3 w-3" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
};
