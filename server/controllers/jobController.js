const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, company, description, skills, location, expiryDate } = req.body;

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
      expiryDate,
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

exports.getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { company: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { skills: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const jobs = await Job.find(keyword).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found or not authorized" });
    }

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error("RECRUITER JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};