const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const patientsRouter = require("./routes/patients");
const medicinesRouter = require("./routes/medicines");
const logsRouter = require("./routes/logs");
const authRouter = require("./routes/auth");
const doctorsRouter = require("./routes/doctors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "meditracker-backend" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/medicines", medicinesRouter);
app.use("/api/logs", logsRouter);
app.use("/api/doctors", doctorsRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
      console.log(`Android emulator: http://10.0.2.2:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });
