import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Book, ListChecks, Utensils, PhoneCall, Pill, Baby } from "lucide-react";

export default function MoreFeatures() {
  const features = [
    { icon: <Utensils className="w-12 h-12 text-pink-600" />, title: "Personalized Diet", description: "Get a customized diet plan tailored for your pregnancy stage and health needs." },
    { icon: <ListChecks className="w-12 h-12 text-pink-600" />, title: "Personalized Exercises", description: "Safe and effective pregnancy workouts designed just for you." },
    { icon: <Book className="w-12 h-12 text-pink-600" />, title: "Audio Books", description: "Relax with pregnancy and parenting audiobooks on the go." },
    { icon: <Baby className="w-12 h-12 text-pink-600" />, title: "Baby Name Suggester", description: "Discover the perfect name for your baby with AI-powered suggestions." },
    { icon: <Pill className="w-12 h-12 text-pink-600" />, title: "Drug Checker", description: "Check the safety of medications during pregnancy." },
    { icon: <PhoneCall className="w-12 h-12 text-pink-600" />, title: "One-to-One Doctor Call", description: "Get expert guidance through private video consultations." },
  ];

  return (
    <div className="bg-pink-50 py-10 px-4">
      <h2 className="text-center text-3xl font-bold text-pink-700 mb-8">Additional Features</h2>
      <Carousel 
        plugins={[Autoplay({ delay: 1000, stopOnInteraction: false })]} 
        className="w-full"
        options={{ align: "start", loop: true }}
      >
        <CarouselContent className="flex gap-3 sm:gap-4 items-center">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
              <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-64 h-56 border border-beige-300 hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-in-out">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 text-gray-900 text-center">{feature.title}</h3>
                <p className="text-gray-700 text-center mt-2 text-sm">{feature.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
