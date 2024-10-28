const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [
      {
        street: { type: String, default: null }, // Initialize with null
        city: { type: String, default: null }, // Initialize with null
        zip_code: { type: String, default: null }, // Initialize with null
      },
    ],
    gender: { type: String, default: null }, // Initialize with null
    contact_number: { type: String, default: null }, // Initialize with null
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }, // Initialize with null
    ],
    profileSetup: { type: Boolean, default: false },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", default: null }, // Initialize with null
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
