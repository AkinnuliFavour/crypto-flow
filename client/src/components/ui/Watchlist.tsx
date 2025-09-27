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
      <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium text-foreground mb-2">No Watchlist Items</h3>
        <p className="text-sm text-muted-foreground">
          Add cryptocurrencies to your watchlist to track their performance.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Star className="h-5 w-5 text-primary" />
          <span>Watchlist</span>
        </h3>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.cryptoId}
            className="group p-4 hover:bg-accent/50 transition-colors cursor-pointer"
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
                  <h4 className="font-medium text-sm text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground uppercase">
                    {item.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-sm text-foreground">
                  {formatPrice(item.price)}
                </div>
                <div
                  className={`text-xs flex items-center space-x-1 ${
                    item.change24h >= 0
                      ? "text-[hsl(160,84%,39%)]"
                      : "text-destructive"
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

  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-card shadow-sm">
      <div className="p-4 border-b border-[var(--border-default)]">
        <h3 className="font-semibold text-[var(--text-primary)] flex items-center space-x-2">
          <Star className="h-5 w-5 text-[var(--accent-primary)]" />
          <span>Watchlist</span>
        </h3>
      </div>

      <div className="divide-y divide-[var(--border-default)]">
        {items.map((item) => (
          <div
            key={item.cryptoId}
            className="group p-4 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
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
                  <h4 className="font-medium text-sm text-[var(--text-primary)]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] uppercase">
                    {item.symbol}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-sm text-[var(--text-primary)]">
                  {formatPrice(item.price)}
                </div>
                <div
                  className={`text-xs flex items-center space-x-1 ${
                    item.change24h >= 0
                      ? "text-[var(--success)]"
                      : "text-[var(--danger)]"
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
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--bg-hover)]"
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
