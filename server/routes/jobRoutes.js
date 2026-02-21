const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
  getJobsForRecruiter
} = require("../controllers/jobController");

// Create job
router.post("/", protect, createJob);

// Recruiter jobs (MUST be before /:id)
router.get("/recruiter", protect, getJobsForRecruiter);

// Get all jobs
router.get("/", getJobs);

// Get job by ID
router.get("/:id", getJobById);

// Delete job
router.delete("/:id", protect, deleteJob);

// Update job
router.patch("/:id", protect, updateJob);

module.exports = router;