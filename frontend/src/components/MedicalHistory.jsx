import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    name: "",
    age: "",
    bloodGroup: "",
    trimester: "",
    preWeight: "",
    postWeight: "",
    height: "",
    dueDate: "",
    medicalConditions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["age", "trimester", "preWeight", "postWeight", "height"].includes(name) 
        ? Number(value) 
        : name === "medicalConditions" 
        ? value.split(",").map((item) => item.trim()) 
        : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
        const response = await axios.post(`${BACKEND_URL}/health`, formData);

        if (response) {
            // ✅ Store form data in localStorage
            Object.keys(formData).forEach((key) => {
                if (typeof formData[key] === "object") {
                    localStorage.setItem(key, JSON.stringify(formData[key])); // Convert arrays to strings
                } else {
                    localStorage.setItem(key, formData[key]);
                }
            });

            // ✅ Navigate to welcome page
            localStorage.setItem("userId", formData.userId);
            localStorage.setItem("name", formData.name);
            localStorage.setItem("height", formData.height);
            localStorage.setItem("preWeight", formData.preWeight);
            localStorage.setItem("postWeight", formData.postWeight);
            localStorage.setItem("age", formData.age);
            localStorage.setItem("medicalConditions", JSON.stringify(formData.medicalConditions));
            
            navigate("/");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};


  return (
    <div className="mt-20 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">Medical History Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Full Name"
            required
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Age"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Blood Group:</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Trimester */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Trimester:</label>
          <select
            name="trimester"
            value={formData.trimester}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Trimester</option>
            <option value="1">First Trimester (1-12 weeks)</option>
            <option value="2">Second Trimester (13-26 weeks)</option>
            <option value="3">Third Trimester (27-40 weeks)</option>
          </select>
        </div>

        {/* Pre-Pregnancy Weight */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Pre-Pregnancy Weight (kg):</label>
          <input
            type="number"
            name="preWeight"
            value={formData.preWeight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Weight before pregnancy"
            required
          />
        </div>

        {/* Current Weight */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Current Weight (kg):</label>
          <input
            type="number"
            name="postWeight"
            value={formData.postWeight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Current weight"
            required
          />
        </div>

        {/* Height */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Height in cm"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Medical Conditions */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Medical Conditions:</label>
          <textarea
            name="medicalConditions"
            value={formData.medicalConditions.join(", ")} // Display as comma-separated string
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter conditions separated by commas (e.g., Anemia, Diabetes)"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md"
          >
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;
