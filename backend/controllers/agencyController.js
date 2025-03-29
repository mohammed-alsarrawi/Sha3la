// controllers/agencyController.js
const Agency = require("../models/Agency"); // استيراد الـ Model

// دالة لتسجيل الوكالة
const registerAgency = async (req, res) => {
  const { agencyName, address, phoneNumber, email, location } = req.body;
  const licenseImage = req.file ? req.file.path : null; // الحصول على مسار صورة الترخيص

  try {
    console.log("Received data:", req.body); // طباعة البيانات التي يتم إرسالها
    console.log("Received file:", req.file); // طباعة الملف المرفوع

    // إنشاء وكالة جديدة باستخدام الـ Model
    const newAgency = new Agency({
      agencyName,
      address,
      phoneNumber,
      email,
      location,
      licenseImage, // إضافة مسار صورة الترخيص
    });

    // حفظ الوكالة في قاعدة البيانات
    await newAgency.save();

    res.status(201).json({ message: "تم تسجيل الوكالة بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تسجيل الوكالة", error });
  }
};

module.exports = { registerAgency };
