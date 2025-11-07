import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { useTopCryptos } from "../../hooks/useCoinGecko";
import type { CryptoData, PortfolioItem } from "../../types";

interface AddToPortfolioProps {
  onAdd: (item: PortfolioItem) => void;
}

export const AddToPortfolio: React.FC<AddToPortfolioProps> = ({ onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<CryptoData | null>(null);
  const [amount, setAmount] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  // Fetch top 100 cryptocurrencies to choose from
  const { data: availableCoins, isLoading } = useTopCryptos({ limit: 100 });

  const handleSelectCoin = (coin: CryptoData) => {
    setSelectedCoin(coin);
    setBuyPrice(coin.price.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCoin || !amount || !buyPrice) return;

    const amountNum = parseFloat(amount);
    const buyPriceNum = parseFloat(buyPrice);

    if (
      isNaN(amountNum) ||
      isNaN(buyPriceNum) ||
      amountNum <= 0 ||
      buyPriceNum <= 0
    ) {
      alert("Please enter valid positive numbers");
      return;
    }

    const totalValue = amountNum * selectedCoin.price;
    const gainLoss = (selectedCoin.price - buyPriceNum) * amountNum;
    const gainLossPercent =
      ((selectedCoin.price - buyPriceNum) / buyPriceNum) * 100;

    const newItem: PortfolioItem = {
      cryptoId: selectedCoin.id,
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      amount: amountNum,
      averagePrice: buyPriceNum,
      currentPrice: selectedCoin.price,
      totalValue,
      gainLoss,
      gainLossPercent,
    };

    onAdd(newItem);

    // Reset form
    setSelectedCoin(null);
    setAmount("");
    setBuyPrice("");
    setSearchTerm("");
  };

  // Filter coins based on search and exclude already added ones
  const filteredCoins =
    availableCoins
      ?.filter((coin) => {
        const matchesSearch =
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
      .slice(0, 10) || [];

  return (
    <div className="rounded-lg border bg-card p-4">
      {!selectedCoin ? (
        <>
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
                  onClick={() => handleSelectCoin(coin)}
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
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <img
              src={selectedCoin.imageUrl}
              alt={selectedCoin.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-semibold">{selectedCoin.name}</div>
              <div className="text-sm text-muted-foreground uppercase">
                {selectedCoin.symbol}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCoin(null)}
              className="ml-auto p-1 hover:bg-background rounded"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Amount (How many {selectedCoin.symbol.toUpperCase()} do you own?)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Average Buy Price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                placeholder="0.00"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current price: ${selectedCoin.price.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedCoin(null)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add to Portfolio
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
