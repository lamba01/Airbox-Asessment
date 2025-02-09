const express = require("express");
const { getDashboardMetrics } = require("../controllers/dashboardController");
const authMiddleware  = require("../middleware/authMiddleware"); 
const router = express.Router();

router.get("/metrics", authMiddleware, getDashboardMetrics);

module.exports = router;
