import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export default function Exercise() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [diet, setDiet] = useState(null);
  const [dietLoading, setDietLoading] = useState(false);
  const [dietError, setDietError] = useState(null);

  useEffect(() => {
    let userId = localStorage.getItem("userId")?.trim();
    if (!userId) {
      setError("User ID not found in localStorage.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/health/userinfo/${userId}`);
        setHealthData(response.data);
      } catch (err) {
        setError("Failed to fetch health data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchDiet = async () => {
    setDietLoading(true);
    setDietError(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setDietError("User ID not found.");
        return;
      }
      const response = await axios.get(`${BACKEND_URL}/health/recommend/${userId}`);
      setDiet(response.data.mealPlan);
    } catch (err) {
      setDietError("Failed to fetch personalized diet");
    } finally {
      setDietLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading health data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">Your Health Profile 💖</h1>
      <Card className="bg-pink-100 shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-pink-700">{healthData.name}</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p className="text-gray-700 font-medium">👶 Age:</p> <p className="text-gray-600">{healthData.age}</p>
            <p className="text-gray-700 font-medium">🤰 Trimester:</p> <p className="text-gray-600">{healthData.trimester}</p>
            <p className="text-gray-700 font-medium">⚖️ Pre-Pregnancy Weight:</p> <p className="text-gray-600">{healthData.preWeight} kg</p>
            <p className="text-gray-700 font-medium">⚖️ Current Weight:</p> <p className="text-gray-600">{healthData.postWeight} kg</p>
            <p className="text-gray-700 font-medium">📏 Height:</p> <p className="text-gray-600">{healthData.height} cm</p>
            <p className="text-gray-700 font-medium">🩸 Blood Group:</p> <p className="text-gray-600">{healthData.bloodGroup}</p>
            <p className="text-gray-700 font-medium">📅 Due Date:</p> <p className="text-gray-600">{healthData.dueDate}</p>
            <p className="text-gray-700 font-medium">📊 BMI:</p> <p className="text-gray-600">{healthData.bmi}</p>
            <p className="text-gray-700 font-medium">⚠️ Pregnancy Risk Level:</p> <p className="text-gray-600">{healthData.pregnancyRiskLevel}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-pink-700">Medical Conditions:</h3>
            {Array.isArray(healthData.medicalConditions) && healthData.medicalConditions.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {healthData.medicalConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No medical conditions</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button
          onClick={fetchDiet}
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full"
          disabled={dietLoading}
        >
          {dietLoading ? "Loading..." : "Show Personalized Diet 🍽️"}
        </Button>
      </div>

      {dietLoading && <p className="text-center text-gray-500 mt-4">Fetching your diet plan...</p>}
      {dietError && <p className="text-center text-red-500 mt-4">{dietError}</p>}
      {diet && (
        <div className="mt-6 bg-pink-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-pink-700 text-center">🌸 Personalized Diet Plan 🌸</h3>
          <ul className="list-disc pl-5 text-gray-700 mt-2">
            {diet.map((meal, index) => (
              <li key={index} className="py-1">🍽️ {meal}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}