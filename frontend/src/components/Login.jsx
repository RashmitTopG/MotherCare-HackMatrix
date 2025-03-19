import { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context"; // Import AuthContext

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

     

      console.log("Login successful:", response.data);
      const { userId, name, token } = response.data;
      const healthInfo = await axios.get(`http://localhost:3000/health/userinfo/${userId}`)
      const{height, weight, age,medicalConditions} =  healthInfo.data;

      localStorage.setItem("userId", userId);
      localStorage.setItem("email" , email);
      localStorage.setItem("name" , name);
      localStorage.setItem("height" , height);
      localStorage.setItem("weight" , weight);
      localStorage.setItem("age" , age);
      localStorage.setItem("medicalConditons" , medicalConditions);

      login({ name, token }); // Set user in AuthContext

      navigate("/"); // Navigate after login
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center transition-all transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-pink-700 mb-6">Welcome Back, Login</h2>

        <div className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-lg px-4 py-2"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-lg px-4 py-2 pr-12"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button onClick={handleOnClick} className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">
          Login
        </Button>

        {/* Signup Redirect */}
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
