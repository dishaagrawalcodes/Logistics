const mongoose = require("mongoose");

const shipmentRequestSchema = new mongoose.Schema({

  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },

  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },

  itemDescription: { type: String, required: true },

  status: {
    type: String,
    enum: [
      "NEW",
      "ACCEPTED",
      "REJECTED",
      "STARTED",
      "IN_PROGRESS",
      "DELIVERED"
    ],
    default: "NEW"
  },

  shipmentNo: {
  type: String,
  unique: true,
  sparse: true,
  trim: true
},

  rejectionReason: String,

  currentLocation: {
    type: String,
    default: "Warehouse"
  },
   locationHistory: [
    {
      place: String,
      time: {
        type: Date,
        default: Date.now
      }
    }
  ],
  advancePayment: Number,
remainingPayment: Number,

driver: {
  name: String,
  phone: String,
  email: String,
  vehicleNo: String,

}
,

  acceptedAt: Date,
  startedAt: Date,
  deliveredAt: Date,

  lastUpdated: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("ShipmentRequest", shipmentRequestSchema);