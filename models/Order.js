const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName:  { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, default: "" },
  items: [
    {
      productId: { type: Number, required: true },
      name:      { type: String, required: true },
      price:     { type: Number, required: true },
      qty:       { type: Number, required: true },
      img:       { type: String, default: "" }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "delivered", "cancelled"]
  },
  address:   { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);