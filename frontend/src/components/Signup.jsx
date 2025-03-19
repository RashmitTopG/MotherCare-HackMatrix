import { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context"; // Import AuthContext

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
      });

      console.log("Signup successful:", response.data);
      localStorage.setItem("email", email);
      localStorage.setItem("name" , name);

      // Auto-login after signup
      const { token } = response.data;
      login({ name, token });

      navigate("/verify-otp"); // Redirect to OTP verification
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center transition-all transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-pink-700 mb-6">Hello Mom, Signup Please</h2>

        <div className="space-y-5">
          {/* Username Input */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-pink-300 focus:ring-pink-500 focus:border-pink-500 rounded-lg px-4 py-2"
            />
          </div>

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

        {/* Signup Button */}
        <Button onClick={handleSignup} className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">
          Sign Up
        </Button>

        {/* Login Redirect */}
        <p className="mt-4 text-gray-600">
          Already a user?{" "}
          <Link to="/login" className="text-pink-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
