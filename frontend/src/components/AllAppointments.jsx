import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      let userId = localStorage.getItem("userId")?.trim();
      console.log("User ID:", userId);

      if (!userId) {
        setError("User ID not found in localStorage.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/appointments/${userId}`);
        console.log(response);
        setAppointments(response.data || []); // Ensure it's always an array
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setError("No appointments found for this user.");
          } else {
            setError(`Error ${err.response.status}: ${err.response.data.error}`);
          }
        } else {
          setError("Failed to fetch appointments. Please try again later.");
        }
        console.error("Error fetching appointments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-6 w-32" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Your Appointments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const appointmentDate = new Date(appointment.date); // Keep only the date
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset to start of the day

            const isPastAppointment = appointmentDate < today;

            return (
              <Card 
                key={appointment._id || Math.random()} 
                className="shadow-md border border-gray-200 rounded-2xl hover:shadow-lg transition duration-300 bg-white"
              >
                <CardHeader className="bg-pink-100 rounded-t-2xl py-4">
                  <CardTitle className="text-pink-700 text-xl font-semibold text-center">
                    Dr. {appointment.doctorName || "Unknown Doctor"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-2">
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Date:</strong> {appointmentDate.toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Time:</strong> {appointment.time} {/* ✅ Use time as a string */}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-pink-600">Email:</strong> {appointment.email || "Not provided"}
                  </p>
                  <div className="mt-4 flex justify-center">
                    {isPastAppointment ? (
                      <Badge className="bg-green-500 text-white px-4 py-2">Appointment Done</Badge>
                    ) : (
                      <Badge className={appointment.reminderSent ? "bg-pink-500 text-white px-4 py-2" : "bg-gray-300 text-gray-700 px-4 py-2"}>
                        {appointment.reminderSent ? "Reminder Sent" : "Pending Reminder"}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-lg">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
