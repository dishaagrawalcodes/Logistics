const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      required: true,
    },

   pincodes: [
  {
    type: String,
    required: true,
  }
],

    mobile: {
      type: String,
      required: true,
    },

   serviceCategories: [
  {
    type: String,
    required: true,
  }
],
    // ✅ Aadhaar images (optional)
    aadhaar: {
      frontImage: {
        type: String, // file path / URL
        required: false,
      },
      backImage: {
        type: String,
        required: false,
      },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
    },
    loginId: {
      type: String,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
