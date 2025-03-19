import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const email = localStorage.getItem("email"); // Retrieve email from localStorage

      if (!email) {
        console.error("Email is missing");
        return;
      }

      const response = await axios.post("http://localhost:3000/verify-otp", {
        email,
        otp
      });

      if (response.status === 200 && response.data.userId) {
        const id = response.data.userId;
        localStorage.setItem("userId", id);
        console.log("Stored userId:", localStorage.getItem("userId"));
        navigate("/medicalHistory");
      } else {
        console.error("Invalid response format or missing userId:", response.data);
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center transition-all transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-pink-700 mb-6">OTP Verification</h2>

        <div className="space-y-5">
          {/* OTP Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        
        {/* Verify OTP Button */}
        <Button
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-105"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </Button>

        {/* Resend OTP */}
        <p className="mt-4 text-gray-600">
          Didn't get the OTP?{" "}
          <span className="text-pink-500 font-semibold hover:underline cursor-pointer">
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
}
