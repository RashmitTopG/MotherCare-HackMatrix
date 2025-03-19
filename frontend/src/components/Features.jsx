import { Baby, Heart, Stethoscope, Dumbbell, MessageSquare, ShoppingBag } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Baby className="w-16 h-16 text-pink-500" />,
      title: "Pregnancy Tips",
      description: "Get expert-backed tips to ensure a safe and healthy pregnancy journey.",
    },
    {
      icon: <Stethoscope className="w-14 h-14 text-pink-500" />,
      title: "Find Doctors",
      description: "Easily connect with certified doctors for expert medical advice and checkups.",
    },
    {
      icon: <Heart className="w-14 h-14 text-pink-500" />,
      title: "Health Tracking",
      description: "Monitor your pregnancy health with smart tracking tools and alerts.",
    },
    {
      icon: <Dumbbell className="w-14 h-14 text-pink-500" />,
      title: "Diet & Exercises",
      description: "Follow a balanced diet plan and safe pregnancy workouts for well-being.",
    },
    {
      icon: <MessageSquare className="w-14 h-14 text-pink-500" />,
      title: "Community",
      description: "Join a supportive community of moms and experts for real-time advice.",
    },
    {
      icon: <ShoppingBag className="w-14 h-14 text-pink-500" />,
      title: "Baby Essentials",
      description: "Shop curated maternity and baby care essentials with ease.",
    },
  ];

  return (
    <div className="bg-pink-50 py-12 px-6">
      <h2 className="text-center text-3xl font-bold text-pink-600 mb-8 max-w-5xl mx-auto">Why Choose Us?</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-row items-start bg-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-110 hover:shadow-2xl  hover:-translate-y-2 duration-300 ease-out gap-4"
          >
            {feature.icon}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
