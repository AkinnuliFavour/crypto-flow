import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
} from "lucide-react";
import { Layout } from "../components/layout";
import { NewsCard, PriceTicker, StatsCard, Button } from "../components/ui";
import { mockNewsArticles } from "../data/mockData";
import { useTopCryptos, useGlobalMarketStats } from "../hooks/useCoinGecko";
import { useCryptoNews } from "../hooks/useNews";
import type { NewsArticle } from "../types";
import type { NewsArticle as ApiNewsArticle } from "../types/news.types";

export const Home: React.FC = () => {
  const featuredNews = mockNewsArticles.slice(0, 4);
  const recentNews = mockNewsArticles.slice(0, 6);

  const {
    data: topCryptos = [],
    isLoading: cryptosLoading,
    error: cryptosError,
  } = useTopCryptos({ limit: 10 });

  const {
    data: marketStats,
    isLoading: marketStatsLoading,
    error: marketStatsError,
  } = useGlobalMarketStats();

  // Fetch live crypto news
  const {
    data: cryptoNewsData,
    isLoading: newsLoading,
    error: newsError,
  } = useCryptoNews(1, 8); // Get first 8 articles for featured and recent

  // Transform API news data to match NewsArticle interface
  const transformNewsArticle = (apiArticle: ApiNewsArticle): NewsArticle => ({
    id: apiArticle.url, // Use URL as unique ID
    title: apiArticle.title,
    excerpt: apiArticle.description || apiArticle.title,
    content: apiArticle.content || apiArticle.description || "",
    imageUrl: apiArticle.urlToImage || "/placeholder-news.jpg",
    source:
      typeof apiArticle.source === "object"
        ? apiArticle.source.name
        : apiArticle.source,
    author: apiArticle.author || "Unknown",
    publishedAt: new Date(apiArticle.publishedAt),
    category: "bitcoin", // Default category, could be enhanced with AI classification
    tags: ["crypto", "news"],
    readTime: Math.max(
      1,
      Math.ceil((apiArticle.content?.length || 1000) / 200)
    ), // Rough estimate
    url: apiArticle.url, // Add the URL property for NewsCard navigation
  });

  // Use live data if available, fallback to mock data
  const liveFeaturedNews =
    cryptoNewsData?.articles?.slice(0, 4).map(transformNewsArticle) || [];
  const liveRecentNews =
    cryptoNewsData?.articles?.slice(0, 6).map(transformNewsArticle) || [];

  // Use live data if available, otherwise fallback to mock data
  const displayFeaturedNews =
    liveFeaturedNews.length > 0 ? liveFeaturedNews : featuredNews;
  const displayRecentNews =
    liveRecentNews.length > 0 ? liveRecentNews : recentNews;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Stay Ahead in Crypto
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest cryptocurrency news, market analysis, and insights
              from industry experts. Make informed decisions with real-time data
              and comprehensive coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/news">
                  Explore News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Price Ticker */}
      <section className="py-8 border-y bg-muted/20">
        <div className="container mx-auto px-4">
          {cryptosLoading ? (
            <div className="flex items-center justify-center h-20">
              <div className="text-muted-foreground">
                Loading cryptocurrency data...
              </div>
            </div>
          ) : cryptosError ? (
            <div className="flex items-center justify-center h-20">
              <div className="text-destructive">
                Failed to load cryptocurrency data
              </div>
            </div>
          ) : topCryptos.length > 0 ? (
            <PriceTicker cryptos={topCryptos} />
          ) : (
            <div className="flex items-center justify-center h-20">
              <div className="text-muted-foreground">
                No cryptocurrency data available
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Market Overview
          </h2>
          {marketStatsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">
                Loading market data...
              </div>
            </div>
          ) : marketStatsError ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-destructive">Failed to load market data</div>
            </div>
          ) : marketStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Market Cap"
                value={marketStats.totalMarketCap}
                icon={DollarSign}
              />
              <StatsCard
                title="24h Volume"
                value={marketStats.totalVolume24h}
                icon={BarChart3}
              />
              <StatsCard
                title="BTC Dominance"
                value={`${marketStats.btcDominance.toFixed(1)}%`}
                icon={TrendingUp}
              />
              <StatsCard
                title="Active Cryptos"
                value={marketStats.activeCryptocurrencies}
                icon={Users}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">
                No market data available
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured News */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured News</h2>
            <Button variant="outline" asChild>
              <Link to="/news">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {newsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">Loading news...</div>
            </div>
          ) : newsError ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-destructive">Failed to load news</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayFeaturedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent News Preview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button variant="outline" asChild>
              <Link to="/news">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {newsLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">
                Loading latest news...
              </div>
            </div>
          ) : newsError ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-destructive">Failed to load latest news</div>
            </div>
          ) : (
            <div className="space-y-4">
              {displayRecentNews.map((news) => (
                <NewsCard key={news.id} news={news} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
