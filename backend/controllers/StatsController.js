// backend/controllers/StatsController.js
const Agency = require("../models/Agency");
const HeatingInstallation = require("../models/HeatingServiceRequest");
const GasFillingOrder = require("../models/GasFillingOrder");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getStats = async (req, res) => {
  try {
    // بعض الإحصائيات البسيطة
    const totalAgencies = await Agency.countDocuments();
    const agencyPending = await Agency.countDocuments({
      status: "قيد الانتظار",
    });
    const agencyAccepted = await Agency.countDocuments({ status: "مقبولة" });
    const totalGasOrders = await Order.countDocuments();
    const totalHeatingOrders = await HeatingInstallation.countDocuments();
    const totalGasFillingOrders = await GasFillingOrder.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalAgencies,
      agencyPending,
      agencyAccepted,
      totalGasOrders,
      totalHeatingOrders,
      totalGasFillingOrders,
      totalUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء جلب الإحصائيات", error: error.message });
  }
};
