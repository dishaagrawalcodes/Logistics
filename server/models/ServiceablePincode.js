const mongoose = require("mongoose");

const serviceablePincodeSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true
  },
  chargeable: {
    type: Boolean,
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("ServiceablePincode", serviceablePincodeSchema);