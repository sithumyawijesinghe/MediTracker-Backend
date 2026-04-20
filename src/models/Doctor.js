const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String, default: "", trim: true },
    hospital: { type: String, default: "", trim: true },
    qualifications: { type: String, default: "", trim: true },
    experience: { type: Number, default: 0 },
    notes: { type: String, default: "", trim: true },
    createdAt: { type: Number, default: () => Date.now() }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
