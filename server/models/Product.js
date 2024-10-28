const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: String, required: true }],
  colors: [{ type: String, required: true }],
  images: [{ type: String, required: true }], // Array of image URLs
  category: {
    type: String,
    enum: ["oversized t-shirts", "tops", "regular t-shirts"],
    required: true,
  }, // Product category
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
