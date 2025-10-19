// routers/users.js
const express = require("express");
const orderController = require("../controllers/orderController");
const { validateCreateOrder } = require("../midleware/validation-middleware");
const router = express.Router();

// Regular auth routes

router.post("/", validateCreateOrder, orderController.createCommande);

module.exports = router;
