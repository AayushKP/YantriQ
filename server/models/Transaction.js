const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
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
    total_amount: { type: Number, required: true },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled", "Failed"],
      default: "Pending",
    },
    coupon_code: { type: String, default: null },
    discount: { type: Number, default: 0 },
    final_amount: { type: Number, required: true },
    transaction_date: { type: Date, default: Date.now },
    deliveryDate: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5); // Add 5 days to the current date
        return currentDate;
      },
    },
  },
  { collection: "transactions" }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
