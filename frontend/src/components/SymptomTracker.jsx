import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to Flask WebSocket server

export default function SymptomTracker() {
  const [symptoms, setSymptoms] = useState("");
  const [alerts, setAlerts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        symptoms,
      });
      alert("Risk Level: " + response.data.prediction);
    } catch (error) {
      console.error("Error sending symptoms:", error);
    }
  };

  useEffect(() => {
    socket.on("alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });
    return () => socket.off("alert");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Symptom Tracker</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter symptoms..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        ></textarea>
        <button className="bg-pink-500 text-white px-4 py-2 rounded" type="submit">
          Submit Symptoms
        </button>
      </form>
      <div className="mt-6 w-full max-w-md bg-white p-4 shadow rounded">
        <h2 className="text-lg font-bold">Real-time Alerts</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index} className="text-red-500">{alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
