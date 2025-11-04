# CoinGecko API Integration

This document describes the CoinGecko API integration added to the React application.

## Overview

The integration provides real-time cryptocurrency data from CoinGecko's free API tier, including prices, charts, market overview, and trending coins. All data is cached appropriately using TanStack Query.

## Files Added

- `src/services/coingecko.ts` - Axios instance and API service methods
- `src/hooks/useCoinGecko.ts` - Custom TanStack Query hooks
- `src/components/ui/CoinGeckoExample.tsx` - Example component demonstrating usage

## API Methods

### `getCoinPrices(coinIds, vsCurrency)`

Fetches current prices for multiple coins.

- **Parameters**: `coinIds` (string[]), `vsCurrency` (default: 'usd')
- **Returns**: Object with coin data including price, 24h change, volume, market cap

### `getCoinChart(coinId, vsCurrency, days)`

Fetches historical price data for charts.

- **Parameters**: `coinId`, `vsCurrency` (default: 'usd'), `days` (1, 7, 30, 90, 365)
- **Returns**: Time series data with prices, market caps, and volumes

### `getMarketOverview(vsCurrency, perPage, page, sparkline)`

Fetches top coins by market cap.

- **Parameters**: `vsCurrency`, `perPage`, `page`, `sparkline`
- **Returns**: Array of coin data with optional sparkline data

### `getTrendingCoins()`

Fetches currently trending coins.

- **Returns**: Trending coins list with metadata

## Custom Hooks

### `useCoinPrices(options)`

```typescript
const { data, isLoading, error } = useCoinPrices({
  coinIds: ["bitcoin", "ethereum"],
  vsCurrency: "usd",
  refetchInterval: 30000, // Optional polling
});
```

### `useCoinChart(options)`

```typescript
const { data, isLoading, error } = useCoinChart({
  coinId: "bitcoin",
  vsCurrency: "usd",
  days: 7,
});
```

### `useMarketOverview(options)`

```typescript
const { data, isLoading, error } = useMarketOverview({
  perPage: 100,
  page: 1,
  sparkline: true,
  refetchInterval: 60000, // Optional polling
});
```

### `useTrendingCoins(options)`

```typescript
const { data, isLoading, error } = useTrendingCoins();
```

## Cache Strategy

- **Prices**: 2-minute stale time (frequent updates)
- **Charts**: 5-minute stale time (moderate updates)
- **Market Overview**: 3-minute stale time (balanced)
- **Trending**: 10-minute stale time (slow changes)

## Rate Limiting

The integration includes automatic rate limiting to respect CoinGecko's free tier (50 calls/minute):

- 1.5-second delay between requests
- Request interceptor handles timing
- No additional libraries required

## API Key (Optional)

To use a CoinGecko API key (for higher limits):

1. Get an API key from CoinGecko
2. Add to `.env`: `VITE_COINGECKO_API_KEY=your_key_here`
3. The integration will automatically use it

## Usage Example

```tsx
import { useCoinPrices, useTrendingCoins } from "../hooks";

function MyComponent() {
  const { data: prices, isLoading } = useCoinPrices({
    coinIds: ["bitcoin", "ethereum"],
  });

  const { data: trending } = useTrendingCoins();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Bitcoin Price: ${prices?.bitcoin?.current_price}</h2>
      <h3>Trending: {trending?.coins[0]?.item.name}</h3>
    </div>
  );
}
```

## Error Handling

All hooks follow TanStack Query patterns:

- Use `error` property for error states
- Use `isLoading` for loading states
- Errors are logged to console with context

## Integration Notes

- Completely separate from existing backend axios instance
- Uses same TanStack Query patterns as existing code
- No conflicts with backend API calls
- CORS-friendly (CoinGecko supports it)
