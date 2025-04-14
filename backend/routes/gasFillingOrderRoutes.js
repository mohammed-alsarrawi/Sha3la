const express = require("express");
const router = express.Router();
const {
  createGasFillingOrder,
  getGasFillingOrders,
  updateGasFillingOrderStatus,
  deleteGasFillingOrder,
} = require("../controllers/GasFillingOrderController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// إزالة "/gas-filling-orders" من هنا لأنها ستأتي من app.use
router.post("/", protect, createGasFillingOrder);
router.get("/", protect, getGasFillingOrders);
router.put("/:id", protect, updateGasFillingOrderStatus);
router.delete("/:id", protect, deleteGasFillingOrder);

module.exports = router;
