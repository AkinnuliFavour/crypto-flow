import axios from "axios";

// Create a separate axios instance for CoinGecko API
export const coingeckoClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Rate limiting: CoinGecko free tier allows 50 calls/minute
// We'll add a delay to ensure we don't exceed this limit
let lastRequestTime = 0;
const MIN_DELAY_MS = 1500; // 1.5 seconds between requests (safe buffer)

coingeckoClient.interceptors.request.use(
  async (config) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_DELAY_MS) {
      const delay = MIN_DELAY_MS - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    lastRequestTime = Date.now();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
coingeckoClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "CoinGecko API error";
    console.error("CoinGecko API Error:", message);
    return Promise.reject(error);
  }
);

// API Key support (optional - for future use if upgrading from free tier)
// To use an API key, add VITE_COINGECKO_API_KEY to your .env file
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
if (API_KEY) {
  coingeckoClient.defaults.headers.common["x-cg-demo-api-key"] = API_KEY;
}

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface CoinChartData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface TrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface TrendingResponse {
  coins: Array<{
    item: TrendingCoin;
  }>;
}

// API service methods
export const coingeckoApi = {
  /**
   * Fetch current prices for multiple coins
   */
  getCoinPrices: async (
    coinIds: string[],
    vsCurrency: string = "usd"
  ): Promise<Record<string, CoinPrice>> => {
    const ids = coinIds.join(",");
    // Use the markets endpoint instead of simple/price to get all coin details including symbol
    const response = await coingeckoClient.get<CoinPrice[]>(
      `/coins/markets?ids=${ids}&vs_currency=${vsCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
    );

    // Convert array to object with coin id as key
    const result: Record<string, CoinPrice> = {};
    response.data.forEach((coin) => {
      result[coin.id] = coin;
    });

    return result;
  },

  /**
   * Fetch historical price data for charts
   */
  getCoinChart: async (
    coinId: string,
    vsCurrency: string = "usd",
    days: number = 7
  ): Promise<CoinChartData> => {
    const response = await coingeckoClient.get<CoinChartData>(
      `/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`
    );
    return response.data;
  },

  /**
   * Fetch top coins by market cap
   */
  getMarketOverview: async (
    vsCurrency: string = "usd",
    perPage: number = 100,
    page: number = 1,
    sparkline: boolean = true
  ): Promise<CoinPrice[]> => {
    const response = await coingeckoClient.get<CoinPrice[]>(
      `/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=24h%2C7d`
    );
    return response.data;
  },

  /**
   * Fetch currently trending coins
   */
  getTrendingCoins: async (): Promise<TrendingResponse> => {
    const response = await coingeckoClient.get<TrendingResponse>(
      "/search/trending"
    );
    return response.data;
  },
};
