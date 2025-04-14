// backend/models/Agency.js
const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    licenseImage: {
      type: String, // سيحتوي على مسار الصورة أو URL
      required: true,
    },
    // حقل الحالة الخاص بطلب تسجيل الوكالة
    status: {
      type: String,
      enum: ["قيد الانتظار", "مقبولة", "مرفوضة"],
      default: "قيد الانتظار",
    },
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", agencySchema);
module.exports = Agency;
