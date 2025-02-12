const express = require("express");
const { check, validationResult } = require("express-validator");
const { 
    createBooking, 
    getBookings, 
    getUserBookings,
    getBookingById, 
    updateBooking, 
    deleteBooking 
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a booking (Requires Authentication)
router.post(
    "/",
    authMiddleware,
    [
        check("service", "Service name is required").not().isEmpty(),
        check("date", "Valid date is required").isISO8601(),
        check("timeSlot", "Time slot is required").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        createBooking(req, res);
    }
);

// Get all bookings for the logged-in Admin
router.get("/", authMiddleware, getBookings);

// Fetch bookings for the logged-in user
router.get("/user", authMiddleware, (req, res) => {
    getUserBookings(req, res);
});


// Get a specific booking by ID (Ensuring it belongs to the logged-in user)
router.get("/:id", authMiddleware, getBookingById);

// Update a booking
router.put("/:id", authMiddleware, updateBooking);

// Delete a booking
router.delete("/:id", authMiddleware, deleteBooking);

module.exports = router;

