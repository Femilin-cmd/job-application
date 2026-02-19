const express = require("express");
const { createJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);

module.exports = router;
