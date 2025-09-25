import type {
  NewsArticle,
  CryptoData,
  MarketStats,
  PortfolioItem,
  WatchlistItem,
} from "../types";

export const mockCryptoData: CryptoData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.75,
    change24h: 2.34,
    change7d: -1.23,
    marketCap: 845000000000,
    volume24h: 28500000000,
    imageUrl: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    sparklineData: [42000, 42500, 41800, 43200, 42800, 43500, 43250],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2650.45,
    change24h: -0.87,
    change7d: 5.67,
    marketCap: 318000000000,
    volume24h: 15200000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    sparklineData: [2580, 2620, 2590, 2670, 2630, 2680, 2650],
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    price: 315.2,
    change24h: 1.45,
    change7d: 3.21,
    marketCap: 46500000000,
    volume24h: 1800000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    sparklineData: [308, 312, 305, 318, 313, 320, 315],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 98.75,
    change24h: 4.12,
    change7d: 8.95,
    marketCap: 45200000000,
    volume24h: 3200000000,
    imageUrl: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    sparklineData: [92, 95, 91, 100, 96, 102, 98],
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.485,
    change24h: -2.15,
    change7d: -4.32,
    marketCap: 17200000000,
    volume24h: 850000000,
    imageUrl: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    sparklineData: [0.49, 0.48, 0.495, 0.475, 0.485, 0.47, 0.485],
  },
  {
    id: "polygon",
    symbol: "MATIC",
    name: "Polygon",
    price: 0.825,
    change24h: 0.98,
    change7d: 2.45,
    marketCap: 7650000000,
    volume24h: 420000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    sparklineData: [0.81, 0.82, 0.815, 0.83, 0.82, 0.835, 0.825],
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 14.25,
    change24h: 3.67,
    change7d: 6.89,
    marketCap: 8600000000,
    volume24h: 580000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    sparklineData: [13.8, 14.0, 13.5, 14.5, 14.1, 14.8, 14.25],
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 28.9,
    change24h: -1.23,
    change7d: 4.56,
    marketCap: 11200000000,
    volume24h: 720000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    sparklineData: [29.5, 29.0, 29.8, 28.5, 29.2, 28.0, 28.9],
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 6.85,
    change24h: 2.89,
    change7d: -1.45,
    marketCap: 9500000000,
    volume24h: 380000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    sparklineData: [6.7, 6.8, 6.6, 7.0, 6.8, 6.9, 6.85],
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    price: 7.45,
    change24h: -0.67,
    change7d: 3.12,
    marketCap: 5600000000,
    volume24h: 280000000,
    imageUrl:
      "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png",
    sparklineData: [7.5, 7.4, 7.6, 7.3, 7.5, 7.2, 7.45],
  },
];

