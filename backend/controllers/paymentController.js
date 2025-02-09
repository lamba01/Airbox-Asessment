const Payment = require("../models/Payment");

// Process a Payment
exports.processPayment = async (req, res) => {
    try {
        const { bookingId, amount, status } = req.body;

        const payment = new Payment({ bookingId, amount, status });

        await payment.save();
        res.status(201).json({ message: "Payment processed successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Payments
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("bookingId");
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate("bookingId");
        if (!payment) return res.status(404).json({ message: "Payment not found" });

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
