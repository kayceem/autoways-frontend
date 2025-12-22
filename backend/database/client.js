// mongooseClient.js
const mongoose = require("mongoose");
const logger = require('../utils/logger');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/autoways_database");
    isConnected = true;
    console.log("MongoDB connected via Mongoose");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
