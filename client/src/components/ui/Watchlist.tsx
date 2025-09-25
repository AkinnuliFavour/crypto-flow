import React from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import type { WatchlistItem } from "../../types";
import { Button } from "./button";

interface WatchlistProps {
  items: WatchlistItem[];
  onItemClick?: (cryptoId: string) => void;
  onRemoveItem?: (cryptoId: string) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({
  items,
  onItemClick,
  onRemoveItem,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">No Watchlist Items</h3>
        <p className="text-sm text-muted-foreground">
          Add cryptocurrencies to your watchlist to track their performance.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h3 className="font-semibold flex items-center space-x-2">
          <Star className="h-5 w-5" />
          <span>Watchlist</span>
        </h3>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.cryptoId}
            className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => onItemClick?.(item.cryptoId)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase">
                    {item.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-sm">
                  {formatPrice(item.price)}
                </div>
                <div
                  className={`text-xs flex items-center space-x-1 ${
                    item.change24h >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {item.change24h >= 0 ? "+" : ""}
                    {item.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>

              {onRemoveItem && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.cryptoId);
                  }}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