export const mockNewsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Bitcoin Surges Past $43,000 as Institutional Adoption Accelerates",
    excerpt:
      "Major financial institutions continue to embrace Bitcoin, driving prices to new heights as traditional finance bridges with cryptocurrency markets.",
    content:
      "Bitcoin has broken through the $43,000 resistance level as institutional investors continue their aggressive accumulation strategy. Major banks and financial institutions are increasingly viewing Bitcoin as a legitimate asset class, with several announcing new crypto custody services. The surge comes amid growing regulatory clarity and improved market infrastructure. Analysts predict this momentum could continue as more traditional investors enter the space.",
    imageUrl:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=400&fit=crop",
    source: "CryptoNews",
    author: "Sarah Johnson",
    publishedAt: new Date("2024-01-15T10:30:00Z"),
    category: "bitcoin",
    tags: ["bitcoin", "institutional", "adoption", "price"],
    readTime: 3,
  },
  {
    id: "2",
    title: "BREAKING: SEC Approves First Bitcoin ETF Spot Trading",
    excerpt:
      "The Securities and Exchange Commission has given final approval for spot Bitcoin ETF trading, marking a historic milestone for cryptocurrency regulation.",
    content:
      "In a landmark decision, the SEC has approved the first-ever spot Bitcoin ETF for trading on major exchanges. This approval represents a significant step forward for cryptocurrency mainstream adoption. The ETF will allow traditional investors to gain exposure to Bitcoin without directly holding the cryptocurrency. Market analysts expect this to bring billions of dollars into the crypto space.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    source: "Financial Times",
    author: "Michael Chen",
    publishedAt: new Date("2024-01-15T08:15:00Z"),
    category: "breaking",
    tags: ["sec", "etf", "bitcoin", "regulation"],
    readTime: 4,
  },
  {
    id: "3",
    title: "Ethereum Layer 2 Solutions See Explosive Growth",
    excerpt:
      "Layer 2 scaling solutions on Ethereum are experiencing unprecedented adoption as gas fees remain high and network congestion persists.",
    content:
      "As Ethereum continues to grapple with high gas fees and network congestion, Layer 2 solutions are seeing explosive growth. Optimism, Arbitrum, and other L2 networks have seen their total value locked (TVL) increase by over 300% in the past quarter. This growth is driven by improved user experience, lower transaction costs, and enhanced scalability. Developers are increasingly building on these Layer 2 networks.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    source: "Blockchain Today",
    author: "Alex Rivera",
    publishedAt: new Date("2024-01-14T16:45:00Z"),
    category: "altcoin",
    tags: ["ethereum", "layer2", "scaling", "defi"],
    readTime: 5,
  },
  {
    id: "4",
    title: "DeFi Protocol Exploited for $50 Million in Flash Loan Attack",
    excerpt:
      "A sophisticated flash loan attack has drained $50 million from a popular DeFi protocol, highlighting ongoing security concerns in decentralized finance.",
    content:
      "A major DeFi protocol has fallen victim to a sophisticated flash loan attack, resulting in the loss of approximately $50 million in user funds. The attack exploited a vulnerability in the protocol's smart contracts, allowing the attacker to manipulate prices and drain liquidity pools. This incident underscores the importance of thorough security audits and ongoing monitoring in the DeFi space. The protocol team has paused operations and is working with security experts to recover funds.",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
    source: "DeFi Pulse",
    author: "Emma Thompson",
    publishedAt: new Date("2024-01-14T12:20:00Z"),
    category: "defi",
    tags: ["defi", "security", "exploit", "flash-loan"],
    readTime: 4,
  },
  {
    id: "5",
    title: "Central Banks Consider Digital Currency Implementation",
    excerpt:
      "Multiple central banks worldwide are accelerating their digital currency projects as they recognize the potential benefits of CBDCs.",
    content:
      "Central banks across the globe are ramping up their digital currency initiatives. China's digital yuan pilot program has expanded to multiple cities, while the European Central Bank is finalizing technical specifications for the digital euro. Even the Federal Reserve has indicated renewed interest in exploring a digital dollar. These developments could fundamentally reshape the global financial system and impact the adoption of cryptocurrencies.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
    source: "Central Bank Watch",
    author: "David Park",
    publishedAt: new Date("2024-01-13T14:10:00Z"),
    category: "regulation",
    tags: ["cbdc", "central-bank", "regulation", "digital-currency"],
    readTime: 6,
  },
  {
    id: "6",
    title: "Solana Ecosystem Sees Massive Developer Activity",
    excerpt:
      "Solana's developer ecosystem continues to expand rapidly, with new projects and dApps launching weekly on the high-performance blockchain.",
    content:
      "Solana's ecosystem is experiencing unprecedented growth, with developer activity reaching new highs. The network has seen over 500 new projects launch in the past month alone, spanning DeFi, NFTs, gaming, and Web3 applications. This growth is fueled by Solana's high throughput, low fees, and developer-friendly tools. Industry analysts predict Solana could challenge Ethereum's dominance in the coming years.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=400&fit=crop",
    source: "Solana Labs",
    author: "Jessica Liu",
    publishedAt: new Date("2024-01-13T09:30:00Z"),
    category: "altcoin",
    tags: ["solana", "developer", "ecosystem", "blockchain"],
    readTime: 4,
  },
  {
    id: "7",
    title: "Bitcoin Mining Difficulty Reaches All-Time High",
    excerpt:
      "Bitcoin's mining difficulty has hit a new record, reflecting increased hashrate and network security as more miners join the network.",
    content:
      "Bitcoin's mining difficulty has reached an all-time high of 67.5 trillion, representing a 5.8% increase from the previous adjustment. This rise in difficulty reflects the growing hashrate of the Bitcoin network, which now exceeds 600 exahashes per second. The increased difficulty ensures Bitcoin's security remains robust as more miners participate in securing the network.",
    imageUrl:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop",
    source: "Mining Weekly",
    author: "Robert Kim",
    publishedAt: new Date("2024-01-12T18:45:00Z"),
    category: "bitcoin",
    tags: ["bitcoin", "mining", "difficulty", "hashrate"],
    readTime: 3,
  },
  {
    id: "8",
    title: "NFT Market Shows Signs of Recovery",
    excerpt:
      "After a prolonged bear market, the NFT space is showing signs of recovery with increased trading volume and new innovative projects.",
    content:
      "The NFT market is showing promising signs of recovery after a challenging 2023. Trading volumes have increased by 40% in recent weeks, with blue-chip collections leading the charge. New projects are focusing on utility and real-world applications rather than pure speculation. Gaming, metaverse, and digital collectibles are driving the renewed interest in NFTs.",
    imageUrl:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    source: "NFT Insider",
    author: "Maria Garcia",
    publishedAt: new Date("2024-01-12T11:15:00Z"),
    category: "defi",
    tags: ["nft", "market-recovery", "trading", "gaming"],
    readTime: 4,
  },
  {
    id: "9",
    title: "Layer 1 Blockchain Competition Intensifies",
    excerpt:
      "Competition among Layer 1 blockchains is heating up as projects focus on scalability, interoperability, and developer experience.",
    content:
      "The Layer 1 blockchain landscape is becoming increasingly competitive as projects vie for market share. Ethereum continues to dominate, but challengers like Solana, Avalanche, and emerging platforms are gaining ground. Focus areas include scalability solutions, cross-chain interoperability, and improved developer tools. This competition is driving innovation and benefiting users with better performance and lower costs.",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop",
    source: "Blockchain Digest",
    author: "Tom Anderson",
    publishedAt: new Date("2024-01-11T15:20:00Z"),
    category: "technology",
    tags: ["layer1", "competition", "scalability", "interoperability"],
    readTime: 5,
  },
  {
    id: "10",
    title: "Crypto Market Analysis: Bullish Signals Emerging",
    excerpt:
      "Technical analysis shows bullish signals across major cryptocurrencies as market sentiment improves and institutional interest grows.",
    content:
      "Technical analysis of the cryptocurrency market reveals several bullish signals that could indicate a potential market recovery. Bitcoin has formed a golden cross pattern, while altcoins are showing relative strength. Institutional interest continues to grow, with more companies announcing crypto initiatives. Market analysts remain cautiously optimistic about the coming months.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    source: "Market Analysis Pro",
    author: "Lisa Wong",
    publishedAt: new Date("2024-01-11T08:00:00Z"),
    category: "analysis",
    tags: ["analysis", "technical", "bullish", "market"],
    readTime: 6,
  },
];

