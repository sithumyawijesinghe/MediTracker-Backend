const express = require("express");
const mongoose = require("mongoose");
const Log = require("../models/Log");

const router = express.Router();

// POST /api/logs/upsert
router.post("/upsert", async (req, res) => {
  try {
    const {
      localId,
      serverId,
      medName,
      doseText,
      timeText,
      dayLabel,
      status,
      updatedAt
    } = req.body;

    if (!medName || !doseText || !timeText || !dayLabel || !status || updatedAt == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const payload = {
      localId: localId ?? null,
      medName,
      doseText,
      timeText,
      dayLabel,
      status,
      updatedAt
    };

    let doc;
    if (serverId && mongoose.Types.ObjectId.isValid(serverId)) {
      doc = await Log.findByIdAndUpdate(serverId, payload, {
        new: true,
        upsert: false
      });
    }

    if (!doc) {
      doc = await Log.create(payload);
    }

    return res.json({
      serverId: String(doc._id),
      updatedAt: doc.updatedAt
    });
  } catch (err) {
    console.error("logs/upsert error:", err.message);
    return res.status(500).json({ message: "Failed to upsert log" });
  }
});

// GET /api/logs
router.get("/", async (req, res) => {
  try {
    const docs = await Log.find().sort({ updatedAt: -1 });

    const response = docs.map((d) => ({
      id: String(d._id),
      medName: d.medName,
      doseText: d.doseText,
      timeText: d.timeText,
      dayLabel: d.dayLabel,
      status: d.status,
      updatedAt: d.updatedAt
    }));

    return res.json(response);
  } catch (err) {
    console.error("logs/get error:", err.message);
    return res.status(500).json({ message: "Failed to fetch logs" });
  }
});

module.exports = router;
