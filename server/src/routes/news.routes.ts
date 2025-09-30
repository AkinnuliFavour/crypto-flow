import { Router, Request, Response } from "express";
import { newsService } from "../services/news.services";
import { ErrorResponse, ArticleDetailsResponse } from "../types/news.types";

const router = Router();

// Get crypto news headlines
router.get("/crypto", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    // Validate pagination parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      const errorResponse: ErrorResponse = {
        error: "Invalid pagination parameters",
        details: "Page must be >= 1 and pageSize must be between 1 and 100",
      };
      return res.status(400).json(errorResponse);
    }

    const data = await newsService.getCryptoNews(page, pageSize);
    res.json(data);
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    const errorResponse: ErrorResponse = {
      error: "Failed to fetch crypto news",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
});

// Search news with custom query
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    if (!query) {
      const errorResponse: ErrorResponse = {
        error: 'Query parameter "q" is required',
      };
      return res.status(400).json(errorResponse);
    }

    const data = await newsService.searchNews(query, page, pageSize);
    res.json(data);
  } catch (error) {
    console.error("Error searching news:", error);
    const errorResponse: ErrorResponse = {
      error: "Failed to search news",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
});

// Get article details
router.get("/article", async (req: Request, res: Response) => {
  try {
    const articleUrl = req.query.url as string;

    if (!articleUrl) {
      const errorResponse: ErrorResponse = {
        error: "URL parameter is required",
      };
      return res.status(400).json(errorResponse);
    }

    const articleDetails = await newsService.getArticleDetails(articleUrl);

    const response: ArticleDetailsResponse = {
      message: "Article details",
      url: articleUrl,
      article: articleDetails || undefined,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching article details:", error);
    const errorResponse: ErrorResponse = {
      error: "Failed to fetch article details",
      details: error instanceof Error ? error.message : "Unknown error",
    };
    res.status(500).json(errorResponse);
  }
});

export default router;