export const mockMarketStats: MarketStats = {
  totalMarketCap: 1650000000000,
  totalVolume24h: 85000000000,
  btcDominance: 52.3,
  activeCryptocurrencies: 12500,
  trendingCoins: mockCryptoData.slice(0, 5),
};

export const mockPortfolio: PortfolioItem[] = [
  {
    cryptoId: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    amount: 0.5,
    averagePrice: 41000,
    currentPrice: 43250.75,
    totalValue: 21625.38,
    gainLoss: 625.38,
    gainLossPercent: 2.98,
  },
  {
    cryptoId: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    amount: 5,
    averagePrice: 2500,
    currentPrice: 2650.45,
    totalValue: 13252.25,
    gainLoss: 752.25,
    gainLossPercent: 6.02,
  },
  {
    cryptoId: "solana",
    symbol: "SOL",
    name: "Solana",
    amount: 20,
    averagePrice: 90,
    currentPrice: 98.75,
    totalValue: 1975,
    gainLoss: 175,
    gainLossPercent: 9.72,
  },
];

export const mockWatchlist: WatchlistItem[] = [
  {
    cryptoId: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.75,
    change24h: 2.34,
    imageUrl: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  {
    cryptoId: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 2650.45,
    change24h: -0.87,
    imageUrl:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  {
    cryptoId: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 98.75,
    change24h: 4.12,
    imageUrl: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  },
  {
    cryptoId: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 14.25,
    change24h: 3.67,
    imageUrl:
      "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
  },
];
