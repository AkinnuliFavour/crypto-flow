import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

export function SEO({
  title = "CryptoFlow - Real-Time Cryptocurrency Tracking & Portfolio Management",
  description = "Track cryptocurrency prices, manage your portfolio, and stay updated with the latest crypto news. Real-time market data powered by CoinGecko.",
  image = "/og-image.png",
  url = window.location.href,
  type = "website",
  keywords = [
    "cryptocurrency",
    "crypto tracker",
    "portfolio management",
    "bitcoin",
    "ethereum",
    "crypto news",
  ],
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_APP_URL || "https://cryptoflow.app";
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="CryptoFlow" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
