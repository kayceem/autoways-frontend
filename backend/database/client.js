// mongooseClient.js
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/autoways_database");
    isConnected = true;
    console.log("MongoDB connected via Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
