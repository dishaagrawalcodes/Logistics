const jwt = require("jsonwebtoken");
const UserCustomer = require("../models/UserCustomer");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "customer") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 🔥 Fetch full user from database
    const user = await UserCustomer.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ Now contains name, email, mobile, etc
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = userAuth;
