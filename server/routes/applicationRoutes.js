const express = require("express");

const {
  applyToJob,
  getApplicationsForRecruiter,
  updateApplicationStatus,
  getApplicationsForApplicant,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Apply to job
router.post("/", protect, upload.single("resume"), applyToJob);

// Recruiter: get applications for a job
router.get("/recruiter", protect, getApplicationsForRecruiter);

// Update status (accept/reject)
router.patch("/:id", protect, updateApplicationStatus);

// Applicant: get their applications
router.get("/applicant", protect, getApplicationsForApplicant);


module.exports = router;