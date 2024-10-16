const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sizes: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    image_urls: [{ type: String, required: true }],
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
