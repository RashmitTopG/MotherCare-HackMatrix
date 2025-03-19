import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Video1 from "../assets/preNatal.mp4";

export default function PreNatalCare() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-12">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-pink-800 mb-12 text-center drop-shadow-lg">
          Prenatal Care Guide 🤰💖
        </h1>

        <div className="space-y-10">
          {/* Nutrition & Diet */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-pink-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-pink-800 flex items-center">
                🍼 Nutrition & Diet
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl">
                <li>
                  Eat a balanced diet rich in <b>folic acid, iron, and calcium</b>.
                </li>
                <li>
                  Stay hydrated with <b>at least 8 glasses of water</b> daily.
                </li>
                <li>
                  Limit <b>caffeine</b> and avoid alcohol & tobacco.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Safe Exercises */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-pink-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-pink-800 flex items-center">
                🏃‍♀️ Safe Exercises
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl">
                <li>
                  Engage in <b>light exercises</b> like walking & prenatal yoga.
                </li>
                <li>Avoid high-impact or risky activities.</li>
                <li>
                  Listen to your body and <b>rest when needed</b>.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Medical Checkups */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-pink-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-pink-800 flex items-center">
                🏥 Medical Checkups
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl">
                <li>
                  Schedule <b>regular doctor visits</b> for monitoring.
                </li>
                <li>
                  Take <b>prenatal vitamins</b> as prescribed.
                </li>
                <li>
                  Get necessary <b>screenings and vaccinations</b>.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Healthy Lifestyle */}
          <Card className="bg-white shadow-2xl rounded-2xl border border-pink-400 p-8 transition-transform transform hover:scale-105 w-full">
            <CardHeader>
              <h2 className="text-4xl font-bold text-pink-800 flex items-center">
                🌿 Healthy Lifestyle
              </h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-4 text-xl">
                <li>
                  Manage stress with <b>meditation</b> and deep breathing.
                </li>
                <li>
                  Ensure <b>quality sleep</b> and maintain good posture.
                </li>
                <li>
                  Build a <b>strong support system</b> for emotional well-being.
                </li>
              </ul>

              {/* Advice from Our Doctors */}
              <h3 className="text-3xl font-semibold text-pink-800 mt-10 text-center">
                🎥 Advice from Our Doctors
              </h3>
              <div className="flex justify-center mt-6">
                <div className="rounded-xl overflow-hidden shadow-lg bg-pink-100 p-6 w-full max-w-lg">
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
