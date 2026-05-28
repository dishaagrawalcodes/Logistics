const mongoose = require("mongoose");

const userCustomerSchema = new mongoose.Schema(
  {
    name: String,
    mobile: { type: String, required: true, unique: true },
    email: String,
    address: { type: String },
    pincode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserCustomer", userCustomerSchema);
