import React from "react";
import { Layout } from "../components/layout";
import {
  PriceChart,
  StatsCard,
  MarketOverview,
  Watchlist,
  NewsCard,
} from "../components/ui";
import {
  // TrendingUp,
  // DollarSign,
  PieChart,
  // BarChart3,
  Wallet,
  Target,
} from "lucide-react";
import {
  mockCryptoData,
  mockMarketStats,
  mockPortfolio,
  mockWatchlist,
  mockNewsArticles,
} from "../data/mockData";

export const Dashboard: React.FC = () => {
  const topCryptos = mockCryptoData.slice(0, 4);
  const portfolioValue = mockPortfolio.reduce(
    (total, item) => total + item.totalValue,
    0
  );
  const portfolioChange = mockPortfolio.reduce((total, item) => {
    const change = (item.gainLoss / (item.totalValue - item.gainLoss)) * 100;
    return total + change * (item.totalValue / portfolioValue);
  }, 0);

  const watchlistNews = mockNewsArticles
    .filter((news) =>
      mockWatchlist.some((watchItem) =>
        news.tags.some(
          (tag) =>
            tag.toLowerCase().includes(watchItem.symbol.toLowerCase()) ||
            tag.toLowerCase().includes(watchItem.name.toLowerCase())
        )
      )
    )
    .slice(0, 6);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Track your portfolio, monitor markets, and stay updated with
            personalized news.
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Portfolio Value"
            value={portfolioValue}
            change={{
              value: portfolioChange,
              label: "24h",
            }}
            icon={Wallet}
          />
          <StatsCard
            title="Total Assets"
            value={mockPortfolio.length}
            icon={PieChart}
          />
          <StatsCard
            title="Watchlist Items"
            value={mockWatchlist.length}
            icon={Target}
          />
        </div>

        {/* Price Charts */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Price Charts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topCryptos.map((crypto) => (
              <div key={crypto.id} className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={crypto.imageUrl}
                      alt={crypto.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{crypto.name}</h3>
                      <p className="text-sm text-muted-foreground uppercase">
                        {crypto.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ${crypto.price.toLocaleString()}
                    </div>
                    <div
                      className={`text-sm ${
                        crypto.change24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
                <PriceChart crypto={crypto} height={200} showGrid={true} />
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio and Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
            <div className="space-y-4">
              {mockPortfolio.map((item) => (
                <div
                  key={item.cryptoId}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={
                          mockCryptoData.find((c) => c.id === item.cryptoId)
                            ?.imageUrl
                        }
                        alt={item.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.amount} {item.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${item.totalValue.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          item.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.gainLoss >= 0 ? "+" : ""}$
                        {item.gainLoss.toFixed(2)}(
                        {item.gainLossPercent >= 0 ? "+" : ""}
                        {item.gainLossPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watchlist */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
            <Watchlist items={mockWatchlist} />
          </div>
        </div>

        {/* Market Overview */}
        <section className="mb-8">
          <MarketOverview stats={mockMarketStats} />
        </section>

        {/* Personalized News Feed */}
        <section>
          <h2 className="text-2xl font-bold mb-6">News from Your Watchlist</h2>
          {watchlistNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlistNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No news found for your watchlist items. Add more
                cryptocurrencies to see personalized news.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};
