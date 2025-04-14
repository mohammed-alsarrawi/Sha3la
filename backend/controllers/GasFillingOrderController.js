// backend/controllers/GasFillingOrderController.js
const GasFillingOrder = require("../models/GasFillingOrder");
const User = require("../models/User");

// دالة إنشاء طلب تعبئة تنكات الغاز باستخدام بيانات المستخدم المسجل
const createGasFillingOrder = async (req, res) => {
  try {
   console.log(req.body)
    const {
      street,
      phone,
      area,
      date,
      timePreference,
      quantity,
    } = req.body;
    const address = `${street}, ${area}`;

    // التأكد من وجود بيانات المستخدم من الـ req.user (يجب أن يضعها middleware protect)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "يجب تسجيل الدخول لتقديم الطلب" });
    }

    // استرجاع بيانات المستخدم من قاعدة البيانات
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // تجهيز بيانات الطلب باستخدام بيانات المستخدم المُسجلة والبيانات المُدخلة في الفورم
    const orderData = {
      userId: user._id,
      fullName: user.name,
      email: user.email,
      phone: phone,
      
      address: address,
      date: date,
      timePreference: timePreference,
      quantity: quantity,
      // paymentMethod: إذا أردت استخدام قيمة افتراضية، على سبيل المثال:
      paymentMethod: "نقدي",
      // status و createdAt ستُضبط تلقائياً بناءً على المخطط
    };

    const newOrder = new GasFillingOrder(orderData);
    await newOrder.save();
    res.status(201).json({
      message: "تم تقديم طلب تعبئة تنكات الغاز بنجاح",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error in createGasFillingOrder:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تقديم الطلب",
      error: error.message,
    });
  }
};

// دالة لجلب جميع طلبات تعبئة تنكات الغاز
const getGasFillingOrders = async (req, res) => {
  try {
    const orders = await GasFillingOrder.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getGasFillingOrders:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب طلبات تعبئة تنكات الغاز",
      error: error.message,
    });
  }
};

// دالة لتحديث حالة طلب تعبئة تنكات الغاز
const updateGasFillingOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await GasFillingOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "طلب تعبئة تنكات الغاز غير موجود" });
    }
    res.status(200).json({ message: "تم تحديث الحالة", order: updatedOrder });
  } catch (error) {
    console.error("Error in updateGasFillingOrderStatus:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تحديث حالة الطلب",
      error: error.message,
    });
  }
};

// دالة لحذف طلب تعبئة تنكات الغاز (اختياري)
const deleteGasFillingOrder = async (req, res) => {
  try {
    const deletedOrder = await GasFillingOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: "طلب تعبئة تنكات الغاز غير موجود" });
    }
    res.status(200).json({ message: "تم حذف طلب تعبئة تنكات الغاز" });
  } catch (error) {
    console.error("Error in deleteGasFillingOrder:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء حذف الطلب",
      error: error.message,
    });
  }
};

module.exports = {
  createGasFillingOrder,
  getGasFillingOrders,
  updateGasFillingOrderStatus,
  deleteGasFillingOrder,
};
