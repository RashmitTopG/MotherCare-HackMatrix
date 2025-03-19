const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  doctorName: { type: String, required: true },
  date: { type: Date, required: true }, // Proper Date field
  time: { type: String, required: true }, // Keep as string (e.g., "14:30")
  email: { type: String, required: true },
  reminderSent: { type: Boolean, default: false }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
