const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

const getDashboardMetrics = async (req, res) => {
    try {
        // Total number of bookings
        const totalBookings = await Booking.countDocuments();

        // Total revenue from payments
        const totalRevenue = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Peak booking times
        const peakTimes = await Booking.aggregate([
            { $group: { _id: "$timeSlot", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 } // Top 3 peak slots
        ]);

        res.status(200).json({
            totalBookings,
            totalRevenue: totalRevenue.length ? totalRevenue[0].total : 0,
            peakTimes
        });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving dashboard metrics", error: error.message });
    }
};

module.exports = { getDashboardMetrics };
