const Driver = require("../models/Driver");
const mongoose = require("mongoose");

// CREATE
exports.createDriver = async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      address,
      vehicleNo,
      aadharNo,
      panNo,
      dlNo 
    } = req.body;

    if (!name || !phone || !email || !address) {
      return res.status(400).json({ message: "Required fields missing" });
    }

   const existing = await Driver.findOne({
      $or: [{ phone }, { email }, { dlNo }]   // ✅ ADD dlNo
    });

    if (existing) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const driver = await Driver.create({
      name,
      phone,
      email,
      address,
      vehicleNo,
      aadharNo,
      panNo,
      dlNo 
    });

    res.status(201).json({
      message: "Driver created successfully",
      data: driver
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllDrivers = async (req, res) => {

  try {

    const drivers = await Driver.find().sort({ createdAt: -1 });

    res.json(drivers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDriverById = async (req, res) => {

  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid Driver ID format"
    });
  }

  const driver = await Driver.findById(id);

  if (!driver) {
    return res.status(404).json({
      message: "Driver not found"
    });
  }

  res.json(driver);
};
exports.updateDriver = async (req, res) => {

  try {

    const updated = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({
      message: "Driver updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteDriver = async (req, res) => {

  try {

    const deleted = await Driver.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json({ message: "Driver deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
