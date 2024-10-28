const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

// Function to connect to the database
const connectDB = async () => {
  try {
    // Use mongoose.connect instead of createConnection
    await mongoose.connect(`${uri}`);
    console.log("Connected to YantriQ's database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Use module.exports for export in Node.js
module.exports = connectDB;
