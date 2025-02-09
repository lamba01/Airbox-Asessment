const express = require("express");
const { createBooking, getBookings, getBookingById, updateBooking, deleteBooking } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a booking
router.post("/", authMiddleware, createBooking);

// Get all bookings
router.get("/", authMiddleware, getBookings);

// Get a specific booking by ID
router.get("/:id", authMiddleware, getBookingById);

// Update a booking
router.put("/:id", authMiddleware, updateBooking);

// Delete a booking
router.delete("/:id", authMiddleware, deleteBooking);

module.exports = router;
