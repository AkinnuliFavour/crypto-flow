// SEO Schema definitions for structured data

// Website schema for the home page
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CryptoFlow",
  description:
    "Real-time cryptocurrency tracking and portfolio management platform",
  url: "https://cryptoflow.app",
  applicationCategory: "FinanceApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

// Schema for articles/news
export function createArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    url: article.url,
    ...(article.image && { image: article.image }),
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author,
      },
    }),
  };
}

// Schema for cryptocurrency data
export function createCryptoSchema(crypto: {
  name: string;
  symbol: string;
  price: number;
  currency: string;
  marketCap?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: crypto.name,
    description: `${crypto.name} (${crypto.symbol}) cryptocurrency`,
    offers: {
      "@type": "Offer",
      price: crypto.price,
      priceCurrency: crypto.currency,
    },
    ...(crypto.marketCap && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Market Cap",
        value: crypto.marketCap,
      },
    }),
  };
}
