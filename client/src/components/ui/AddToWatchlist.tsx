import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { useTopCryptos } from "../../hooks/useCoinGecko";
import type { CryptoData, WatchlistItem } from "../../types";

interface AddToWatchlistProps {
  currentWatchlist: WatchlistItem[];
  onAdd: (item: WatchlistItem) => void;
  onToggle?: () => void;
}

export const AddToWatchlist: React.FC<AddToWatchlistProps> = ({
  currentWatchlist,
  onAdd,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch top 100 cryptocurrencies to choose from
  const { data: availableCoins, isLoading } = useTopCryptos({ limit: 100 });

  const handleAdd = (coin: CryptoData) => {
    const newItem: WatchlistItem = {
      cryptoId: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.price,
      change24h: coin.change24h,
      imageUrl: coin.imageUrl,
    };
    onAdd(newItem);
    setSearchTerm("");
  };

  // Filter coins based on search and exclude already added ones
  const filteredCoins =
    availableCoins
      ?.filter((coin) => {
        const matchesSearch =
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        const notInWatchlist = !currentWatchlist.some(
          (item) => item.cryptoId === coin.id
        );
        return matchesSearch && notInWatchlist;
      })
      .slice(0, 10) || [];

  const handleClose = () => {
    if (onToggle) {
      onToggle();
    }
    setSearchTerm("");
  };

  return (
    <div className="rounded-lg border bg-card p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Add to Watchlist</h3>
        <button onClick={handleClose} className="p-1 hover:bg-accent rounded">
          <X size={20} />
        </button>
      </div>

      <div className="relative mb-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Loading...
          </div>
        ) : filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <button
              key={coin.id}
              onClick={() => handleAdd(coin)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <img
                  src={coin.imageUrl}
                  alt={coin.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {coin.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  ${coin.price.toLocaleString()}
                </div>
                <div
                  className={`text-sm ${
                    coin.change24h >= 0
                      ? "text-[hsl(160,84%,39%)]"
                      : "text-destructive"
                  }`}
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            {searchTerm
              ? "No cryptocurrencies found"
              : "Start typing to search"}
          </div>
        )}
      </div>
    </div>
  );
};
