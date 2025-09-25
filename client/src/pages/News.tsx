import React, { useState, useMemo } from "react";
import { Layout } from "../components/layout";
import {
  NewsCard,
  CategoryTabs,
  Pagination,
  FilterChip,
} from "../components/ui";
import { SearchBar } from "../components/layout";
import type { NewsCategory } from "../types";
import { mockNewsArticles } from "../data/mockData";

export const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );

  const itemsPerPage = 12;

  // Filter and search news
  const filteredNews = useMemo(() => {
    let filtered = mockNewsArticles;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((news) => news.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(term) ||
          news.excerpt.toLowerCase().includes(term) ||
          news.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "popular":
          // Mock popularity based on read time (longer = more popular)
          return b.readTime - a.readTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const categoryCounts = mockNewsArticles.reduce((acc, news) => {
    acc[news.category] = (acc[news.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    {
      value: "all" as NewsCategory,
      label: "All News",
      count: mockNewsArticles.length,
    },
    {
      value: "breaking" as NewsCategory,
      label: "Breaking",
      count: categoryCounts.breaking || 0,
    },
    {
      value: "bitcoin" as NewsCategory,
      label: "Bitcoin",
      count: categoryCounts.bitcoin || 0,
    },
    {
      value: "altcoin" as NewsCategory,
      label: "Altcoins",
      count: categoryCounts.altcoin || 0,
    },
    {
      value: "defi" as NewsCategory,
      label: "DeFi & NFTs",
      count: categoryCounts.defi || 0,
    },
    {
      value: "regulation" as NewsCategory,
      label: "Regulation",
      count: categoryCounts.regulation || 0,
    },
    {
      value: "technology" as NewsCategory,
      label: "Technology",
      count: categoryCounts.technology || 0,
    },
    {
      value: "analysis" as NewsCategory,
      label: "Analysis",
      count: categoryCounts.analysis || 0,
    },
  ];

  return (
    <Layout>
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
          {(activeCategory !== "all" || searchTerm || sortBy !== "newest") && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {activeCategory !== "all" && (
                <FilterChip
                  label={`Category: ${
                    categories.find((c) => c.value === activeCategory)?.label
                  }`}
                  value={activeCategory}
                  onRemove={() => setActiveCategory("all")}
                />
              )}
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

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {paginatedNews.length} of {filteredNews.length} articles
          </p>
        </div>

        {/* News Grid */}
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedNews.map((news) => (
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
              No news articles found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};
