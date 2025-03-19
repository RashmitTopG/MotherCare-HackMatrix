import HeroComp from "./HeroComp";

export default function Welcome() {
  return (
    <div className="space-y-12 py-12 px-6 md:px-12">
      {/* First Hero Section */}
      <HeroComp
        title="Diet and Exercises"
        subtitle="Healthy meal plans to ensure the best nutrition for you and your baby"
        imageUrl="/background/babyDoctorCare.jpg"
          buttonText="Mark Your Appointment"
          buttonLink="/book-appointment"
      />

      {/* Second Hero Section */}
      <HeroComp
        title="Diet and Exercises"
        subtitle="Healthy meal plans to ensure the best nutrition for you and your baby"
        imageUrl="/background/PregnantHealth.jpg"
          buttonText="Take Care of Your Health"
          buttonLink="/all-appointments"
      />
      
      
      <HeroComp
        title="Diet and Exercises"
        subtitle="Healthy meal plans to ensure the best nutrition for you and your baby"
        imageUrl="/background/diet-plus-exercise.jpg"
        buttonText="Explore Diet Plans"
        buttonLink="/diet-and-exercise"
      />
    </div>
  );
}


