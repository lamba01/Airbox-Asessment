const Booking = require("../models/Booking");

// Create a Booking
exports.createBooking = async (req, res) => {
    try {
        const { service, date, time, customerName, customerEmail, status } = req.body;

        const booking = new Booking({
            service,
            date,
            time,
            customerName,
            customerEmail,
            status
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.json(booking);
    } catch (error) {
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
