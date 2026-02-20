const express = require("express");
const {
  applyToJob,
  getApplicationsForRecruiter,
  updateApplicationStatus
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, upload.single("resume"), applyToJob);
router.get("/recruiter", protect, getApplicationsForRecruiter);
router.patch("/:id", protect, updateApplicationStatus);

module.exports = router;