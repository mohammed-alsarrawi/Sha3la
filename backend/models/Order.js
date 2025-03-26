// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  notes: { type: String, default: "" },
  location: { type: String, default: "" },
  status: { type: String, default: "pending" }, // يمكن إضافة حالة مثل "قيد الانتظار" أو "تم التوصيل"
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
