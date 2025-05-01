// backend/controllers/agencyController.js
const Agency = require("../models/Agency");

// دالة تسجيل وكالة جديدة
// const registerAgency = async (req, res) => {
//   const { agencyName, address, phoneNumber, email, location } = req.body;
//   const licenseImage = req.file ? req.file.path : null;
//   console.log(req.body);
//   try {
//     console.log("Received data:", req.body);
//     console.log("Received file:", req.file);
//     const newAgency = new Agency({
//       agencyName,
//       address,
//       phoneNumber,
//       email,
//       location,
//       licenseImage,
//       // الحالة افتراضية "قيد الانتظار"
//     });
//     await newAgency.save();
//     res.status(201).json({ message: "تم تسجيل الوكالة بنجاح" });
//   } catch (error) {
//     console.error("Error in registerAgency:", error);
//     res
//       .status(500)
//       .json({ message: "حدث خطأ أثناء تسجيل الوكالة", error: error.message });
//   }
// };
const registerAgency = async (req, res) => {
  const { agencyName, address, phoneNumber, email, location } = req.body;

  // 1) الصورة مطلوبة
  if (!req.file) {
    return res.status(400).json({ message: "الصورة الترخيصية مطلوبة" });
  }

  // 2) خزن فقط اسم الملف، لا المسار الكامل
  const licenseImage = req.file.filename;

  try {
    // 3) تفادي تكرار البريد
    const exists = await Agency.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });
    }

    const newAgency = new Agency({
      agencyName,
      address,
      phoneNumber,
      email,
      location,
      licenseImage, // <-- هنا اسم الملف فقط
      status: "قيد الانتظار",
    });

    await newAgency.save();
    res.status(201).json({ message: "تم تسجيل الوكالة بنجاح" });
  } catch (error) {
    console.error("Error in registerAgency:", error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء تسجيل الوكالة", error: error.message });
  }
};
// دالة لجلب طلبات تسجيل الوكالات
const getAgencyRequests = async (req, res) => {
  try {
    const requests = await Agency.find().sort({ createdAt: -1 }).lean();
    console.log(requests);
    res.status(200).json({ requests });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "حدث خطأ أثناء جلب طلبات الوكالات",
        error: error.message,
      });
  }
};

// دالة لتحديث حالة طلب تسجيل الوكالة
const updateAgencyStatus = async (req, res) => {
  try {
    const updatedAgency = await Agency.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedAgency) {
      return res.status(404).json({ message: "الوكالة غير موجودة" });
    }
    res.status(200).json({ message: "تم تحديث الحالة", agency: updatedAgency });
  } catch (error) {
    console.error("Error in updateAgencyStatus:", error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء تحديث الحالة", error: error.message });
  }
};

module.exports = {
  registerAgency,
  getAgencyRequests,
  updateAgencyStatus,
};
