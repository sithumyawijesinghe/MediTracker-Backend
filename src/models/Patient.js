const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // Optional trace from Android payload
    localId: { type: Number, default: null },

    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, trim: true },
    diseases: { type: String, default: "", trim: true },
    otherDisease: { type: String, default: "", trim: true },
    currentMeds: { type: String, default: "", trim: true },
    notes: { type: String, default: "", trim: true },

    // Must match Android sync field type
    updatedAt: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Patient", patientSchema);
