const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // contains id and role
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
