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
import { useCoinPrices, useMarketOverview, useTrendingCoins } from "../hooks";

export const Dashboard: React.FC = () => {
  // CoinGecko API hooks
  const {
    data: coinPrices,
    isLoading: pricesLoading,
    error: pricesError,
  } = useCoinPrices({
    coinIds: ["bitcoin", "ethereum", "binancecoin", "solana"],
    vsCurrency: "usd",
    refetchInterval: 30000, // Update every 30 seconds
  });

  const {
    data: marketOverview,
    isLoading: marketLoading,
    error: marketError,
  } = useMarketOverview({
    perPage: 100,
    page: 1,
    sparkline: true,
  });

  const {
    data: trendingCoins,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrendingCoins();

  console.log(coinPrices);

  // Transform CoinGecko data to match component expectations
  const topCryptos = coinPrices
    ? Object.values(coinPrices)
        .slice(0, 4)
        .map((coin) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h || 0,
          change7d: 0, // CoinGecko simple price doesn't include 7d change
          marketCap: coin.market_cap,
          volume24h: coin.total_volume,
          imageUrl: coin.image,
          sparklineData: [], // Will be populated from chart data if available
        }))
    : mockCryptoData.slice(0, 4);

  // Transform market overview data
  const marketStats = marketOverview
    ? {
        totalMarketCap: marketOverview.reduce(
          (sum, coin) => sum + coin.market_cap,
          0
        ),
        totalVolume24h: marketOverview.reduce(
          (sum, coin) => sum + coin.total_volume,
          0
        ),
        btcDominance:
          marketOverview.length > 0
            ? ((marketOverview.find((coin) => coin.symbol === "btc")
                ?.market_cap || 0) /
                marketOverview.reduce(
                  (sum, coin) => sum + coin.market_cap,
                  0
                )) *
              100
            : 0,
        activeCryptocurrencies: marketOverview.length,
        trendingCoins:
          trendingCoins?.coins.slice(0, 5).map(({ item }) => ({
            id: item.id,
            symbol: item.symbol.toUpperCase(),
            name: item.name,
            price: 0, // Trending API doesn't provide price
            change24h: 0,
            change7d: 0,
            marketCap: 0,
            volume24h: 0,
            imageUrl: item.large,
            sparklineData: [],
          })) || [],
      }
    : mockMarketStats;
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
          {pricesLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-6 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : pricesError ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load cryptocurrency prices: {pricesError.message}</p>
            </div>
          ) : (
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
                        <h3 className="font-semibold text-foreground">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-muted-foreground uppercase">
                          {crypto.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        ${crypto.price.toLocaleString()}
                      </div>
                      <div
                        className={`text-sm ${
                          crypto.change24h >= 0
                            ? "text-[hsl(160,84%,39%)]"
                            : "text-destructive"
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
          )}
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
                  className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
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
                        <h4 className="font-medium text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.amount} {item.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">
                        ${item.totalValue.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          item.gainLoss >= 0
                            ? "text-[hsl(160,84%,39%)]"
                            : "text-destructive"
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
          {marketLoading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ) : marketError ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load market overview: {marketError.message}</p>
            </div>
          ) : (
            <MarketOverview stats={marketStats} />
          )}
        </section>

        {/* Trending Coins */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Trending Coins</h2>
          {trendingLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : trendingError ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load trending coins: {trendingError.message}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingCoins?.coins.slice(0, 6).map(({ item }) => (
                <div
                  key={item.id}
                  className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.large}
                      alt={item.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase">
                        {item.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Rank #{item.market_cap_rank}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      Score: {item.score.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
