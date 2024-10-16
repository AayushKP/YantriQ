const mongoose = require("mongoose");

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"], // Specify roles if needed
      default: "admin",
    },
    phone: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "admins" } // Specifies the collection name
);

// Middleware to update the updatedAt field before saving
adminSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Creating the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
