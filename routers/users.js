// routers/users.js
const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

// Regular auth routes
router.get("/", usersController.getAllUsers);
router.get("/commandes", usersController.getUserCommandes);
router.post("/commandes", usersController.createCommande);

module.exports = router;
