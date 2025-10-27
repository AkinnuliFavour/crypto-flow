import React, { useState } from "react";
import { Layout } from "../components/layout";
import {
  PriceChart,
  StatsCard,
  MarketOverview,
  Watchlist,
  NewsCard,
  AddToWatchlist,
  AddToPortfolio,
  SettingsPanel,
  ImportExport,
} from "../components/ui";
import {
  PieChart,
  Wallet,
  Target,
  Settings as SettingsIcon,
  Trash2,
  Plus,
} from "lucide-react";
import {
  mockCryptoData,
  mockMarketStats,
  mockPortfolio,
  mockWatchlist,
} from "../data/mockData";
import {
  useCoinPrices,
  useMarketOverview,
  useCoinChart,
  useTopCryptos,
} from "../hooks/useCoinGecko";
import { useCryptoNews } from "../hooks/useNews";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Dashboard: React.FC = () => {
  // Personalization state using local storage
  const [portfolio, setPortfolio] = useLocalStorage(
    "crypto-portfolio",
    mockPortfolio
  );
  const [watchlist, setWatchlist] = useLocalStorage(
    "crypto-watchlist",
    mockWatchlist
  );
  const [preferences, setPreferences] = useLocalStorage("user-preferences", {
    currency: "usd",
    newsCategories: ["analysis", "market", "regulation", "technology"],
    chartDays: 7,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showAddToWatchlist, setShowAddToWatchlist] = useState(false);
  const [showAddToPortfolio, setShowAddToPortfolio] = useState(false);

  // Currency formatting helper
  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      usd: "$",
      eur: "€",
      gbp: "£",
      jpy: "¥",
      cad: "$",
      aud: "$",
    };
    return symbols[currency.toLowerCase()] || "$";
  };

  const formatCurrency = (
    value: number,
    currency: string = preferences.currency
  ) => {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
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
  } = useTopCryptos({ limit: 6 });

  // Fetch live crypto news
  const {
    data: cryptoNews,
    isLoading: newsLoading,
    error: newsError,
  } = useCryptoNews(1, 50); // Get first page with 50 articles

  // Fetch chart data for each coin
  const { data: btcChart } = useCoinChart({ coinId: "bitcoin", days: 7 });
  const { data: ethChart } = useCoinChart({ coinId: "ethereum", days: 7 });
  const { data: bnbChart } = useCoinChart({ coinId: "binancecoin", days: 7 });
  const { data: solChart } = useCoinChart({ coinId: "solana", days: 7 });

  // Extract portfolio and watchlist coin IDs
  const portfolioCoinIds = portfolio.map((item) => item.cryptoId);
  const watchlistCoinIds = watchlist.map((item) => item.cryptoId);
  const allCoinIds = [...new Set([...portfolioCoinIds, ...watchlistCoinIds])];

  // Fetch live prices for portfolio and watchlist coins
  const {
    data: portfolioWatchlistPrices,
    isLoading: portfolioWatchlistLoading,
    error: portfolioWatchlistError,
  } = useCoinPrices({
    coinIds: allCoinIds,
    vsCurrency: preferences.currency,
    refetchInterval: 30000, // Update every 30 seconds
  });

  // Transform CoinGecko data to match component expectations
  const topCryptos = coinPrices
    ? Object.values(coinPrices)
        .slice(0, 4)
        .map((coin) => {
          // Get chart data for this coin
          let chartData;
          switch (coin.id) {
            case "bitcoin":
              chartData = btcChart;
              break;
            case "ethereum":
              chartData = ethChart;
              break;
            case "binancecoin":
              chartData = bnbChart;
              break;
            case "solana":
              chartData = solChart;
              break;
            default:
              chartData = null;
          }

          // Extract prices from chart data (only price values, not timestamps)
          const sparklineData =
            chartData?.prices?.map(([, price]) => price) || [];

          return {
            id: coin.id || "",
            symbol: coin.symbol?.toUpperCase() || "",
            name: coin.name || "",
            price: coin.current_price || 0,
            change24h: coin.price_change_percentage_24h || 0,
            change7d: coin.price_change_percentage_7d_in_currency || 0,
            marketCap: coin.market_cap || 0,
            volume24h: coin.total_volume || 0,
            imageUrl: coin.image || "",
            sparklineData, // Now populated with real chart data
          };
        })
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
        trendingCoins: trendingCoins?.slice(0, 5) || [],
      }
    : mockMarketStats;

  // Transform portfolio data with live prices
  const livePortfolio = portfolio.map((item) => {
    const livePriceData = portfolioWatchlistPrices?.[item.cryptoId];
    const livePrice = livePriceData?.current_price || item.currentPrice;

    const totalValue = item.amount * livePrice;
    const gainLoss = (livePrice - item.averagePrice) * item.amount;
    const gainLossPercent =
      ((livePrice - item.averagePrice) / item.averagePrice) * 100;

    return {
      ...item,
      currentPrice: livePrice,
      totalValue,
      gainLoss,
      gainLossPercent,
    };
  });

  // Transform watchlist data with live prices
  const liveWatchlist = watchlist.map((item) => {
    const livePriceData = portfolioWatchlistPrices?.[item.cryptoId];
    const livePrice = livePriceData?.current_price || item.price;
    const change24h =
      livePriceData?.price_change_percentage_24h || item.change24h;

    return {
      ...item,
      price: livePrice,
      change24h,
    };
  });

  const portfolioValue = livePortfolio.reduce(
    (total, item) => total + item.totalValue,
    0
  );
  const portfolioChange = livePortfolio.reduce((total, item) => {
    const change = (item.gainLoss / (item.totalValue - item.gainLoss)) * 100;
    return total + change * (item.totalValue / portfolioValue);
  }, 0);

  // Transform live news data to match component expectations and filter by watchlist
  const watchlistNews =
    cryptoNews?.articles
      ?.map((article) => ({
        id: article.url, // Use URL as ID for API data
        title: article.title,
        excerpt: article.description || article.title,
        content: article.content || article.description || "",
        imageUrl: article.urlToImage || "",
        source: article.source.name,
        author: article.author || "Unknown",
        publishedAt: new Date(article.publishedAt),
        category: "analysis" as const, // Default category for API news
        tags: [], // API doesn't provide tags, could extract from title/description
        readTime: Math.max(
          1,
          Math.ceil((article.content?.length || 500) / 200)
        ), // Estimate read time
        url: article.url,
      }))
      .filter((news) =>
        watchlist.some((watchItem) => {
          const watchlistTerms = [
            watchItem.symbol.toLowerCase(),
            watchItem.name.toLowerCase(),
          ];
          const newsText = `${news.title} ${news.excerpt}`.toLowerCase();
          return watchlistTerms.some((term) => newsText.includes(term));
        })
      )
      .slice(0, 6) || [];

  // Handlers for personalization features
  const handleAddToWatchlist = (item: (typeof liveWatchlist)[0]) => {
    setWatchlist([...watchlist, item]);
  };

  const handleRemoveFromWatchlist = (cryptoId: string) => {
    if (window.confirm("Remove this item from your watchlist?")) {
      setWatchlist(watchlist.filter((item) => item.cryptoId !== cryptoId));
    }
  };

  const handleAddToPortfolio = (item: (typeof livePortfolio)[0]) => {
    setPortfolio([...portfolio, item]);
  };

  const handleRemoveFromPortfolio = (cryptoId: string) => {
    if (window.confirm("Remove this item from your portfolio?")) {
      setPortfolio(portfolio.filter((item) => item.cryptoId !== cryptoId));
    }
  };

  const handleImport = (data: {
    portfolio?: typeof portfolio;
    watchlist?: typeof watchlist;
  }) => {
    if (data.portfolio) {
      setPortfolio(data.portfolio);
    }
    if (data.watchlist) {
      setWatchlist(data.watchlist);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Settings Toggle */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Track your portfolio, monitor markets, and stay updated with
              personalized news.
            </p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
          >
            <SettingsIcon size={20} />
            {showSettings ? "Hide" : "Show"} Settings
          </button>
        </div>

        {/* Settings and Import/Export Section */}
        {showSettings && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SettingsPanel
              preferences={preferences}
              onUpdate={setPreferences}
            />
            <ImportExport
              portfolioData={portfolio}
              watchlistData={watchlist}
              onImport={handleImport}
            />
          </div>
        )}

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Portfolio Value"
            value={formatCurrency(portfolioValue)}
            change={{
              value: portfolioChange,
              label: "24h",
            }}
            icon={Wallet}
          />
          <StatsCard
            title="Total Assets"
            value={livePortfolio.length}
            icon={PieChart}
          />
          <StatsCard
            title="Watchlist Items"
            value={liveWatchlist.length}
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Portfolio</h2>
              {!showAddToPortfolio && (
                <button
                  onClick={() => setShowAddToPortfolio(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Add to Portfolio
                </button>
              )}
            </div>

            {showAddToPortfolio && (
              <AddToPortfolio
                onAdd={handleAddToPortfolio}
                onToggle={() => setShowAddToPortfolio(!showAddToPortfolio)}
              />
            )}
            {portfolioWatchlistLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-4 shadow-sm animate-pulse"
                  >
                    <div className="flex items-center justify-between">
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
                  </div>
                ))}
              </div>
            ) : portfolioWatchlistError ? (
              <div className="text-center py-8 text-red-600">
                <p>
                  Failed to load portfolio data:{" "}
                  {portfolioWatchlistError.message}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {livePortfolio.map((item) => (
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
                            {item.amount} {item.symbol?.toUpperCase() || ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(item.totalValue)}
                          </div>
                          <div
                            className={`text-sm ${
                              item.gainLoss >= 0
                                ? "text-[hsl(160,84%,39%)]"
                                : "text-destructive"
                            }`}
                          >
                            {item.gainLoss >= 0 ? "+" : ""}
                            {formatCurrency(Math.abs(item.gainLoss))}(
                            {item.gainLossPercent >= 0 ? "+" : ""}
                            {item.gainLossPercent.toFixed(2)}%)
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveFromPortfolio(item.cryptoId)
                          }
                          className="p-2 hover:bg-destructive/10 rounded transition-colors"
                          title="Remove from portfolio"
                        >
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Watchlist */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Watchlist</h2>
              {!showAddToWatchlist && (
                <button
                  onClick={() => setShowAddToWatchlist(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Add to Watchlist
                </button>
              )}
            </div>

            {showAddToWatchlist && (
              <AddToWatchlist
                currentWatchlist={liveWatchlist}
                onAdd={handleAddToWatchlist}
                onToggle={() => setShowAddToWatchlist(!showAddToWatchlist)}
              />
            )}
            {portfolioWatchlistLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border bg-card p-4 shadow-sm animate-pulse"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : portfolioWatchlistError ? (
              <div className="text-center py-8 text-red-600">
                <p>
                  Failed to load watchlist data:{" "}
                  {portfolioWatchlistError.message}
                </p>
              </div>
            ) : (
              <Watchlist
                items={liveWatchlist}
                onRemoveItem={handleRemoveFromWatchlist}
                currencySymbol={getCurrencySymbol(preferences.currency)}
              />
            )}
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
              {trendingCoins?.slice(0, 6).map((crypto) => (
                <div
                  key={crypto.id}
                  className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={crypto.imageUrl}
                      alt={crypto.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {crypto.name}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase">
                        {crypto.symbol}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        ${crypto.price.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs ${
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
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Market Cap: ${(crypto.marketCap / 1e9).toFixed(2)}B
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      Vol: ${(crypto.volume24h / 1e9).toFixed(2)}B
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
          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : newsError ? (
            <div className="text-center py-8 text-red-600">
              <p>Failed to load news: {newsError.message}</p>
            </div>
          ) : watchlistNews.length > 0 ? (
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
