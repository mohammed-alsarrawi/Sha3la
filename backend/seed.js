// backend/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // تأكد من تثبيت مكتبة bcrypt
const dotenv = require("dotenv");

// تحميل متغيرات البيئة للوصول إلى رابط قاعدة البيانات
dotenv.config(); 

// استيراد النماذج الخاصة بك بالضبط كما هي
const User = require("./models/User");
const Agency = require("./models/Agency");
const Order = require("./models/Order");
const GasFillingOrder = require("./models/GasFillingOrder");
const HeatingServiceRequest = require("./models/HeatingServiceRequest");
const ContactMessage = require("./models/ContactMessage");
const Payment = require("./models/Payment");

const seedDatabase = async () => {
  try {
    // 1. الاتصال بقاعدة البيانات
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB. Starting database wipe and seed...");

    // 2. تنظيف قاعدة البيانات (مسح جميع البيانات القديمة)
    await User.deleteMany({});
    await Agency.deleteMany({});
    await Order.deleteMany({});
    await GasFillingOrder.deleteMany({});
    await HeatingServiceRequest.deleteMany({});
    await ContactMessage.deleteMany({});
    await Payment.deleteMany({});
    console.log("🧹 Database cleaned.");

    // تشفير كلمة المرور الافتراضية
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("12345678", salt);

    // 3. إنشاء حساب الإدارة (Admin)
    const adminUser = await User.create({
      name: "Mohammed Alsarrawi",
      email: "admin@shu3la.com",
      phone: "0790000000",
      password: hashedPassword,
      role: "admin",
      isApproved: true,
      avatar: "/default-avatar.png",
    });

    // 4. إنشاء حساب مستخدم ليمتلك الوكالة
    const agencyOwner = await User.create({
      name: "مدير الوكالة",
      email: "agency@shu3la.com",
      phone: "0791111111",
      password: hashedPassword,
      role: "agency",
      isApproved: true,
      avatar: "/default-avatar.png",
    });

    // 5. إنشاء بيانات الوكالة والموافقة عليها
    await Agency.create({
      agencyName: "وكالة الشعلة الرئيسية للغاز",
      address: "عمان، الأردن",
      phoneNumber: "0791111111",
      email: "agency@shu3la.com",
      location: "31.9539, 35.9106", // إحداثيات كمثال (String كما في النموذج)
      licenseImage: "/uploads/default-license.png",
      status: "مقبولة", // حسب الـ enum الخاص بك
    });

    console.log("🌱 Database successfully seeded!");
    console.log("------------------------------------");
    console.log("Admin Login: admin@shu3la.com | Pass: 123");
    console.log("Agency Login: agency@shu3la.com | Pass: 12345678");
    console.log("------------------------------------");

    // إنهاء العملية بنجاح
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
    process.exit(1);
  }
};

// تشغيل الدالة
seedDatabase();