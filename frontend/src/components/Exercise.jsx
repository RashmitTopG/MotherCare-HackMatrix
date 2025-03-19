import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Exercise() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bp, setBp] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const showToast = (message) => {
    toast.info(`Risk Level: ${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async () => {
    if (!age || !height || !weight || !bp || !heartRate || !glucoseLevel) {
      setError("All fields are required!");
      return;
    }

    const numAge = Number(age);
    const numHeight = Number(height) / 100;
    const numWeight = Number(weight);
    const numBp = Number(bp);
    const numHeartRate = Number(heartRate);
    const numGlucoseLevel = Number(glucoseLevel);

    if (numHeight <= 0 || numWeight <= 0) {
      setError("Please enter valid height and weight.");
      return;
    }

    const bmi = (numWeight / (numHeight * numHeight)).toFixed(2);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5002/api/predict", {
        age: numAge,
        bmi: parseFloat(bmi),
        blood_pressure: numBp,
        heart_rate: numHeartRate,
        glucose_level: numGlucoseLevel,
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
        showToast(response.data.prediction);
      } else {
        setError("Error fetching prediction.");
      }
    } catch (err) {
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
        Your Health Profile 💖
      </h1>
      <Card className="bg-pink-100 shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold text-pink-700">Enter Health Details</h2>
          <div className="space-y-4 mt-4">
            {["Age", "Height (cm)", "Weight (kg)", "Blood Pressure", "Heart Rate", "Glucose Level"].map((label, index) => {
              const setters = [setAge, setHeight, setWeight, setBp, setHeartRate, setGlucoseLevel];
              return (
                <div key={index}>
                  <label className="text-gray-700">{label}</label>
                  <input
                    type="number"
                    className="w-full p-2 mt-2 border rounded"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={[age, height, weight, bp, heartRate, glucoseLevel][index]}
                    onChange={(e) => handleInputChange(e, setters[index])}
                  />
                </div>
              );
            })}

            <div className="mt-4 text-center">
              <Button
                onClick={handleSubmit}
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Risk Prediction"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {prediction && (
        <div className="mt-6 bg-pink-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-pink-700">Risk Prediction</h3>
          <p className="text-gray-700">Risk Level: {prediction}</p>
        </div>
      )}

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
