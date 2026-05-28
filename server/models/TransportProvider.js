const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  services: [{ type: String, required: true }],
  pincodes: [{ type: String, required: true }],

  vehicleName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },

  dlNumber: { type: String, required: true },
  rcNumber: { type: String, required: true },

  aadhaarNumber: String,
  panNumber: String,

  status: {
    type: String,
    enum: ["pending","approved","rejected"],
    default: "pending"
  },

  rejectionReason: String,
  loginId: String,
  password: String

},
{ timestamps: true }
);

module.exports = mongoose.model("TransportProvider", transportSchema);
