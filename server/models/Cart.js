const mongoose = require("mongoose");

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to Product model
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
        actualPrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { collection: "carts" } // Specifies the collection name
);

// Creating the Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
