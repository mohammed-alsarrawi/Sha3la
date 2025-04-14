// backend/models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // ربط الطلب بالمستخدم
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  notes: { type: String },
  location: { type: String },
  status: { type: String, default: "قيد الانتظار" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
