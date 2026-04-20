const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    localId: { type: Number, default: null },

    medName: { type: String, required: true, trim: true },
    doseText: { type: String, required: true, trim: true },
    timeText: { type: String, required: true, trim: true },
    dayLabel: { type: String, required: true, trim: true }, // Today / Mon / Month
    status: { type: String, required: true, trim: true }, // TAKEN / MISSED

    updatedAt: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Log", logSchema);
