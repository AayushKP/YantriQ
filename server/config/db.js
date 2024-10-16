import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

// Function to connect to the database
const connectDB = async () => {
  try {
    const connection = mongoose.createConnection(`${uri}/YantriQ`, {});
    console.log("Connected to YantriQ's database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
