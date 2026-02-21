const Application = require("../models/Application");
const Job = require("../models/Job");


// ================= UPDATE APPLICATION STATUS =================
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= APPLY TO JOB =================
exports.applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "applicant") {
      return res.status(403).json({ message: "Only applicants can apply" });
    }

    const { jobId } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    //  Prevent duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    //  Check expiry
    if (job.expiryDate && new Date() > job.expiryDate) {
      return res
        .status(400)
        .json({ message: "Job application deadline passed" });
    }

    const resume = req.file ? req.file.filename : null;

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET APPLICATIONS FOR APPLICANT =================
exports.getApplicationsForApplicant = async (req, res) => {
  try {
    if (req.user.role !== "applicant") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("GET APPLICANT APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET APPLICATIONS FOR RECRUITER =================
exports.getApplicationsForRecruiter = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { jobId } = req.query;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your job" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("RECRUITER APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};