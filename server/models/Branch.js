const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Branch", branchSchema);