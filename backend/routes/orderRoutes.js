// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

// لإنشاء طلب جديد - حماية الطريق باستخدام Middleware
router.post("/order-gas", protect, OrderController.createOrder);

// لجلب كافة الطلبات - يمكنك إضافة حماية إذا كانت مطلوبة
router.get("/orders", protect, OrderController.getOrders);

// لتحديث حالة الطلب
router.put("/orders/:id", protect, OrderController.updateOrderStatus);

// **جلب طلبات المستخدم الحالي**  
router.get("/orders/me", protect, OrderController.getUserOrders);

router.delete("/orders/:id", protect, OrderController.cancelOrder);


module.exports = router;
