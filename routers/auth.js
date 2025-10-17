// routers/auth.js
const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Regular auth routes
router.post("/", authController.login);

module.exports = router;
