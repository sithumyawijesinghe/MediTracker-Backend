const express = require("express");
const mongoose = require("mongoose");
const Medicine = require("../models/Medicine");

const router = express.Router();

// POST /api/medicines/upsert
router.post("/upsert", async (req, res) => {
  try {
    const {
      localId,
      serverId,
      name,
      dosage,
      unit,
      frequency,
      startDate,
      endDate,
      updatedAt
    } = req.body;

    if (!name || !dosage || !unit || !frequency || !startDate || !endDate || updatedAt == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payload = {
      localId: localId ?? null,
      name,
      dosage,
      unit,
      frequency,
      startDate,
      endDate,
      updatedAt
    };

    let doc;
    if (serverId && mongoose.Types.ObjectId.isValid(serverId)) {
      doc = await Medicine.findByIdAndUpdate(serverId, payload, {
        new: true,
        upsert: false
      });
    }

    if (!doc) {
      doc = await Medicine.create(payload);
    }

    return res.json({
      serverId: String(doc._id),
      updatedAt: doc.updatedAt
    });
  } catch (err) {
    console.error("medicines/upsert error:", err.message);
    return res.status(500).json({ message: "Failed to upsert medicine" });
  }
});

// GET /api/medicines
router.get("/", async (req, res) => {
  try {
    const docs = await Medicine.find().sort({ updatedAt: -1 });

    const response = docs.map((d) => ({
      id: String(d._id),
      name: d.name,
      dosage: d.dosage,
      unit: d.unit,
      frequency: d.frequency,
      startDate: d.startDate,
      endDate: d.endDate,
      updatedAt: d.updatedAt
    }));

    return res.json(response);
  } catch (err) {
    console.error("medicines/get error:", err.message);
    return res.status(500).json({ message: "Failed to fetch medicines" });
  }
});

module.exports = router;
