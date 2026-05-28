const jwt = require("jsonwebtoken");
const ServiceProvider = require("../models/ServiceProvider");

const labourAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

const labour = await ServiceProvider
  .findById(decoded._id)   // ✅ FIXED
  .select("-password");


    if (!labour) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (labour.status !== "approved") {
      return res.status(403).json({ message: "Labour not approved" });
    }

    req.user = labour;
    next();

  } catch (error) {
    console.error("Labour auth error:", error.message);
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = labourAuth;
