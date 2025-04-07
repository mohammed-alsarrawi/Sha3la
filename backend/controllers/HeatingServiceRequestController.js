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
    res.status(500).json({
      message: "حدث خطأ أثناء تقديم الطلب",
      error: error.message,
    });
  }
};

// استرجاع جميع طلبات الخدمة
exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await HeatingServiceRequest.find();
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({
      message: "حدث خطأ أثناء جلب الطلبات",
      error: error.message,
    });
  }
};
