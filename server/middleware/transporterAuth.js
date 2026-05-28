const jwt = require("jsonwebtoken");
const TransportProvider = require("../models/TransportProvider");

const transporterAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "transport") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const transport = await TransportProvider.findById(decoded._id);

    if (!transport) {
      return res.status(404).json({
        message: "Transport not found",
      });
    }

    req.transport = transport;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = transporterAuth;
