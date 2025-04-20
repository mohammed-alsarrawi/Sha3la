// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config(); // تحميل متغيرات البيئة في البداية
const cors = require("cors");
const cookieParser = require("cookie-parser");


// Import routes
const orderRoutes = require("./routes/orderRoutes"); // استيراد الـ route
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const heatingServiceRequestRoutes = require("./routes/heatingServiceRequestRoutes");
const statsRoutes = require("./routes/statsRoutes");
const gasFillingOrderRoutes = require("./routes/gasFillingOrderRoutes");
const userRoutes = require("./routes/userRoutes");

// تعريف التطبيق بعد تحميل المتغيرات
const app = express();

// إعدادات CORS
app.use(
  cors({
    origin: "http://localhost:5173", // تأكد من أن هذا هو عنوان الواجهة الأمامية
credentials: true, // للسماح بإرسال الكوكيز مع الطلبات
  })
);

const fs = require("fs");
const path = require("path");

// مسار المجلد الذي سيتم حفظ الملفات فيه
const uploadDir = path.join(__dirname, "uploads");

// التحقق مما إذا كان المجلد موجودًا
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // إذا لم يكن موجودًا، أنشئه
}

// إعداد مسار التخزين للملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // حفظ الملفات في مجلد uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // تحديد اسم الملف (يمكنك تخصيصه حسب احتياجك)
  },
});

// إعداد multer باستخدام storage
const upload = multer({ storage });

app.use(express.json());
app.use(cookieParser()); // استخدام الكوكيز

// ربط الروتات (Auth & Protected routes)
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api", orderRoutes);
app.use("/api", agencyRoutes);
app.use("/api", heatingServiceRequestRoutes);
app.use("/api", statsRoutes);
app.use("/api/gas-filling-orders", gasFillingOrderRoutes);
app.use("/api", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
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
