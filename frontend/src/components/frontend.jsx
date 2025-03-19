import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    blood_pressure: "",
    heart_rate: "",
    glucose_level: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setExercises([]);

    const heightInMeters = formData.height / 100;
    if (heightInMeters <= 0 || formData.weight <= 0) {
      setError("Please enter valid height and weight.");
      setLoading(false);
      return;
    }

    const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
    const requestData = {
      age: formData.age,
      bmi,
      blood_pressure: formData.blood_pressure,
      heart_rate: formData.heart_rate,
      glucose_level: formData.glucose_level,
    };

    try {
      const response = await axios.post("http://localhost:5002/api/predict", requestData);
      setPrediction(response.data.risk_level);
      showToast(response.data.risk_level);
    } catch (error) {
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (prediction) => {
    const riskLevels = {
      0: "High Risk",
      1: "Medium Risk",
      2: "Low Risk",
    };
    toast.info(`Risk Level: ${riskLevels[prediction] || "Unknown Risk"}`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    if (prediction !== null) {
      const exercisesMapping = {
        1: [
          { name: "Pelvic Tilt", gif: "/gifs/low risk/pelvic_tilt.gif" },
          { name: "Prenatal Yoga", gif: "/gifs/low risk/prenatal_yoga.gif" },
          { name: "Stationary Cycling", gif: "/gifs/low risk/stationary_cycling.gif" },
        ],
        0: [
          { name: "Chair Exercises", gif: "/gifs/high risk/chair_exercises.gif" },
          { name: "Leg Raises", gif: "/gifs/high risk/leg_raises.gif" },
          { name: "Slow Walking", gif: "/gifs/high risk/slow_walking.gif" },
        ],
        2: [
          { name: "Breathing Exercises", gif: "/gifs/medium risk/breathing_exercises.gif" },
          { name: "Modified Squats", gif: "/gifs/medium risk/modified_squats.gif" },
          { name: "Seated Stretching", gif: "/gifs/medium risk/seated_stretching.gif" },
          { name: "Water Exercises", gif: "/gifs/medium risk/water_exercises.gif" },
        ],
      };
  
      setExercises(exercisesMapping[prediction] || []);
    }
  }, [prediction]);

  const riskDescriptions = {
    0: "High risk: Immediate medical attention may be required. Please consult a healthcare professional.",
    1: "Medium risk: Some concerns exist. Lifestyle modifications and periodic checkups are recommended.",
    2: "Low risk: Your health status looks good, but maintaining a balanced lifestyle is important.",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
       <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">Your Health Profile 💖</h1>
      <Card className="bg-pink-100 shadow-lg rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-center text-pink-700 text-2xl font-semibold">
            Predict Risk Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-pink-700">
                  {key.replace(/_/g, " ")}
                </label>
                <Input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="border-pink-400 focus:ring-pink-500"
                />
              </div>
            ))}
            <div className="mt-4 text-center">
              <Button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Predict"}
              </Button>
            </div>
          </form>
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>
        
      {prediction !== null && (
        <div className="mt-6 p-6 bg-pink-50 rounded-2xl text-center">
          <h2 className="text-2xl font-semibold text-pink-700">Risk Level: {riskDescriptions[prediction]}</h2>
        </div>
      )}

      {prediction !== null && exercises.length > 0 && (
  <div className="mt-6 bg-pink-50 p-6 rounded-2xl">
    <h2 className="text-2xl font-semibold text-center text-pink-700">
      Recommended Exercises
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {exercises.map((exercise, index) => (
        <div key={index} className="text-center">
          <img
            src={exercise.gif}
            alt={exercise.name}
            className="w-64 h-64 object-cover rounded-lg mx-auto" // Enlarged size & centered
          />
          <p className="mt-2 text-lg font-medium text-pink-700">{exercise.name}</p>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default PredictForm;
