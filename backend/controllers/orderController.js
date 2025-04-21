// backend/controllers/OrderController.js
const Order = require("../models/Order");
const User = require("../models/User");

// دالة إنشاء الطلب الجديد
const createOrder = async (req, res) => {
  try {
    // 1️⃣ جلب بيانات المستخدم من الـ JWT (req.user.id)
    const user = await User.findById(req.user.id).select("name email phone");
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // 2️⃣ قراءة الحقول التي يدخلها العميل فقط
    const { address, quantity, notes, location } = req.body;

    // 3️⃣ بناء نموذج الطلب مع حقول المستخدم
    const order = new Order({
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address, // من الواجهة الأمامية
      quantity, // من الواجهة الأمامية
      notes, // من الواجهة الأمامية (اختياري)
      location, // من الواجهة الأمامية (اختياري)
    });

    // 4️⃣ حفظ الطلب والرد على العميل
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
