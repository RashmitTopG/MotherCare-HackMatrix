import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroComp = ({ title, subtitle, imageUrl, buttonText, buttonLink }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(buttonLink);
  };

  return (
    <section
      className="relative w-full max-w-screen-lg mx-auto h-[500px] bg-cover bg-center rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 drop-shadow-2xl">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">{subtitle}</p>
        <Button
          onClick={handleClick}
          className="bg-pink-500 hover:bg-pink-600 text-white text-md py-3 px-8 rounded-full shadow-xl transform transition duration-300 hover:scale-110"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

const ExerciseDiet = () => {
  return (
    <div className="space-y-12 py-12">
      {/* 🏋️ Exercise Section */}
      <HeroComp
        title="Stay Active & Healthy"
        subtitle="Gentle exercises to keep you strong and energized during motherhood"
        imageUrl="/background/yoga.jpg"
        buttonText="View Exercises"
        buttonLink="/exercise"
      />

      {/* 🥗 Diet Section */}
      <HeroComp
        title="Nourish Your Body"
        subtitle="Healthy meal plans to ensure the best nutrition for you and your baby"
        imageUrl="/background/diet.webp"
        buttonText="Explore Diet Plans"
        buttonLink="/diet"
      />
      
    </div>
  );
};

export default ExerciseDiet;
