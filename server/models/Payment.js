const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // References the Order model
      required: true,
    },
    payment_method: {
      type: String,
      required: true, // Required field to specify the payment method (e.g., Credit Card, PayPal)
    },
    amount: {
      type: Number,
      required: true, // Required field for the payment amount
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"], // Possible payment statuses
      default: "Pending", // Default status is 'Pending'
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "payments" }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
