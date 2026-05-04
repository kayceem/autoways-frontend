require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./database/client.js");
const logger = require("./utils/logger.js");
const authRoutes = require("./routes/authRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const logsRoutes = require("./routes/logsRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");
const { getAllData } = require("./database/interface.js");

let dbConnected = false;

// Async startup function to handle database connection
async function startServer() {
  try {
    await connectDB();
    dbConnected = true;
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed:", { error: error.message, stack: error.stack });
    process.exit(1);
  }

  const app = express();

  // ---------- MIDDLEWARE ----------
  // Compression middleware
  app.use(compression());

  // Security headers - configure helmet to allow Vite assets
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: true
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100, // Limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // Apply rate limiting to all API routes
//   app.use("/api", limiter);

  // CORS configuration
  const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
  app.use(
    cors({
        origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
        },
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Body parser
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));

  // Request logging middleware with timing
  app.use((req, res, next) => {
    const startTime = Date.now();

    // Log request start
    logger.debug(`${req.method} ${req.path} - Request started`, {
      ip: req.ip,
      userAgent: req.get('user-agent')
    });

    // Capture response finish
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      logger.logRequest(req, res, duration);
    });

    next();
  });

  // Database health check middleware
  app.use((req, res, next) => {
    if (!dbConnected) {
      return res.status(503).json({
        success: false,
        error: "Service unavailable - database not connected",
      });
    }
    next();
  });

  // ---------- UTILITY FUNCTIONS ----------
  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  const parseBoolean = (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  };

  const parsePaginationParams = (query) => {
    const limit = parseInt(query.limit);
    const skip = parseInt(query.skip || query.offset);
    const page = parseInt(query.page);

    const result = {};

    if (!isNaN(limit) && limit > 0 && limit <= 100) {
      result.limit = limit;
    }

    if (!isNaN(skip) && skip >= 0) {
      result.skip = skip;
    } else if (!isNaN(page) && page > 0 && result.limit) {
      result.skip = (page - 1) * result.limit;
    }

    return result;
  };

  // ---------- ROUTES ----------

  // Health check - public
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: dbConnected ? "connected" : "disconnected",
    });
  });

  // Get all data - public (cached data for frontend)
  app.get("/api/data", getAllData);

  // Auth routes - public (login)
  app.use("/api/auth", authRoutes);

  // Contact routes - public (contact form submission)
  app.use("/api/contact", contactRoutes);

  
  // Logs routes - protected by auth middleware
  app.use("/api/logs", logsRoutes);
  
  // Static assets with cache headers
  // Files use content-based fingerprinting (e.g., image.a3f2b1c4.webp)
  // so immutable caching is safe - new content = new filename
  const assetsPath = path.join(__dirname, "assets");
  app.use("/api/assets", express.static(assetsPath, {
      etag: false,           // Not needed with fingerprinted filenames
      lastModified: false,   // Not needed with fingerprinted filenames
      maxAge: '1y',          // Cache for 1 year
      immutable: true        // Safe because filenames change with content
    }));
    
  // Protected routes - requires admin authentication
  app.use("/api", protectedRoutes);
  // ---------- ERROR HANDLING ----------

  // Global error handler
  app.use((err, req, res, next) => {
    logger.error("Application error", {
      error: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip
    });

    // Handle specific error types
    if (err.name === "NotFoundError") {
      return res.status(404).json({
        success: false,
        error: err.message,
      });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: err.message,
        details: err.errors,
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format",
      });
    }

    if (err.name === "MongoServerError" && err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Duplicate entry",
        field: Object.keys(err.keyPattern)[0],
      });
    }

    // Generic error response
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      error: err.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });

  // ---------- SERVER STARTUP ----------
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`, {
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version
    });
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal) => {
    logger.info(`${signal} received, starting graceful shutdown...`);

    server.close(async () => {
      logger.info("HTTP server closed");

      try {
        // Close database connection
        await mongoose.connection.close();
        logger.info("Database connection closed");
        process.exit(0);
      } catch (error) {
        logger.error("Error during shutdown", { error: error.message, stack: error.stack });
        process.exit(1);
      }
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 30000);
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  // Handle uncaught errors
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception", { error: error.message, stack: error.stack });
    gracefulShutdown("UNCAUGHT_EXCEPTION");
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection", { reason, promise: promise.toString() });
    gracefulShutdown("UNHANDLED_REJECTION");
  });

  return app;
}

// Start the server
startServer().catch((error) => {
  logger.error("Failed to start server", { error: error.message, stack: error.stack });
  process.exit(1);
});

module.exports = startServer;
