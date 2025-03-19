import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export default function MakeAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    name: "",
    email: "",
    date: "",
    time: "",
    doctorName: "",
    reminderSent: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      date: formData.date // Keep as string to preserve local format
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/schedule`, formattedData);
      console.log(response);

      if (response.status === 201) {
        console.log("Appointment Confirmed:", response.data);
        navigate("/welcome");
      } else {
        console.error("Failed to book appointment", response.data);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Book an Appointment</h2>

        {/* Appointment Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700">Appointment Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-gray-700">Appointment Time</label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="doctorName" className="block text-gray-700">Doctor Name</label>
            <input
              type="text"
              id="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter Doctor Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2"
              onClick={handleOnClick}
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
