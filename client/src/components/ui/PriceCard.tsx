import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoData } from "../../types";

interface PriceCardProps {
  crypto: CryptoData;
  showChart?: boolean;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  crypto,
  showChart = false,
}) => {
  const formatPrice = (price: number) => {
    if (price >= 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const isPositive = crypto.change24h >= 0;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={crypto.imageUrl}
            alt={crypto.name}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-sm text-foreground">{crypto.name}</h3>
            <p className="text-xs text-muted-foreground uppercase">
              {crypto.symbol}
            </p>
          </div>
        </div>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-[hsl(160,84%,39%)]" />
        ) : (
          <TrendingDown className="h-4 w-4 text-destructive" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-foreground">{formatPrice(crypto.price)}</span>
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-[hsl(160,84%,39%)]" : "text-destructive"
            }`}
          >
            {isPositive ? "+" : ""}
            {crypto.change24h.toFixed(2)}%
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Market Cap: {formatMarketCap(crypto.marketCap)}
        </div>

        {showChart && crypto.sparklineData && (
          <div className="mt-3 h-12">
            <svg
              viewBox="0 0 100 30"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke={isPositive ? "hsl(160,84%,39%)" : "hsl(0,84%,60%)"}
                strokeWidth="1.5"
                points={crypto.sparklineData
                  .map((price, index) => {
                    const x = (index / (crypto.sparklineData.length - 1)) * 100;
                    const minPrice = Math.min(...crypto.sparklineData);
                    const maxPrice = Math.max(...crypto.sparklineData);
                    const y =
                      30 - ((price - minPrice) / (maxPrice - minPrice)) * 30;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
