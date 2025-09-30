import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../types/news.types";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Unhandled error:", err);

  const errorResponse: ErrorResponse = {
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  };

  res.status(500).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    error: "Route not found",
    details: `Cannot ${req.method} ${req.path}`,
  };

  res.status(404).json(errorResponse);
};
