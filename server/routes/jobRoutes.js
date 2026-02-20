const express = require("express");
const { createJob, getJobs, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", getJobs);
router.delete("/:id", protect, deleteJob);

module.exports = router;