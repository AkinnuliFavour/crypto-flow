import React from "react";
import type { CryptoData } from "../../types";

interface PriceChartProps {
  crypto: CryptoData;
  height?: number;
  showGrid?: boolean;
}

export const PriceChart: React.FC<PriceChartProps> = ({
  crypto,
  height = 200,
  showGrid = true,
}) => {
  const { sparklineData } = crypto;
  if (!sparklineData || sparklineData.length === 0) {
    return (
      <div
        className="w-full bg-muted/20 rounded flex items-center justify-center text-muted-foreground"
        style={{ height }}
      >
        No chart data available
      </div>
    );
  }

  const minPrice = Math.min(...sparklineData);
  const maxPrice = Math.max(...sparklineData);
  const priceRange = maxPrice - minPrice;

  const points = sparklineData
    .map((price, index) => {
      const x = (index / (sparklineData.length - 1)) * 100;
      const y =
        priceRange === 0 ? 50 : 100 - ((price - minPrice) / priceRange) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const isPositive = crypto.change24h >= 0;
  const strokeColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="w-full" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {showGrid && (
          <>
            {/* Horizontal grid lines */}
            <line
              x1="0"
              y1="25"
              x2="100"
              y2="25"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="75"
              x2="100"
              y2="75"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            {/* Vertical grid lines */}
            <line
              x1="25"
              y1="0"
              x2="25"
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
            <line
              x1="75"
              y1="0"
              x2="75"
              y2="100"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
          </>
        )}

        {/* Chart line */}
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Gradient fill */}
        <defs>
          <linearGradient
            id={`gradient-${crypto.id}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#gradient-${crypto.id})`}
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    </div>
  );
};
