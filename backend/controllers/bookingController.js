const mongoose = require("mongoose");
const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
      const { service, timeSlot, price, date } = req.body;
      const user = req.user?.id || req.body.user; // Get user ID from token or request body

    // Check if the user already booked this date
    const existingBooking = await Booking.findOne({ user, date });
    if (existingBooking) {
      return res.status(400).json({ message: "You already have a booking on this date." });
    }
  
      if (!price || !user) {
        return res.status(400).json({ message: "Price and user are required" });
      }
  
      const newBooking = await Booking.create({ service, timeSlot, price, date, user });
  
      res.status(201).json(newBooking);
    } catch (error) {
      console.error("Booking Error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// get all bookings
exports.getBookings = async (req, res) => {
    try {
        let bookings;

        if (req.user.role === "admin") {
            // Admin gets all bookings
            bookings = await Booking.find().populate("user", "name");
        } else {
            // Regular users get only their bookings
            bookings = await Booking.find({ user: req.user.id }).populate("user", "name");
        }

        res.json({ bookings, role: req.user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Get Booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Ensure the logged-in user owns the booking
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this booking" });
        }

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Get all bookings for a specific user
exports.getUserBookings = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const bookings = await Booking.find({ user: userId }).populate("user", "name");

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// Update Booking
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

        res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
