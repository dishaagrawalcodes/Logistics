const UserCustomer = require("../models/UserCustomer");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { name, mobile, email } = req.body;

    let user = await UserCustomer.findOne({ mobile });

    if (user) {
      return res.json({ message: "User already exists", user });
    }

    user = await UserCustomer.create({ name, mobile, email });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.loginWithMobile = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const user = await UserCustomer.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        message: "No user found with this mobile",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login success",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { address, pincode } = req.body;

    const user = await UserCustomer.findByIdAndUpdate(
      req.user._id,
      { address, pincode },
      { new: true }
    );

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const user = await UserCustomer.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
