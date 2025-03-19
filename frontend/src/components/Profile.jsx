import React, { useState } from 'react';
import { Save, Edit2, User, Calendar, Heart, Activity } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name:  `${localStorage.getItem("name")}`,
    email: `${localStorage.getItem("email")}`,
    dueDate: `${localStorage.getItem("dueDate")}`,
    age: `${localStorage.getItem("age")}`,
    height: `${localStorage.getItem("height")}`,
    prePregnancyWeight: `${localStorage.getItem("preWeight")}`,
    currentWeight:`${localStorage.getItem("postWeight")}`,
    bloodType: `${localStorage.getItem("bloodGroup")}`,
    allergies: ['Peanuts', 'Shellfish'],
    medicalConditions: localStorage.getItem("medicalConditions") 
    ? JSON.parse(localStorage.getItem("medicalConditions"))  // ✅ Convert back to an array
    : []
  });

  const [editableProfile, setEditableProfile] = useState({ ...profile });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfile(editableProfile);
    } else {
      // Start editing
      setEditableProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleArrayInputChange = (field, value) => {
    setEditableProfile({
      ...editableProfile,
      [field]: value.split(',').map((item) => item.trim()).filter((item) => item !== ''),
    });
  };

  // Calculate weeks pregnant
  const calculateWeeksPregnant = () => {
    const dueDate = new Date(profile.dueDate);
    const today = new Date();
    const pregnancyDuration = 40 * 7 * 24 * 60 * 60 * 1000; // 40 weeks in milliseconds
    const conceptionDate = new Date(dueDate.getTime() - pregnancyDuration);
    const daysSinceConception = Math.floor((today.getTime() - conceptionDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.floor(daysSinceConception / 7);
  };

  const weeksPregnant = calculateWeeksPregnant();

  return (
    <div className="space-y-4 p-4 mt-26">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
        <button
          onClick={handleEditToggle}
          className={`${
            isEditing
              ? 'bg-pink-500 hover:bg-pink-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          } px-3 py-1.5 rounded-md flex items-center text-sm`}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-pink-50 p-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-3">
              <User className="h-12 w-12 text-pink-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{profile.name}</h2>
            <p className="text-sm text-gray-600 mb-3">{profile.email}</p>

            <div className="w-full bg-white rounded-lg p-3 mb-3">
              <div className="flex items-center mb-1">
                <Calendar className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Due Date</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">
                {new Date(profile.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-pink-600 mt-1">Week {weeksPregnant} of pregnancy</p>
            </div>

            <div className="w-full bg-white rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Heart className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Health Summary</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Blood Type:</span>
                  <span className="text-xs font-medium text-gray-800">{profile.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Age:</span>
                  <span className="text-xs font-medium text-gray-800">{profile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Height:</span>
                  <span className="text-xs font-medium text-gray-800">{profile.height} cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editableProfile.name}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editableProfile.email}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dueDate"
                    value={editableProfile.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">
                    {new Date(profile.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editableProfile.age}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.age} years</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="height"
                    value={editableProfile.height}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.height} cm</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                {isEditing ? (
                  <select
                    name="bloodType"
                    value={editableProfile.bloodType}
                    onChange={(e) => setEditableProfile({ ...editableProfile, bloodType: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-800 text-sm">{profile.bloodType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-Pregnancy Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="prePregnancyWeight"
                    value={editableProfile.prePregnancyWeight}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.prePregnancyWeight} kg</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="currentWeight"
                    value={editableProfile.currentWeight}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                ) : (
                  <p className="text-gray-800 text-sm">{profile.currentWeight} kg</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                {isEditing ? (
                  <textarea
                    value={editableProfile.allergies.join(', ')}
                    onChange={(e) => handleArrayInputChange('allergies', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Enter allergies separated by commas"
                    rows={2}
                  />
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {profile.allergies.length > 0 ? (
                      profile.allergies.map((allergy, index) => (
                        <span key={index} className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No allergies</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                {isEditing ? (
                  <textarea
                    value={editableProfile.medicalConditions.join(', ')}
                    onChange={(e) => handleArrayInputChange('medicalConditions', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
                    placeholder="Enter medical conditions separated by commas"
                    rows={2}
                  />
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {profile.medicalConditions.length > 0 ? (
                      profile.medicalConditions.map((condition, index) => (
                        <span key={index} className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                          {condition}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No medical conditions</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-3 bg-pink-50 rounded-lg">
              <h3 className="text-md font-semibold text-gray-800 mb-2 flex items-center">
                <Activity className="h-4 w-4 text-pink-500 mr-2" />
                Pregnancy Progress
              </h3>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (weeksPregnant / 40) * 100)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-pink-700 whitespace-nowrap">Week {weeksPregnant}/40</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {weeksPregnant <= 13
                  ? "First Trimester: Your baby's major organs are forming."
                  : weeksPregnant <= 26
                  ? "Second Trimester: Your baby is growing rapidly and you may feel movement."
                  : "Third Trimester: Your baby is gaining weight and preparing for birth."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;