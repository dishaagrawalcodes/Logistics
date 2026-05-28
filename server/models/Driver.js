
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  address: {
    type: String,
    required: true
  },

  vehicleNo: {
    type: String,
    default: null
  },

  aadharNo: {
    type: String,
    default: null
  },

  panNo: {
    type: String,
    default: null
  },
  dlNo: {
  type: String,
  required: true,
  unique: true
}
,
  isActive: {
    type: Boolean,
    default: true
  }
,status: {
  type: String,
  enum: ["AVAILABLE", "BUSY"],
  default: "AVAILABLE"
}

}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
