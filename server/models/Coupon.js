const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    discount_value: { type: Number, required: true },
  },
  { collection: "coupons" }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
