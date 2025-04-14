const mongoose = require("mongoose");

const HeatingServiceRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // وصف إضافي أو رسالة من العميل
  message: {
    type: String,
  },
  // نوع الخدمة: استفسار - طلب معاينة - صيانة
  serviceType: {
    type: String,
    required: true,
    enum: ["استفسار", "معاينة", "صيانة"],
  },
  status: {
  type: String,
  enum: ["قيد الانتظار", "قيد التنفيذ", "منتهي", "مرفوض"],
  default: "قيد الانتظار"
},

  // تاريخ الطلب يمكن استخدامه لتحديد التاريخ المرغوب أو التاريخ الذي تم فيه الطلب
  requestedDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeatingServiceRequest",HeatingServiceRequestSchema);
