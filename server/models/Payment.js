const paymentSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    payment_method: { type: String, required: true },
    amount: { type: Number, required: true },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    payment_date: { type: Date, default: Date.now },
  },
  { collection: "payments" }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
