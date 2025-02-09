const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Get user profile (Protected)
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
