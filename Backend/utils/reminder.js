const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");
const Appointment = require('../model/appoinments')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

cron.schedule("* * * * *", async () => {  // Runs every minute
    const now = moment.utc();
    const reminderTime = moment.utc().add(5, "minutes");

    console.log("Checking for appointment reminders...");
    console.log("Current Time:", now.format());
    console.log("Looking for appointments between:", now.format(), "and", reminderTime.format());

    try {
        const upcomingAppointments = await Appointment.find({
            date: { $gte: now.toDate(), $lte: reminderTime.toDate() },
            reminderSent: false
        });

        console.log("Found Appointments:", upcomingAppointments);

        for (let appointment of upcomingAppointments) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: appointment.email,
                subject: "Appointment Reminder",
                text: `Hello, you have an appointment with ${appointment.doctorName} at ${moment(appointment.date).format("hh:mm A")} on ${moment(appointment.date).format("YYYY-MM-DD")}.`
            };

            await transporter.sendMail(mailOptions);
            console.log("Reminder email sent to:", appointment.email);

            await Appointment.findByIdAndUpdate(appointment._id, { reminderSent: true });
        }

    } catch (error) {
        console.error("Error checking reminders:", error);
    }
});
