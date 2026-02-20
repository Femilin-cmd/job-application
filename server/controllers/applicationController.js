const Application = require("../models/Application");

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
      application
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const resume = req.file ? req.file.filename : null;

    if (req.user.role !== "applicant") {
      return res.status(403).json({ message: "Only applicants can apply" });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resume
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    console.error("APPLY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getApplicationsForRecruiter = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find()
      .populate("job")
      .populate("applicant", "name email");

    res.status(200).json(applications);

  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};