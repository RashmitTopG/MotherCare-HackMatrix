import { useNavigate } from "react-router-dom";
import PreNatalCare from "./preNatalCare";

export default function CareGuidelines() {

  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center px-10 py-12 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-50">
      <h1 className="text-4xl font-extrabold text-pink-700 mb-8 flex items-center">
        🌸 Care Guidelines for Mothers 💖
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* 🌿 Prenatal Care Section */}
        <div className="p-8 bg-white/50 border border-white/40 rounded-3xl shadow-2xl backdrop-blur-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4 text-pink-800 flex items-center">
            🤰 Prenatal Care
          </h2>
          <ul className="list-disc list-inside text-pink-700 space-y-3 text-lg">
            <li>🩺 Regular check-ups with healthcare providers</li>
            <li>🥗 Balanced diet rich in vitamins & minerals</li>
            <li>🚫 Avoid alcohol, smoking & harmful substances</li>
            <li>🏃‍♀️ Daily exercise like walking or prenatal yoga</li>
            <li>💊 Taking prenatal vitamins, especially folic acid</li>
          </ul>
          <button onClick = {()=>{
            navigate("/preNatalCare")
          }}className="mt-6 w-full py-3 px-6 bg-pink-700 text-white font-semibold rounded-xl shadow-md hover:bg-pink-800 transition">
            Learn More
          </button>
        </div>

        {/* 🍼 Postnatal Care Section */}
        <div className="p-8 bg-white/50 border border-white/40 rounded-3xl shadow-2xl backdrop-blur-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-4 text-pink-900 flex items-center">
            🍼 Postnatal Care
          </h2>
          <ul className="list-disc list-inside text-pink-800 space-y-3 text-lg">
            <li>🛌 Rest & proper recovery after childbirth</li>
            <li>🥦 Maintaining a healthy & nutritious diet</li>
            <li>👩‍⚕️ Regular medical check-ups for mom & baby</li>
            <li>🤱 Breastfeeding support & staying hydrated</li>
            <li>🧘‍♀️ Mental health care & postpartum wellness</li>
          </ul>
          <button onClick = {()=>{
            navigate("/postNatalCare")
          }}className="mt-6 w-full py-3 px-6 bg-pink-700 text-white font-semibold rounded-xl shadow-md hover:bg-pink-800 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
