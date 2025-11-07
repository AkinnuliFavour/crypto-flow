import React, { useState, useMemo } from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/SEO";
import {
  NewsCard,
  CategoryTabs,
  Pagination,
  FilterChip,
} from "../components/ui";
import { NewsSkeleton } from "../components/ui/Skeletons";
import { SearchBar } from "../components/layout";
import type { NewsCategory } from "../types";
import { useCryptoNews, useSearchNews } from "@/hooks/useNews";

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [isSearching, setIsSearching] = useState(false);

  const itemsPerPage = 12;

  // Use search API when there's a search term, otherwise use crypto news API
  const {
    data: newsData,
    isLoading,
    isError,
    error,
  } = useCryptoNews(currentPage, itemsPerPage);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchNews(searchTerm, currentPage, itemsPerPage, isSearching);

  // Determine which data to use
  const data = isSearching && searchData ? searchData : newsData;
  const loading = isSearching ? isSearchLoading : isLoading;
  const hasError = isSearching ? isSearchError : isError;
  const currentError = isSearching ? searchError : error;

  // Transform API data to match component expectations
  const transformedArticles = useMemo(() => {
    if (!data?.articles) return [];

    return data.articles.map((article, index) => ({
      id: article.url || `article-${index}`,
      title: article.title,
      excerpt: article.description || "",
      content: article.content || "Content not available",
      imageUrl: article.urlToImage || "/placeholder-news.jpg",
      source: article.source.name,
      author: article.author || "Unknown Author",
      publishedAt: new Date(article.publishedAt),
      category: "bitcoin" as const, // Default category since API doesn't provide this
      tags: [], // API doesn't provide tags
      readTime: Math.max(1, Math.floor((article.content?.length || 0) / 200)), // Estimate read time
      url: article.url, // Add URL for proper linking
    }));
  }, [data]);

  // Sort articles
  const sortedArticles = useMemo(() => {
    const articles = [...transformedArticles];
    articles.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        case "oldest":
          return a.publishedAt.getTime() - b.publishedAt.getTime();
        case "popular":
          return b.readTime - a.readTime;
        default:
          return 0;
      }
    });
    return articles;
  }, [transformedArticles, sortBy]);

  const totalResults = data?.totalResults || 0;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
    setIsSearching(query.trim().length > 0);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
    setCurrentPage(1);
    setIsSearching(false);
  };

  // Simplified categories since API doesn't provide category filtering
  const categories = [
    { value: "all" as NewsCategory, label: "All News", count: totalResults },
  ];

  if (loading) {
    return (
      <Layout>
        <SEO
          title="Cryptocurrency News - CryptoFlow | Latest Crypto News & Updates"
          description="Stay updated with the latest cryptocurrency news, market analysis, and insights. Real-time news from top crypto sources."
          keywords={[
            "cryptocurrency news",
            "crypto news",
            "bitcoin news",
            "ethereum news",
            "blockchain news",
            "crypto market analysis",
          ]}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Cryptocurrency News</h1>
            <p className="text-muted-foreground text-lg">
              Stay informed with the latest news, analysis, and insights from
              the crypto world.
            </p>
          </div>

          {/* Skeleton loaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(itemsPerPage)].map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <SEO
          title="Cryptocurrency News - CryptoFlow | Latest Crypto News & Updates"
          description="Stay updated with the latest cryptocurrency news, market analysis, and insights. Real-time news from top crypto sources."
          keywords={[
            "cryptocurrency news",
            "crypto news",
            "bitcoin news",
            "ethereum news",
            "blockchain news",
            "crypto market analysis",
          ]}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading News</h1>
          <p className="text-muted-foreground mb-6">
            {currentError?.message || "Failed to load news articles"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title="Cryptocurrency News - CryptoFlow | Latest Crypto News & Updates"
        description="Stay updated with the latest cryptocurrency news, market analysis, and insights. Real-time news from top crypto sources."
        keywords={[
          "cryptocurrency news",
          "crypto news",
          "bitcoin news",
          "ethereum news",
          "blockchain news",
          "crypto market analysis",
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Cryptocurrency News</h1>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest news, analysis, and insights from the
            crypto world.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search news, topics, or keywords..."
          />

          {/* Active Filters */}
          {(searchTerm || sortBy !== "newest") && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchTerm && (
                <FilterChip
                  label={`Search: "${searchTerm}"`}
                  value={searchTerm}
                  onRemove={() => setSearchTerm("")}
                />
              )}
              {sortBy !== "newest" && (
                <FilterChip
                  label={`Sort: ${sortBy}`}
                  value={sortBy}
                  onRemove={() => setSortBy("newest")}
                />
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { value: "newest", label: "Newest" },
                { value: "oldest", label: "Oldest" },
                { value: "popular", label: "Popular" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as typeof sortBy)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    sortBy === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs - Simplified since API doesn't support categories */}
        <CategoryTabs
          activeCategory="all"
          onCategoryChange={() => {}}
          categories={categories}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedArticles.length} of {totalResults} articles
            {isSearching && searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* News Grid */}
        {sortedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {sortedArticles.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {isSearching
                ? `No news articles found for "${searchTerm}".`
                : "No news articles available."}
            </p>
            {isSearching && (
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Clear search and try again
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
