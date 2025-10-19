// routers/auth.js
const express = require("express");
const authController = require("../controllers/authController");
const { validateLogin } = require("../midleware/validation-middleware");
const router = express.Router();

// Regular auth routes
router.post("/", validateLogin, authController.login);

module.exports = router;
