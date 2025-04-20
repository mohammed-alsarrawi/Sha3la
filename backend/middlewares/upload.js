// backend/middlewares/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 1) تأكد أنّ مجلد uploads موجود، وإن لم يكن قم بإنشائه:
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2) إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // نحفظ كل الصور في public/uploads
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // نستخدم fieldname و timestamp و الامتداد الأصلي
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// 3) فلتر للنوع (قبول الصور فقط)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("الملف ليس صورة"), false);
  }
};

// 4) صدّر multer المكوَّن
const upload = multer({ storage, fileFilter });
module.exports = upload;
