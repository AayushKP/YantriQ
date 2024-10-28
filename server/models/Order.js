const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
        price: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    total_amount: { type: Number, required: true }, // Original total before discounts
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Failed"],
      default: "Pending",
    },
    coupon_code: { type: String, default: null },
    discount: { type: Number, default: 0 }, // Discount amount applied
    final_amount: { type: Number, required: true }, // Total after applying discounts
    order_date: { type: Date, default: Date.now },
    estimatedDeliveryDate: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5); // Estimated delivery 5 days later
        return currentDate;
      },
    },
    shipping_address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
  },
  { collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
