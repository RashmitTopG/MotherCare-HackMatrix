import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const tips = [
  "Eat a balanced diet rich in vitamins and minerals.",
  "Stay hydrated by drinking plenty of water.",
  "Get regular prenatal checkups to monitor your health.",
  "Exercise moderately to stay active and healthy.",
  "Ensure adequate rest and sleep for well-being.",
  "Manage stress through relaxation techniques.",
  "Avoid alcohol, smoking, and excessive caffeine.",
  "Take prenatal vitamins as recommended by your doctor.",
];

export default function PregnancyTips() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center  mt-10 justify-center min-h-screen px-6 py-16 bg-gradient-to-b from-white to-rose-100">
      {/* Main Card - Sleek and Clean */}
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200 bg-white rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-gray-800 text-4xl font-semibold flex items-center justify-center">
            <Heart className="text-rose-500 mr-2 animate-pulse" size={30} /> Pregnancy Tips
          </CardTitle>
        </CardHeader>

        {/* List of Tips - Clean & Interactive */}
        <CardContent>
          <ul className="space-y-4 text-left">
            {tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start text-gray-700 text-lg bg-gray-50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:bg-rose-100 hover:shadow-md transform hover:scale-[1.02]"
              >
                <CheckCircle className="text-rose-500 mt-1 mr-3" size={22} />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* CTA Button - Clean & Minimalist */}
      <Button
        onClick={() => navigate("/care-guidelines")}
        className="mt-10 bg-rose-600 hover:bg-rose-700 text-white text-lg px-8 py-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:ring focus:ring-rose-300"
      >
        Explore Care Guidelines
      </Button>
    </div>
  );
}
