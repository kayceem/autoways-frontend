import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "./database/client.js";
import {
  getAllData,
  refreshCache,
  getHeroImages,
  getHeroImageById,
  createHeroImage,
  updateHeroImage,
  deleteHeroImage,
  getAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getContactInfo,
  getContactInfoById,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getNewsArticles,
  getNewsArticleById,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAboutUsDetailed,
  getAboutUsDetailedById,
  createAboutUsDetailed,
  updateAboutUsDetailed,
  deleteAboutUsDetailed,
  getCSRInitiatives,
  getCSRInitiativeById,
  createCSRInitiative,
  updateCSRInitiative,
  deleteCSRInitiative,
  getCSRHero,
  getCSRHeroById,
  createCSRHero,
  updateCSRHero,
  deleteCSRHero,
  getSisterCompanies,
  getSisterCompanyById,
  createSisterCompany,
  updateSisterCompany,
  deleteSisterCompany,
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
  getSparePartsServices,
  getSparePartsServiceById,
  createSparePartsService,
  updateSparePartsService,
  deleteSparePartsService,
  getSparePartsStats,
  getSparePartsStatsById,
  createSparePartsStats,
  updateSparePartsStats,
  deleteSparePartsStats,
  getSparePartsContact,
  getSparePartsContactById,
  createSparePartsContact,
  updateSparePartsContact,
  deleteSparePartsContact
} from "./database/interface.js";

let dbConnected = false;

try {
  await connectDB();
  dbConnected = true;
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exit(1);
}

const app = express();

// ---------- MIDDLEWARE ----------
// Security headers - configure helmet to allow Vite assets
app.use(helmet({ contentSecurityPolicy: false }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || [
      "http://192.168.1.87:5000",
      "http://192.168.1.87:3000",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
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
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: dbConnected ? "connected" : "disconnected",
  });
});

// Get all data (cached or from DB)
router.get("/data", getAllData);
router.post("/data/refresh", refreshCache);

// Hero Images routes
router.get("/hero-images", getHeroImages);
router.get("/hero-images/:id", getHeroImageById);
router.post("/hero-images", createHeroImage);
router.patch("/hero-images/:id", updateHeroImage);
router.delete("/hero-images/:id", deleteHeroImage);

// About Us routes
router.get("/about-us", getAboutUs);
router.get("/about-us/:id", getAboutUsById);
router.post("/about-us", createAboutUs);
router.patch("/about-us/:id", updateAboutUs);
router.delete("/about-us/:id", deleteAboutUs);

// Contact Info routes
router.get("/contact-info", getContactInfo);
router.get("/contact-info/:id", getContactInfoById);
router.post("/contact-info", createContactInfo);
router.patch("/contact-info/:id", updateContactInfo);
router.delete("/contact-info/:id", deleteContactInfo);

// Location routes
router.get("/locations", getLocations);
router.get("/locations/:id", getLocationById);
router.post("/locations", createLocation);
router.patch("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

// Product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Brand routes
router.get("/brands", getBrands);
router.get("/brands/:id", getBrandById);
router.post("/brands", createBrand);
router.patch("/brands/:id", updateBrand);
router.delete("/brands/:id", deleteBrand);

// Partner routes
router.get("/partners", getPartners);
router.get("/partners/:id", getPartnerById);
router.post("/partners", createPartner);
router.patch("/partners/:id", updatePartner);
router.delete("/partners/:id", deletePartner);

// Client routes
router.get("/clients", getClients);
router.get("/clients/:id", getClientById);
router.post("/clients", createClient);
router.patch("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

// News Article routes
router.get("/news-articles", getNewsArticles);
router.get("/news-articles/:id", getNewsArticleById);
router.post("/news-articles", createNewsArticle);
router.patch("/news-articles/:id", updateNewsArticle);
router.delete("/news-articles/:id", deleteNewsArticle);

// Testimonial routes
router.get("/testimonials", getTestimonials);
router.get("/testimonials/:id", getTestimonialById);
router.post("/testimonials", createTestimonial);
router.patch("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

// About Us Detailed routes
router.get("/about-us-detailed", getAboutUsDetailed);
router.get("/about-us-detailed/:id", getAboutUsDetailedById);
router.post("/about-us-detailed", createAboutUsDetailed);
router.patch("/about-us-detailed/:id", updateAboutUsDetailed);
router.delete("/about-us-detailed/:id", deleteAboutUsDetailed);

// CSR Initiative routes
router.get("/csr-initiatives", getCSRInitiatives);
router.get("/csr-initiatives/:id", getCSRInitiativeById);
router.post("/csr-initiatives", createCSRInitiative);
router.patch("/csr-initiatives/:id", updateCSRInitiative);
router.delete("/csr-initiatives/:id", deleteCSRInitiative);

// CSR Hero routes
router.get("/csr-hero", getCSRHero);
router.get("/csr-hero/:id", getCSRHeroById);
router.post("/csr-hero", createCSRHero);
router.patch("/csr-hero/:id", updateCSRHero);
router.delete("/csr-hero/:id", deleteCSRHero);

// Sister Company routes
router.get("/sister-companies", getSisterCompanies);
router.get("/sister-companies/:id", getSisterCompanyById);
router.post("/sister-companies", createSisterCompany);
router.patch("/sister-companies/:id", updateSisterCompany);
router.delete("/sister-companies/:id", deleteSisterCompany);

// Spare Part routes
router.get("/spare-parts", getSpareParts);
router.get("/spare-parts/:id", getSparePartById);
router.post("/spare-parts", createSparePart);
router.patch("/spare-parts/:id", updateSparePart);
router.delete("/spare-parts/:id", deleteSparePart);

// Spare Parts Service routes
router.get("/spare-parts-services", getSparePartsServices);
router.get("/spare-parts-services/:id", getSparePartsServiceById);
router.post("/spare-parts-services", createSparePartsService);
router.patch("/spare-parts-services/:id", updateSparePartsService);
router.delete("/spare-parts-services/:id", deleteSparePartsService);

// Spare Parts Stats routes
router.get("/spare-parts-stats", getSparePartsStats);
router.get("/spare-parts-stats/:id", getSparePartsStatsById);
router.post("/spare-parts-stats", createSparePartsStats);
router.patch("/spare-parts-stats/:id", updateSparePartsStats);
router.delete("/spare-parts-stats/:id", deleteSparePartsStats);

// Spare Parts Contact routes
router.get("/spare-parts-contact", getSparePartsContact);
router.get("/spare-parts-contact/:id", getSparePartsContactById);
router.post("/spare-parts-contact", createSparePartsContact);
router.patch("/spare-parts-contact/:id", updateSparePartsContact);
router.delete("/spare-parts-contact/:id", deleteSparePartsContact);

// Mount router
app.use("/api", router);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

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
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received, starting graceful shutdown...`);

  server.close(async () => {
    console.log("HTTP server closed");

    try {
      // Close database connection
      await mongoose.connection.close();
      console.log("Database connection closed");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 30000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

export default app;