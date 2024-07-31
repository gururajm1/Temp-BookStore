// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/bookController");

// Route for user signup
router.post("/signup", userController.signUpUser);

module.exports = router;
