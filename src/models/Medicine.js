const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    localId: { type: Number, default: null },

    name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    frequency: { type: String, required: true, trim: true }, // Daily / Weekly
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, required: true, trim: true },

    updatedAt: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
