const express = require("express");
const adminController = require("../controllers/adminController");
const {
  validateOrderId,
  validateUpdateStatus,
} = require("../midleware/validation-middleware");
const router = express.Router();

router.get("/allorders", adminController.getAllOrders);
router.get("/order/:id", validateOrderId, adminController.getOrderById);
router.put(
  "/order/:id/status",
  validateUpdateStatus,
  adminController.updateOrderStatus
);
router.delete("/order/:id", validateOrderId, adminController.deleteOrder);

module.exports = router;
