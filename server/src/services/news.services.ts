import {
  ArticleContent,
  JinaReaderResponse,
  NewsApiResponse,
  NewsArticle,
} from "../types/news.types";
import { config } from "../config/env";

const NEWS_API_BASE = "https://newsapi.org/v2";
const JINA_READER_BASE = "https://r.jina.ai";

export class NewsService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Returns site-specific config for extracting article content.
   */
  private getSiteConfig(
    articleUrl: string
  ): { selectors: string[]; removeSelectors: string[] } | null {
    // Example: Add more site configs as needed
    if (articleUrl.includes("bitcoinist.com")) {
      return {
        selectors: ["article .content-inner", ".entry-content"],
        removeSelectors: [
          ".jeg_meta_author",
          ".jeg_meta_date",
          ".jeg_share_button",
          ".jeg_ad",
          "aside",
          ".related-post",
          ".jeg_readmore",
          ".jeg_bottomlink",
          "footer",
          ".comments-area",
          ".newsletter-box",
        ],
      };
    }
    // Add more site-specific configs here as needed

    return null;
  }

  async getCryptoNews(
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> {
    try {
      const url = new URL(`${NEWS_API_BASE}/everything`);
      url.searchParams.append("q", "cryptocurrency OR bitcoin OR ethereum");
      url.searchParams.append("sortBy", "publishedAt");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("apiKey", this.apiKey);
      url.searchParams.append("language", "en");

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(
          errorData.message || "Failed to fetch news from NewsAPI"
        );
      }

      const data = (await response.json()) as NewsApiResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`News API Error: ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching news");
    }
  }

  async searchNews(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<NewsApiResponse> {
    try {
      const url = new URL(`${NEWS_API_BASE}/everything`);
      url.searchParams.append("q", query);
      url.searchParams.append("sortBy", "publishedAt");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("apiKey", this.apiKey);
      url.searchParams.append("language", "en");

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = (await response.json()) as { message?: string };
        throw new Error(errorData.message || "Failed to search news");
      }

      const data = (await response.json()) as NewsApiResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`News API Error: ${error.message}`);
      }
      throw new Error("An unknown error occurred while searching news");
    }
  }

  // Since NewsAPI doesn't provide individual article endpoints,
  // this would need to use the article URL to fetch from original source
  // or return cached data
  async getArticleDetails(articleUrl: string): Promise<ArticleContent> {
    try {
      const siteConfig = this.getSiteConfig(articleUrl);

      const headers: Record<string, string> = {
        Accept: "application/json",
        "X-Return-Format": "markdown",
        "X-With-Generated-Alt": "true",
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
      };

      // For bitcoinist.com specifically
      if (articleUrl.includes("bitcoinist.com")) {
        headers["X-Target-Selector"] = "article .content-inner, .entry-content";
        headers["X-Remove-Selector"] =
          ".jeg_meta_author, .jeg_meta_date, .jeg_share_button, .jeg_ad, aside, .related-post, .jeg_readmore, .jeg_bottomlink, footer, .comments-area, .newsletter-box";
      } else if (siteConfig) {
        headers["X-Target-Selector"] = siteConfig.selectors.join(", ");
        headers["X-Remove-Selector"] = siteConfig.removeSelectors.join(", ");
      } else {
        // Default selectors
        headers["X-Target-Selector"] =
          'article, [role="main"], .article-content, .post-content, main';
        headers["X-Remove-Selector"] =
          "nav, header, footer, .ad, .advertisement, .social-share, .related-articles, aside, .sidebar, .comments, .newsletter";
      }

      const response = await fetch(`${JINA_READER_BASE}/${articleUrl}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Jina Reader failed: ${response.statusText}`);
      }

      const data = (await response.json()) as JinaReaderResponse;

      // Apply aggressive cleaning
      let cleanedContent = this.cleanArticleContent(data.data.content);

      // If content is still too messy, try score-based extraction
      if (
        cleanedContent.includes("Image") ||
        cleanedContent.includes("Editorial Process")
      ) {
        cleanedContent = this.extractMainContentByScore(cleanedContent);
      }

      return {
        title: data.data.title || "Untitled",
        content: cleanedContent,
        description: data.data.description,
        url: articleUrl,
        author: data.data.author,
        publishedAt: data.data.publishedTime,
        image: data.data.images?.[0],
        siteName: data.data.siteName,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to extract article: ${error.message}`);
      }
      throw new Error("An unknown error occurred while extracting article");
    }
  }

  /**
   * Cleans up article content by removing unwanted whitespace, repeated newlines, and common junk.
   */
  // Add this helper method to clean content
  private cleanArticleContent(content: string): string {
    if (!content) return "";

    let cleaned = content;

    // Step 1: Remove markdown image syntax with empty or placeholder images
    cleaned = cleaned.replace(/!\[Image \d+:.*?\]\(.*?jeg-empty\.png\)/g, "");
    cleaned = cleaned.replace(/!\[Image \d+:.*?\]\(.*?blank\.gif\)/g, "");
    cleaned = cleaned.replace(/!\[Image \d+:.*?small image.*?\]\(.*?\)/gi, "");
    cleaned = cleaned.replace(
      /!\[Image \d+:.*?(logo|icon|avatar).*?\]\(.*?\)/gi,
      ""
    );

    // Step 2: Remove entire sections that are clearly not article content
    const sectionsToRemove = [
      // Related articles blocks
      /###\s*\[.*?\]\(.*?\)\s*\n\s*\[.*?\]\(.*?\)/g,

      // Editorial/disclaimer blocks
      /Trusted Editorial content.*?Ad Disclosure.*?\n/gs,
      /\*\*Editorial Process\*\*.*?value of our content for our readers\./gs,

      // Advertisement blocks
      /\[BitStarz.*?\]\(.*?\)/g,

      // "Related Reading" links and similar
      /Related Reading:.*?\n/g,
      /Read more:.*?\n/gi,
      /See also:.*?\n/gi,
      /More on this:.*?\n/gi,

      // Image credits at the end
      /_Featured image from.*?TradingView_/g,
      /Featured image.*?\n/gi,
      /Image source:.*?\n/gi,

      // Chart indicators
      /Chart:\s*\[TradingView\]\(.*?\)/g,

      // Price tickers (optional - you might want to keep these)
      /[A-Z]{3,6}\s+now trading at.*?\n/g,

      // Social media calls to action
      /Follow us on.*?\n/gi,
      /Subscribe to.*?\n/gi,
      /Join our.*?\n/gi,

      // Multiple consecutive links (likely navigation/related content)
      /(\[.*?\]\(.*?\)\s*){3,}/g,

      // URL-encoded text fragments (malformed URLs)
      /%20[%\w]+\)/g,

      // Share/Social sections
      /#{1,6}\s*Share this article.*?\n/gi,
      /#{1,6}\s*Share.*?\n/gi,

      // Categories and Tags sections
      /#{1,6}\s*Categories.*?\n/gi,
      /#{1,6}\s*Tags.*?\n/gi,
    ];

    sectionsToRemove.forEach((pattern) => {
      cleaned = cleaned.replace(pattern, "");
    });

    // Step 3: Split into lines and apply line-by-line filtering
    const lines = cleaned.split("\n");
    const filteredLines = lines.filter((line) => {
      const trimmed = line.trim();

      // Keep empty lines for spacing
      if (!trimmed) return true;

      // Remove lines that are just image references
      if (trimmed.startsWith("![Image") || trimmed.match(/^!\[.*?\]\(.*?\)$/))
        return false;

      // Remove lines that are dates without context (like "13 hours ago", "1 day ago")
      if (trimmed.match(/^\[?\d+\s+(hour|day|week|month)s?\s+ago\]?$/i))
        return false;

      // Remove lines that are just links to other articles
      if (trimmed.match(/^###\s*\[.*?\]\(.*?\)$/)) return false;
      if (trimmed.match(/^\[.*?\]\(.*?\)$/) && trimmed.length < 100)
        return false;

      // Remove lines with multiple links (likely navigation/related articles)
      const linkCount = (trimmed.match(/\[.*?\]\(.*?\)/g) || []).length;
      if (linkCount >= 2) return false;

      // Remove lines that are mostly links (more than 60% of content)
      if (linkCount >= 1) {
        const textWithoutLinks = trimmed.replace(/\[.*?\]\(.*?\)/g, "").trim();
        const linkRatio =
          (trimmed.length - textWithoutLinks.length) / trimmed.length;
        if (linkRatio > 0.6) return false;
      }

      // Remove very short lines that aren't headers (likely labels/navigation)
      if (trimmed.length < 15 && !trimmed.startsWith("#")) return false;

      // Remove lines with "based on reports" that appear at start (often duplicates)
      if (
        trimmed.toLowerCase().startsWith("based on reports") &&
        lines.indexOf(line) < 5
      )
        return false;

      // Remove editorial markers
      if (
        trimmed.match(/^(Trusted Editorial|Editorial Process|Ad Disclosure)/i)
      )
        return false;

      // Remove common call-to-action phrases
      if (
        trimmed.match(
          /^(Read more|Click here|Learn more|Subscribe|Follow us|Share this)/i
        )
      )
        return false;

      // Remove section headers for metadata (Categories, Tags, Share)
      if (trimmed.match(/^#{1,6}\s*(Categories|Tags|Share)/i)) return false;

      // Remove URL-encoded fragments
      if (trimmed.includes("%20") && trimmed.includes(")")) return false;

      return true;
    });

    cleaned = filteredLines.join("\n");

    // Step 4: Clean up the structure
    // Remove excessive blank lines (more than 2)
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

    // Remove leading/trailing whitespace
    cleaned = cleaned.trim();

    // Step 5: Convert markdown links to plain text (keep the link text, remove the URL)
    // This preserves readability while removing distracting URLs
    cleaned = this.convertLinksToText(cleaned);

    // Step 6: Extract only the main article body (aggressive approach)
    cleaned = this.extractArticleBody(cleaned);

    return cleaned;
  }

  /**
   * Converts markdown links to plain text, keeping only the link text.
   * Example: [Bitcoin](https://example.com) becomes "Bitcoin"
   */
  private convertLinksToText(content: string): string {
    // Replace markdown links [text](url) with just the text
    return content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }

  private extractArticleBody(content: string): string {
    // Split by headers and paragraphs
    const sections = content.split(/\n(?=###?\s)/);

    const articleSections: string[] = [];
    let inArticleBody = false;

    for (const section of sections) {
      const trimmed = section.trim();

      // Skip if empty
      if (!trimmed) continue;

      // Skip sections that look like related articles or navigation
      if (
        trimmed.match(
          /^###.*?(Next Crypto|Live News|Whales Buy|Grok Predicts|Trending|Popular|Related|More Stories)/i
        )
      )
        continue;
      if (trimmed.match(/^###.*?(Crypto Oversight|State Regulators)/i))
        continue;

      // Check link density in this section
      const linkCount = (trimmed.match(/\[.*?\]\(.*?\)/g) || []).length;
      const wordCount = trimmed.split(/\s+/).length;

      // Skip sections with too many links relative to content
      if (linkCount > 3 && wordCount < 100) continue;
      if (linkCount > 5) continue;

      // Detect start of main article (usually after intro paragraph)
      if (!inArticleBody && trimmed.length > 100 && linkCount <= 2) {
        inArticleBody = true;
      }

      // Keep sections that are part of the article
      if (inArticleBody) {
        // Stop at "Featured image" or similar end markers
        if (trimmed.match(/^_?Featured image/i)) break;
        if (trimmed.match(/^\*\*Editorial Process/i)) break;
        if (trimmed.match(/^(Read more|Subscribe|Follow us|Share this)/i))
          break;

        // Stop at metadata sections
        if (trimmed.match(/^#{1,6}\s*(Categories|Tags|Share)/i)) break;

        // Skip sections that are mostly links
        if (linkCount > 0) {
          const textWithoutLinks = trimmed.replace(/\[.*?\]\(.*?\)/g, "");
          const linkRatio =
            (trimmed.length - textWithoutLinks.length) / trimmed.length;
          if (linkRatio > 0.5) continue;
        }

        articleSections.push(trimmed);
      }
    }

    // If we didn't find a good article body, return the cleaned content
    if (articleSections.length === 0) {
      return content;
    }

    return articleSections.join("\n\n");
  }

  // Alternative: Score-based extraction for when structure is unclear
  private extractMainContentByScore(content: string): string {
    const paragraphs = content.split("\n\n").filter((p) => p.trim());

    const scoredParagraphs = paragraphs.map((para) => {
      let score = 0;
      const text = para.trim();
      const wordCount = text.split(/\s+/).length;

      // Count links in this paragraph
      const linkCount = (text.match(/\[.*?\]\(.*?\)/g) || []).length;

      // Positive signals (article content)
      if (wordCount > 50) score += 5;
      if (wordCount > 100) score += 3;
      if ((text.match(/\. /g) || []).length >= 2) score += 3; // Multiple sentences
      const properWords = text.match(/[A-Z][a-z]+/g);
      if (properWords && properWords.length > 15) score += 2; // Many proper words
      if (text.includes("according to") || text.includes("reported"))
        score += 2;
      if (text.match(/^###\s+[A-Z]/)) score += 2; // Real headers
      if (text.match(/\b(announced|revealed|stated|confirmed|explained)\b/i))
        score += 1;

      // Negative signals (junk content)
      if (text.match(/^!\[Image/)) score -= 10;
      if (text.match(/^\[.*?\]\(.*?\)$/)) score -= 5; // Standalone links
      if (text.includes("Ad Disclosure") || text.includes("Editorial"))
        score -= 10;
      if (text.match(/Related Reading|Featured image|Chart:|Read more:/i))
        score -= 8;
      if (text.match(/hour ago|day ago|week ago/)) score -= 7;
      if (text.match(/BitStarz|TradingView/)) score -= 6;
      if (wordCount < 20) score -= 3;
      if (text.match(/^###.*?(Next Crypto|Whales Buy|Grok|Trending|Popular)/i))
        score -= 10;

      // Penalize metadata sections and malformed content
      if (text.match(/^#{1,6}\s*(Categories|Tags|Share)/i)) score -= 10;
      if (text.includes("%20") && text.includes(")")) score -= 10; // URL-encoded fragments

      // Penalize paragraphs with too many links
      if (linkCount >= 3) score -= 8;
      if (linkCount >= 2) score -= 4;

      // Calculate link density and penalize high density
      if (linkCount > 0) {
        const textWithoutLinks = text.replace(/\[.*?\]\(.*?\)/g, "");
        const linkDensity =
          (text.length - textWithoutLinks.length) / text.length;
        if (linkDensity > 0.5) score -= 7;
        if (linkDensity > 0.3) score -= 3;
      }

      return { text, score, wordCount };
    });

    // Keep only paragraphs with positive scores
    const mainContent = scoredParagraphs
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score) // Sort by score
      .map((p) => p.text)
      .join("\n\n");

    return mainContent || content;
  }
}

export const newsService = new NewsService(config.NEWS_API_KEY);
