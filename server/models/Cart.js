const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        size: { type: String, required: true }, // Size of the product
        color: { type: String, required: true }, // Color of the product
        price: { type: Number, required: true }, // Price at the time of adding to cart
      },
    ],
    total_price: { type: Number, required: true }, // Total price of items in the cart
    updated_at: { type: Date, default: Date.now }, // Last updated time
  },
  { collection: "carts" }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
