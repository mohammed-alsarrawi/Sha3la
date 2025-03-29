// middlewares/upload.js
const multer = require("multer");
const path = require("path");

// تحديد مكان حفظ الملفات (الصور)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads"); // حدد المجلد الذي سيتم حفظ الصور فيه
    cb(null, uploadPath); // حدد المجلد
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // إضافة اسم فريد مع الامتداد المناسب
  },
});

// تفعيل multer مع الإعدادات
const upload = multer({ storage: storage });

module.exports = upload;
