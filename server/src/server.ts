import express, { Express } from "express";
import cors from "cors";
import { config } from "./config/env";
import newsRoutes from "./routes/news.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: config.CORS_ORIGIN,
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
