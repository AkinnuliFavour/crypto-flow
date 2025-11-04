import React from "react";
import {
  useCoinPrices,
  useTrendingCoins,
  useMarketOverview,
} from "../../hooks";

/**
 * Example component demonstrating CoinGecko API integration
 * Shows how to use multiple hooks together with proper loading/error states
 */
export const CoinGeckoExample: React.FC = () => {
  // Fetch prices for popular coins
  const {
    data: prices,
    isLoading: pricesLoading,
    error: pricesError,
  } = useCoinPrices({
    coinIds: ["bitcoin", "ethereum", "cardano", "solana"],
    vsCurrency: "usd",
    refetchInterval: 30000, // Update every 30 seconds
  });

  // Fetch trending coins
  const {
    data: trending,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrendingCoins();

  // Fetch market overview (top 10 coins)
  const {
    data: market,
    isLoading: marketLoading,
    error: marketError,
  } = useMarketOverview({
    perPage: 10,
    page: 1,
    sparkline: false,
  });

  if (pricesLoading || trendingLoading || marketLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pricesError || trendingError || marketError) {
    return (
      <div className="p-4 text-red-600">
        <p>Error loading cryptocurrency data:</p>
        {pricesError && <p>Prices: {pricesError.message}</p>}
        {trendingError && <p>Trending: {trendingError.message}</p>}
        {marketError && <p>Market: {marketError.message}</p>}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">CoinGecko API Integration Example</h2>

      {/* Popular Coins Prices */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Popular Coins</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices &&
            Object.entries(prices).map(([coinId, coinData]) => (
              <div key={coinId} className="border rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={coinData.image}
                    alt={coinData.name}
                    className="w-6 h-6"
                  />
                  <span className="font-medium">{coinData.name}</span>
                </div>
                <div className="mt-2">
                  <div className="text-lg font-bold">
                    ${coinData.current_price.toLocaleString()}
                  </div>
                  <div
                    className={`text-sm ${
                      coinData.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coinData.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coinData.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Trending Coins */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Trending Coins</h3>
        <div className="flex flex-wrap gap-2">
          {trending?.coins.slice(0, 5).map(({ item }) => (
            <div
              key={item.id}
              className="border rounded-lg p-2 flex items-center space-x-2"
            >
              <img src={item.small} alt={item.name} className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
              <span className="text-xs text-gray-500">
                #{item.market_cap_rank}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Market Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Top 10 by Market Cap</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Coin
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  24h %
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {market?.slice(0, 10).map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {coin.market_cap_rank}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-5 h-5"
                      />
                      <span>{coin.name}</span>
                      <span className="text-gray-500 uppercase">
                        {coin.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-right ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
