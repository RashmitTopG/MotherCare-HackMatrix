import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Navbar from "./Navbar";
import Features from "./Features";
import MoreFeatures from "./Features2";
import TestimonialsPage from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";

export default function Landing() {
  const navigate = useNavigate();
  const [position, setPosition] = useState(110); // Baby animation
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev <= -20) {
          setVisible(false);
          setTimeout(() => {
            setPosition(110);
            setVisible(true);
          }, 50);
          return prev;
        }
        return prev - 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* ✅ Navbar Added */}

      {/* Background Image */}
      <div className="relative overflow-hidden">
        <img
          src="/background/baby-back-1.jpg"
          className="w-full h-[70vh] object-cover animate-fadeIn"
        />

        {/* Moving Baby Crawling Image */}
        {visible && (
          <img
            src="/background/baby-crawl.gif"
            className="absolute bottom-5 w-32 h-20 transition-all duration-200 ease-linear animate-slideLeft"
            style={{ left: `${position}%` }}
          />
        )}

        {/* Floating Elements */}
        <img
          src="/background/baby.gif"
          className="absolute bottom-72 w-32 h-30 animate-float"
        />
        <img
          src="/background/stars.png"
          className="absolute bottom-95 right-10 w-48 h-52 animate-float"
        />

        {/* Logo & Title */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <img
            src="/background/logo.png"
            className="w-48 h-52 mb-4 animate-scaleUp"
          />
          <div className="text-6xl font-bold text-pink-600 animate-fadeIn">
            Mother Care
          </div>
        </div>
      </div>

      {/* Sections with Fade-in Animation */}
      <div className="animate-fadeInUp">
        <Features />
        <FAQ />
        <MoreFeatures />
        <TestimonialsPage />
        <Footer />
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => navigate("/chatBot")}
        className="fixed bottom-5 right-5 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
