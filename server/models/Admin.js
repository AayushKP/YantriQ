const mongoose = require("mongoose");

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "admins" }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
