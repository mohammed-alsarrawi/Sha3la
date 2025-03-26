const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // تحميل متغيرات البيئة في البداية
const cors = require("cors");
const cookieParser = require("cookie-parser");
const orderRoutes = require('./routes/orderRoutes'); // استيراد الـ route
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

// تعريف التطبيق بعد تحميل المتغيرات
const app = express();

// إعدادات CORS
app.use(
  cors({
    origin: "http://localhost:5173", // تأكد من أن هذا هو عنوان الواجهة الأمامية
    credentials: true, // للسماح بإرسال الكوكيز مع الطلبات
  })
);

app.use(express.json());
app.use(cookieParser()); // استخدام الكوكيز

// ربط الروتات (Auth & Protected routes)
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api", orderRoutes);
// الاتصال بقاعدة البيانات وتشغيل السيرفر
mongoose
  .connect(process.env.MONGO_URI) // تأكد من أنك قد حددت MONGO_URI في ملف .env
  .then(() => {
    app.listen(5000, () => {
      console.log("✅ Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1); // إنهاء العملية إذا فشل الاتصال بقاعدة البيانات
  });
