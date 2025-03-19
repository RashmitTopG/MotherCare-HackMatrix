import React from 'react';
import { Calendar, Clock, Utensils, Heart, Activity, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  // Calculate pregnancy week (example)
  const currentWeek = 24;
  const totalWeeks = 40;
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  return (
    <div className="space-y-6 mt-35">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pregnancy Progress</h2>
            <span className="text-sm font-medium text-pink-600">Week {currentWeek}</span>
          </div>
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-pink-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Week 1</span>
            <span>Week 40</span>
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Baby's Development</h3>
            <p className="text-gray-600">
              Your baby is now about the size of a corn on the cob. Their inner ear is developing, which means they may start responding to sounds.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Summary</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-700">Doctor's Appointment</h3>
                <p className="text-sm text-gray-500">10:30 AM - Dr. Rohit Sharma</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Utensils className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-700">Nutrition Goal</h3>
                <p className="text-sm text-gray-500">1,800 calories - 75% completed</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-700">Activity</h3>
                <p className="text-sm text-gray-500">30 min prenatal yoga</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">View all</button>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-pink-500 pl-4 py-1">
              <p className="text-sm text-gray-500">May 15, 2025</p>
              <h3 className="font-medium text-gray-700">Ultrasound Scan</h3>
              <p className="text-sm text-gray-600">Dr. Rohit Sharma - RS Health Center</p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4 py-1">
              <p className="text-sm text-gray-500">May 28, 2025</p>
              <h3 className="font-medium text-gray-700">Regular Checkup</h3>
              <p className="text-sm text-gray-600">Dr. Nauman Tamboli - Tamboli Clinic</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Diet Tracker</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">View plan</button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Protein</span>
              <span className="text-sm font-medium text-gray-700">65g / 75g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Calcium</span>
              <span className="text-sm font-medium text-gray-700">800mg / 1000mg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Iron</span>
              <span className="text-sm font-medium text-gray-700">18mg / 27mg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '67%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Health Metrics</h2>
            <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">Update</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Blood Pressure</p>
                <p className="font-medium text-gray-700">118/75 mmHg</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-medium text-gray-700">{localStorage.getItem("postWeight")}(+0.5 kg)</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-pink-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Sleep</p>
                <p className="font-medium text-gray-700">7.5 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Join our prenatal yoga class</h2>
            <p className="text-pink-100 max-w-xl">Connect with other moms-to-be and stay active with our weekly online prenatal yoga sessions.</p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-lg font-medium flex items-center">
            Join Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;