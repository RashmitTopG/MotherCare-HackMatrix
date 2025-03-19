import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sophia Patel",
      feedback: "This app has been a lifesaver during my pregnancy! The diet plans and doctor consultations are incredibly helpful.",
      rating: 5,
      image: "/icons/iconFemale1.jpg",
    },
    {
      name: "Aisha Khan",
      feedback: "I love the baby name suggester! It made choosing the perfect name for my little one so much easier.",
      rating: 4,
      image: "/icons/iconFemale2.jpg",
    },
    {
      name: "Emily Johnson",
      feedback: "The personalized exercises kept me active and healthy throughout my pregnancy. Highly recommend!",
      rating: 5,
      image: "/icons/iconFemale3.jpg",
    },
    {
      name: "Nina Rodriguez",
      feedback: "The community support feature is amazing! I connected with so many moms-to-be and got real-time advice.",
      rating: 4,
      image: "/icons/iconFemale4.jpg",
    },
    {
      name: "Jessica Lee",
      feedback: "The audiobooks are a fantastic addition. They helped me relax and stay informed on pregnancy topics.",
      rating: 4,
      image: "/icons/iconFemale2.jpg",
    },
    {
      name: "Priya Sharma",
      feedback: "Being able to check if my medications were safe during pregnancy gave me so much peace of mind!",
      rating: 5,
      image: "/icons/iconFemale6.jpg",
    },
    {
      name: "Rahul Mehta",
      feedback: "As an expecting father, the partner support section helped me understand my wife's journey and how I could support her better.",
      rating: 5,
      image: "/icons/maleIcon1.jpeg",
    },
    {
      name: "Arjun Verma",
      feedback: "Tracking my wife's symptoms and doctor appointments in one place was a game-changer for us. Super easy to use!",
      rating: 5,
      image: "/icons/maleIcon2.avif",
    },
    {
      name: "Michael Roberts",
      feedback: "The baby growth tracker gave me weekly insights, making me feel more connected to my baby's development.",
      rating: 5,
      image: "/icons/maleIcon3.jpg",
    },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center py-12 px-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/background/testimonialsBack.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#fcfbf3]"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-6xl w-full p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          What Our Users Say
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="bg-white bg-gradient-to-b from-pink-100 to-pink-50 border border-gray-300 shadow-lg rounded-2xl p-6 transition-transform duration-300 hover:scale-105"
            >
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-gray-400 shadow-md">
                  <AvatarImage
                    src={t.image}
                    alt={t.name}
                    className="rounded-full"
                    loading="lazy"
                  />
                </Avatar>
                <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                <p className="text-gray-700 mt-2 text-sm text-center">{t.feedback}</p>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < t.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill={i < t.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
