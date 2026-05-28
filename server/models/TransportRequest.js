const mongoose = require("mongoose");

const transportRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCustomer",
      required: true,
    },

    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },

    pincode: { type: String, required: true },
    service: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "quoted", "confirmed", "completed"],
      default: "pending",
    },

    quotations: [
      {
        provider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TransportProvider",
        },

        amount: {
          type: Number,
          required: true,
        },

        status: {
          type: String,
          enum: ["sent", "accepted", "rejected"],
          default: "sent",
        },

        rejectionReason: String,

        advancePaid: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransportRequest", transportRequestSchema);
