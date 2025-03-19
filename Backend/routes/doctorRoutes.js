const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Doctor = require("../model/Doctor");

// Store or update the doctor's PeerJS ID
router.post("/setDoctorPeerId", async (req, res) => {
    await Doctor.deleteMany();
    const newDoctor = new Doctor({ peerId: req.body.peerId });
    await newDoctor.save();
    res.json({ message: "Doctor PeerJS ID saved" });
  });
  
  // Get the latest doctor's PeerJS ID
  router.get("/getDoctorPeerId", async (req, res) => {
    const doctor = await Doctor.findOne();
    res.json({ peerId: doctor ? doctor.peerId : null });
  });

  module.exports = router;