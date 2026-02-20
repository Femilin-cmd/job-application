require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Server working");
});

const { protect } = require("./middleware/authMiddleware");

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
