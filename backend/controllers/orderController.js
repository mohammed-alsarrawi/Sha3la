// controllers/orderController.js
const Order = require("../models/Order"); // استيراد الـ Model

// دالة لمعالجة الطلبات الجديدة
const createOrder = async (req, res) => {
  const { quantity, address, contact, paymentMethod, notes, location } =
    req.body;

  // التحقق من وجود البيانات المطلوبة
  if (!quantity || !address || !contact || !paymentMethod) {
    return res.status(400).json({ message: "يرجى ملء كافة الحقول المطلوبة" });
  }

  try {
    // إنشاء الطلب في قاعدة البيانات
    const newOrder = new Order({
      quantity,
      address,
      contact,
      paymentMethod,
      notes,
      location,
    });

    // حفظ الطلب في قاعدة البيانات
    await newOrder.save();

    // إرجاع استجابة للمستخدم
    return res.status(201).json({
      message: "تم تقديم الطلب بنجاح",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "حدث خطأ أثناء تقديم الطلب", error: error.message });
  }
};

// تصدير الدالة
module.exports = { createOrder };
