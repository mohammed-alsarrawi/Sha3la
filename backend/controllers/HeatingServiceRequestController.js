// backend/controllers/HeatingServiceRequestController.js
const HeatingServiceRequest = require("../models/HeatingServiceRequest");

// إنشاء طلب خدمة جديد (استفسار، معاينة، أو صيانة)
exports.createServiceRequest = async (req, res) => {
  try {
    const newRequest = new HeatingServiceRequest(req.body);
    await newRequest.save();
    res.status(201).json({
      message: "تم تقديم طلب الخدمة بنجاح",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error in createServiceRequest:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تقديم الطلب",
      error: error.message,
    });
  }
};

// استرجاع جميع طلبات الخدمة مع ترتيب حسب تاريخ الإنشاء
exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await HeatingServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error in getServiceRequests:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء جلب الطلبات",
      error: error.message,
    });
  }
};

// دالة لتحديث حالة طلب الخدمة
exports.updateServiceRequest = async (req, res) => {
  try {
    const updatedRequest = await HeatingServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "طلب الخدمة غير موجود" });
    }
    res
      .status(200)
      .json({ message: "تم تحديث حالة الطلب", request: updatedRequest });
  } catch (error) {
    console.error("Error in updateServiceRequest:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء تحديث حالة الطلب",
      error: error.message,
    });
  }
};

// دالة لحذف طلب الخدمة (اختياري)
exports.deleteServiceRequest = async (req, res) => {
  try {
    const deletedRequest = await HeatingServiceRequest.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRequest) {
      return res.status(404).json({ message: "طلب الخدمة غير موجود" });
    }
    res.status(200).json({ message: "تم حذف طلب الخدمة" });
  } catch (error) {
    console.error("Error in deleteServiceRequest:", error);
    res.status(500).json({
      message: "حدث خطأ أثناء حذف طلب الخدمة",
      error: error.message,
    });
  }
};
