const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");

const router = express.Router();

// POST /api/doctors
router.post("/", async (req, res) => {
  try {
    // ✅ Log 1: Verify data arrival
    console.log('Doctor Data Received:', req.body);

    const { name, specialization, email, phone, hospital, qualifications, experience, notes } = req.body;

    // Validate required fields
    if (!name || !specialization || !email) {
      return res.status(400).json({ message: "Missing required fields: name, specialization, email" });
    }

    // Create and save new doctor
    const newDoctor = new Doctor({
      name,
      specialization,
      email,
      phone: phone || "",
      hospital: hospital || "",
      qualifications: qualifications || "",
      experience: experience || 0,
      notes: notes || ""
    });

    const savedDoctor = await newDoctor.save();

    // ✅ Log 2: Verify database save success
    console.log('DB Save Success:', savedDoctor);

    return res.status(201).json({
      message: "Save successfully",
      doctor: {
        id: String(savedDoctor._id),
        name: savedDoctor.name,
        specialization: savedDoctor.specialization,
        email: savedDoctor.email,
        phone: savedDoctor.phone,
        hospital: savedDoctor.hospital,
        qualifications: savedDoctor.qualifications,
        experience: savedDoctor.experience,
        notes: savedDoctor.notes,
        createdAt: savedDoctor.createdAt
      }
    });
  } catch (err) {
    console.error("doctors/POST error:", err.message);
    return res.status(500).json({ message: "Failed to save doctor", error: err.message });
  }
});

// GET /api/doctors
router.get("/", async (req, res) => {
  try {
    const docs = await Doctor.find().sort({ createdAt: -1 });

    const response = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      specialization: d.specialization,
      email: d.email,
      phone: d.phone,
      hospital: d.hospital,
      qualifications: d.qualifications,
      experience: d.experience,
      notes: d.notes,
      createdAt: d.createdAt
    }));

    return res.json(response);
  } catch (err) {
    console.error("doctors/GET error:", err.message);
    return res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

// GET /api/doctors/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json({
      id: String(doctor._id),
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone,
      hospital: doctor.hospital,
      qualifications: doctor.qualifications,
      experience: doctor.experience,
      notes: doctor.notes,
      createdAt: doctor.createdAt
    });
  } catch (err) {
    console.error("doctors/GET by id error:", err.message);
    return res.status(500).json({ message: "Failed to fetch doctor" });
  }
});

module.exports = router;
