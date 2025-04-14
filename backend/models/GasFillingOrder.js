// backend/models/GasFillingOrder.js
const mongoose = require("mongoose");

const GasFillingOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,

  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 200, // الحد الأدنى 200 لتر للتوصيل المجاني
  },
  date: {
    type: Date,
    required: true,
  },
  timePreference: {
    type: String,
    enum: ["صباحية", "مسائية"],
    required: true,
  },
  status: {
    type: String,
    default: "قيد الانتظار",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ["نقدي", "تحويل بنكي"],
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("GasFillingOrder", GasFillingOrderSchema);
