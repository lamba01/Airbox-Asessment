const express = require("express");
const { getDashboardMetrics } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware"); // Ensure only admins can access
const router = express.Router();

router.get("/metrics", protect, getDashboardMetrics);

module.exports = router;
