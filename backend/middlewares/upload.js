// backend/middlewares/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 1) تأكد من وجود المجلد public/uploads
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2) إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  },
});

// 3) فلتر القبول (صور فقط) وحد أقصى لحجم الملف
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("يُسمح بالصور فقط."), false);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 ميجا بايت كحد أقصى
});

module.exports = upload;
