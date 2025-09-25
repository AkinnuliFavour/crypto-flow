import React from "react";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import type { MarketStats } from "../../types";
import { StatsCard } from "./StatsCard";

interface MarketOverviewProps {
  stats: MarketStats;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ stats }) => {
  const formatCurrency = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    }
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <BarChart3 className="h-5 w-5" />
        <span>Market Overview</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Market Cap"
          value={formatCurrency(stats.totalMarketCap)}
          icon={DollarSign}
        />

        <StatsCard
          title="24h Volume"
          value={formatCurrency(stats.totalVolume24h)}
          icon={BarChart3}
        />

        <StatsCard
          title="BTC Dominance"
          value={`${stats.btcDominance.toFixed(1)}%`}
          icon={TrendingUp}
        />

        <StatsCard
          title="Active Cryptos"
          value={stats.activeCryptocurrencies.toLocaleString()}
          icon={BarChart3}
        />
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h4 className="font-medium mb-3">Trending Coins</h4>
        <div className="space-y-2">
          {stats.trendingCoins.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={coin.imageUrl}
                  alt={coin.name}
                  className="h-6 w-6 rounded-full"
                />
                <div>
                  <span className="text-sm font-medium">{coin.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  ${coin.price.toLocaleString()}
                </div>
                <div
                  className={`text-xs ${
                    coin.change24h >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
