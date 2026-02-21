const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  getJobById
} = require("../controllers/jobController");

router.post("/", protect, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

module.exports = router;