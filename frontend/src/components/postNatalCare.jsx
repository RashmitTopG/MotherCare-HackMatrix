import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Video1 from "../assets/postNatal.mp4";

export default function PostNatalCare() {
  return (
    <div className="min-h-screen bg-rose-200 flex items-center justify-center p-12">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-rose-800 mb-12 text-center drop-shadow-lg">
          Postnatal Care Guide 👶💕
        </h1>

        <div className="space-y-10">
          {/* Nutrition & Recovery */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-rose-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-rose-800">🥗 Nutrition & Recovery</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-800 space-y-4 text-xl">
                <li>Eat a nutrient-rich diet to aid recovery and boost energy.</li>
                <li>Stay hydrated, especially if breastfeeding.</li>
                <li>Include plenty of protein, fiber, and vitamins.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Physical Recovery */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-rose-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-rose-800">🏋️‍♀️ Physical Recovery</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-800 space-y-4 text-xl">
                <li>Rest and allow your body to heal properly.</li>
                <li>Start gentle exercises like walking when cleared by your doctor.</li>
                <li>Strengthen core muscles gradually.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Emotional Well-Being */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-rose-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-rose-800">💖 Emotional Well-Being</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-800 space-y-4 text-xl">
                <li>Seek support from family, friends, or a postpartum group.</li>
                <li>Watch for signs of postpartum depression and seek help if needed.</li>
                <li>Make time for self-care and rest.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Baby Care */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-rose-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-rose-800">🍼 Baby Care</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-800 space-y-4 text-xl">
                <li>Follow a consistent feeding and sleeping routine.</li>
                <li>Attend pediatric checkups regularly.</li>
                <li>Ensure proper hygiene and care for your newborn.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Doctor Advice Videos */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-rose-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-rose-800">🎥 Advice from Our Doctors</h2>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mt-6">
                <div className="rounded-xl overflow-hidden shadow-lg bg-rose-100 p-6 w-full max-w-lg">
                  <h4 className="text-2xl font-semibold text-gray-800 text-center">
                    Dr. Abhang's Advice
                  </h4>
                  <video className="w-full rounded-lg mt-4 shadow-md" controls>
                    <source src={Video1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
