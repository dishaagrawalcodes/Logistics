const ServiceablePincode = require("../models/ServiceablePincode");

exports.addPincode = async (req, res) => {
  try {
    const { pincode, chargeable, branchId } = req.body;

    if (!pincode || chargeable === undefined || !branchId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await ServiceablePincode.create({
      pincode,
      chargeable,
      branchId
    });

    res.status(201).json({
      message: "Pincode added successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getPincodesByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const pincodes = await ServiceablePincode.find({ branchId });
    res.status(200).json(pincodes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.checkServiceByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    const services = await ServiceablePincode.find({ pincode })
      .populate("branchId", "branchName address pincode");

    if (!services.length) {
      return res.status(404).json({ message: "Service not available" });
    }

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
