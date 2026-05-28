const mongoose = require("mongoose");

const eventRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    mobile: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    eventType: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING"
    },
     message: {
      type: String,
      trim: true,
      default: ""
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("EventRequest", eventRequestSchema);