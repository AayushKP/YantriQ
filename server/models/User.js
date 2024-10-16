const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zip_code: { type: String, required: true },
      },
    ],
    contact_number: { type: String, required: true },
    transaction_ids: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
