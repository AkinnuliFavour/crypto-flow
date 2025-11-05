import express, { Express } from "express";
import cors from "cors";
import { config } from "./config/env";
import newsRoutes from "./routes/news.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app: Express = express();

// Middleware
// Allow comma-separated list of origins in ALL environments
const allowedOrigins = config.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 1 ? allowedOrigins : allowedOrigins[0],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/news", newsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`📰 Environment: ${config.NODE_ENV}`);
  console.log(`🌐 CORS origin: ${config.CORS_ORIGIN}`);
});

export default app;
