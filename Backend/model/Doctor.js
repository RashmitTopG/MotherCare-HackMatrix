const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({ peerId: String });
const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;