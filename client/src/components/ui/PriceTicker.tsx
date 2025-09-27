import React, { useEffect, useState } from "react";
import type { CryptoData } from "../../types";
import { PriceCard } from "../ui";

interface PriceTickerProps {
  cryptos: CryptoData[];
  speed?: number; // pixels per second
}

export const PriceTicker: React.FC<PriceTickerProps> = ({
  cryptos,
  speed = 50,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const maxScroll = cryptos.length * 280; // Approximate width per card
        return prev >= maxScroll ? 0 : prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [cryptos.length, speed, isPaused]);

  // Duplicate the array for seamless scrolling
  const duplicatedCryptos = [...cryptos, ...cryptos];

  return (
    <div
      className="relative overflow-hidden bg-secondary border rounded-lg py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex space-x-4 transition-transform duration-100 ease-linear"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
          width: `${duplicatedCryptos.length * 280}px`,
        }}
      >
        {duplicatedCryptos.map((crypto, index) => (
          <div key={`${crypto.id}-${index}`} className="flex-shrink-0 w-64">
            <PriceCard crypto={crypto} showChart={true} />
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
    </div>
  );
};
