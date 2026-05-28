const Branch = require("../models/Branch");

exports.addBranch = async (req, res) => {
  try {
    const { branchName, address, pincode } = req.body;

    if (!branchName || !address || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const branch = await Branch.create({
      branchName,
      address,
      pincode,
      adminId: req.admin.id
    });

    res.status(201).json({
      message: "Branch added successfully",
      branch
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({ adminId: req.admin.id });
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
