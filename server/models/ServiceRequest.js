const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCustomer",
      required: true,
    },

    pin: String,
    service: String,

    status: {
      type: String,
      enum: ["pending", "quoted", "confirmed", "completed"],
      default: "pending",
    },

    quotations: [
      {
        provider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ServiceProvider",
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

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
