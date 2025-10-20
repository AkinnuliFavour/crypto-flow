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
import { mockNewsArticles, mockMarketStats } from "../data/mockData";
import { useTopCryptos } from "../hooks/useCoinGecko";

export const Home: React.FC = () => {
  const featuredNews = mockNewsArticles.slice(0, 4);
  const recentNews = mockNewsArticles.slice(0, 6);

  const {
    data: topCryptos = [],
    isLoading: cryptosLoading,
    error: cryptosError,
  } = useTopCryptos({ limit: 10 });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Market Cap"
              value={mockMarketStats.totalMarketCap}
              icon={DollarSign}
            />
            <StatsCard
              title="24h Volume"
              value={mockMarketStats.totalVolume24h}
              icon={BarChart3}
            />
            <StatsCard
              title="BTC Dominance"
              value={`${mockMarketStats.btcDominance}%`}
              icon={TrendingUp}
            />
            <StatsCard
              title="Active Cryptos"
              value={mockMarketStats.activeCryptocurrencies}
              icon={Users}
            />
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
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
          <div className="space-y-4">
            {recentNews.map((news) => (
              <NewsCard key={news.id} news={news} variant="compact" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
