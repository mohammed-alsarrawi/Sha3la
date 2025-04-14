// backend/controllers/OrderController.js
const Order = require("../models/Order");

// دالة إنشاء الطلب الجديد
const createOrder = async (req, res) => {
  try {
    // يمكن إضافة منطق للمصادقة أو التحقق من بيانات المستخدم هنا إذا لزم الأمر
    const orderData = req.body; // تأكد من أن body يحتوي على الحقول المطلوبة في موديل Order
    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ message: "تم تأكيد الطلب بنجاح!", order });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء تقديم الطلب", error: error.message });
  }
};

// دالة جلب الطلبات
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getOrders:", error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء جلب الطلبات", error: error.message });
  }
};

// دالة تحديث حالة الطلب
const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "الطلب غير موجود" });
    }
    res.status(200).json({ message: "تم تحديث الحالة", order: updatedOrder });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء تحديث الحالة", error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
