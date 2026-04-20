const express = require("express");
const mongoose = require("mongoose");
const Patient = require("../models/Patient");

const router = express.Router();

// POST /api/patients/upsert
router.post("/upsert", async (req, res) => {
  try {
    const {
      localId,
      serverId,
      name,
      age,
      gender,
      diseases,
      otherDisease,
      currentMeds,
      notes,
      updatedAt
    } = req.body;

    if (!name || age == null || !gender || updatedAt == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payload = {
      localId: localId ?? null,
      name,
      age,
      gender,
      diseases: diseases ?? "",
      otherDisease: otherDisease ?? "",
      currentMeds: currentMeds ?? "",
      notes: notes ?? "",
      updatedAt
    };

    let doc;
    if (serverId && mongoose.Types.ObjectId.isValid(serverId)) {
      doc = await Patient.findByIdAndUpdate(serverId, payload, {
        new: true,
        upsert: false
      });
    }

    if (!doc) {
      doc = await Patient.create(payload);
    }

    return res.json({
      serverId: String(doc._id),
      updatedAt: doc.updatedAt
    });
  } catch (err) {
    console.error("patients/upsert error:", err.message);
    return res.status(500).json({ message: "Failed to upsert patient" });
  }
});

// GET /api/patients
router.get("/", async (req, res) => {
  try {
    const docs = await Patient.find().sort({ updatedAt: -1 });

    const response = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      age: d.age,
      gender: d.gender,
      diseases: d.diseases,
      otherDisease: d.otherDisease,
      currentMeds: d.currentMeds,
      notes: d.notes,
      updatedAt: d.updatedAt
    }));

    return res.json(response);
  } catch (err) {
    console.error("patients/get error:", err.message);
    return res.status(500).json({ message: "Failed to fetch patients" });
  }
});

module.exports = router;
