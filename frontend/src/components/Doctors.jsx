import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const doctors = [
  { id: 1, name: "Dr. Aditi Sharma", specialty: "Gynecologist", location: "Mumbai", image: "/doctors/aditi.jpg" },
  { id: 2, name: "Dr. Rahul Verma", specialty: "Obstetrician", location: "Delhi", image: "/doctors/rahul.jpg" },
  { id: 3, name: "Dr. Neha Kapoor", specialty: "Pediatrician", location: "Bangalore", image: "/doctors/neha.jpg" },
  { id: 4, name: "Dr. Vikram Mehta", specialty: "Fertility Specialist", location: "Pune", image: "/doctors/vikram.jpg" },
  { id: 5, name: "Dr. Kavita Reddy", specialty: "Gynecologist", location: "Hyderabad", image: "/doctors/kavita.jpg" },
  { id: 6, name: "Dr. Anil Kumar", specialty: "General Physician", location: "Chennai", image: "/doctors/anil.jpg" },
  { id: 7, name: "Dr. Priya Singh", specialty: "Endocrinologist", location: "Kolkata", image: "/doctors/priya.jpg" },
  { id: 8, name: "Dr. Rajesh Tiwari", specialty: "Cardiologist", location: "Jaipur", image: "/doctors/rajesh.jpg" },
  { id: 9, name: "Dr. Sneha Das", specialty: "Dermatologist", location: "Ahmedabad", image: "/doctors/sneha.jpg" },
];

export default function DoctorsPage() {

  const navigate = useNavigate();

  const startCall = () => {
    window.open("/doctor-call" , "_blank")
    setTimeout(()=>{
      navigate("/patient-call")
    },7000)}

  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
        Find Your Doctor 💖
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="🔍 Search by name, specialty, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-lg border border-pink-300 rounded-full px-4 py-3 focus:border-pink-500 focus:ring-pink-300 transition"
        />
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-6 bg-pink-100 shadow-lg rounded-2xl transition transform hover:scale-105 hover:shadow-xl text-center"
            >
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-pink-300 shadow-sm mb-4"
              />
              <h2 className="text-2xl font-semibold text-pink-700">{doctor.name}</h2>
              <p className="text-gray-700">{doctor.specialty}</p>
              <p className="text-gray-600">{doctor.location}</p>
              <Button onClick = {startCall} className="mt-3 bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded-full">
                Book Appointment
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-3 text-center">No doctors found.</p>
        )}
      </div>
    </div>
  );
}
