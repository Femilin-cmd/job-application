const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, company, description, skills, location } = req.body;

    // only recruiter can create job
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const job = await Job.create({
      title,
      company,
      description,
      skills,
      location,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
