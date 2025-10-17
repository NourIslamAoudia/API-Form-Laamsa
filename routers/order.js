// routers/users.js
const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

// Regular auth routes

router.post("/", orderController.createCommande);

module.exports = router;
