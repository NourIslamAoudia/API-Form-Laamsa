const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/allorders", adminController.getAllOrders);
router.get("/order/:id", adminController.getOrderById);
router.put("/order/:id/status", adminController.updateOrderStatus);
router.delete("/order/:id", adminController.deleteOrder);

module.exports = router;
