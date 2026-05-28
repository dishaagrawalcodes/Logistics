const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      enum: ["home", "transportation"] // Only these allowed
    }
  },
  { timestamps: true }
);

serviceSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("Service", serviceSchema);
