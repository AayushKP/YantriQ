const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

// Admin Authentication Middleware
exports.authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) {
      return res.status(403).json({ message: "Admin not found." });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Admin Authorization Middleware
exports.authorizeAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};
// User Authentication Middleware
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token); // Log the received token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(403).json({ message: "User not found." });
    }
    next();
  } catch (error) {
    console.error("Token verification error:", error); 
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
