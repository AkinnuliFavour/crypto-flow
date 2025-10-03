import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../services/coingecko";

export interface UseCoinPricesOptions {
  coinIds: string[];
  vsCurrency?: string;
  enabled?: boolean;
  refetchInterval?: number;
}

export interface UseCoinChartOptions {
  coinId: string;
  vsCurrency?: string;
  days?: number;
  enabled?: boolean;
}

export interface UseMarketOverviewOptions {
  vsCurrency?: string;
  perPage?: number;
  page?: number;
  sparkline?: boolean;
  enabled?: boolean;
  refetchInterval?: number;
}

export interface UseTrendingCoinsOptions {
  enabled?: boolean;
}

/**
 * Hook for fetching current prices for multiple coins
 * Uses short staleTime since prices change frequently
 */
export const useCoinPrices = ({
  coinIds,
  vsCurrency = "usd",
  enabled = true,
  refetchInterval,
}: UseCoinPricesOptions) => {
  return useQuery({
    queryKey: ["coingecko", "prices", coinIds, vsCurrency],
    queryFn: () => coingeckoApi.getCoinPrices(coinIds, vsCurrency),
    enabled: enabled && coinIds.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval,
  });
};

/**
 * Hook for fetching historical price data for charts
 * Uses moderate staleTime since historical data changes less frequently
 */
export const useCoinChart = ({
  coinId,
  vsCurrency = "usd",
  days = 7,
  enabled = true,
}: UseCoinChartOptions) => {
  return useQuery({
    queryKey: ["coingecko", "chart", coinId, vsCurrency, days],
    queryFn: () => coingeckoApi.getCoinChart(coinId, vsCurrency, days),
    enabled: enabled && !!coinId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook for fetching market overview (top coins by market cap)
 * Uses moderate staleTime with optional polling for real-time updates
 */
export const useMarketOverview = ({
  vsCurrency = "usd",
  perPage = 100,
  page = 1,
  sparkline = true,
  enabled = true,
  refetchInterval,
}: UseMarketOverviewOptions) => {
  return useQuery({
    queryKey: ["coingecko", "market", vsCurrency, perPage, page, sparkline],
    queryFn: () =>
      coingeckoApi.getMarketOverview(vsCurrency, perPage, page, sparkline),
    enabled,
    staleTime: 1000 * 60 * 3, // 3 minutes
    refetchInterval,
  });
};

/**
 * Hook for fetching trending coins
 * Uses longer staleTime since trending data changes slowly
 */
export const useTrendingCoins = ({
  enabled = true,
}: UseTrendingCoinsOptions = {}) => {
  return useQuery({
    queryKey: ["coingecko", "trending"],
    queryFn: () => coingeckoApi.getTrendingCoins(),
    enabled,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Utility hook for getting a single coin's price data
export const useCoinPrice = (
  coinId: string,
  vsCurrency: string = "usd",
  options?: Omit<UseCoinPricesOptions, "coinIds">
) => {
  const { data, ...queryResult } = useCoinPrices({
    coinIds: [coinId],
    vsCurrency,
    ...options,
  });

  return {
    ...queryResult,
    data: data ? data[coinId] : undefined,
  };
};
