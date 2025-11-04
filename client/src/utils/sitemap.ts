export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export function generateSitemap(urls: SitemapUrl[]): string {
  const baseUrl = import.meta.env.VITE_APP_URL || "https://cryptoflow.app";

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;
}

// Static routes for your app
export const sitemapUrls: SitemapUrl[] = [
  { loc: "/", changefreq: "daily", priority: 1.0 },
  { loc: "/dashboard", changefreq: "hourly", priority: 0.9 },
  { loc: "/news", changefreq: "hourly", priority: 0.8 },
];

// Function to generate dynamic URLs for articles
export function addArticleToSitemap(
  articleSlug: string,
  publishDate?: string
): SitemapUrl {
  return {
    loc: `/article/${articleSlug}`,
    lastmod: publishDate || new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: 0.7,
  };
}

// Function to generate dynamic URLs for cryptocurrencies
export function addCryptoToSitemap(cryptoId: string): SitemapUrl {
  return {
    loc: `/crypto/${cryptoId}`,
    changefreq: "hourly",
    priority: 0.6,
  };
}
