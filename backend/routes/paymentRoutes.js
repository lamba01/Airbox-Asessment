const express = require("express");
const { processPayment, getPayments, getPaymentById } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Process a new payment
router.post("/", authMiddleware, processPayment);

// Get all payments
router.get("/", authMiddleware, getPayments);

// Get a specific payment by ID
router.get("/:id", authMiddleware, getPaymentById);

module.exports = router;
