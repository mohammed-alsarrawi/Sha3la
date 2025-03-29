// models/Agency.js
const mongoose = require("mongoose");

// تعريف الـ Schema للوكالة
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
      type: String, // سيكون مسار الصورة المخزنة في المجلد
      required: true,
    },
  },
  { timestamps: true } // لتسجيل وقت الإنشاء والتحديث
);

// إنشاء الـ Model
const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;
