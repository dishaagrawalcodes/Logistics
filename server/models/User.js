const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    pin: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    service: {
      type: String, // must match serviceCategory of provider
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
