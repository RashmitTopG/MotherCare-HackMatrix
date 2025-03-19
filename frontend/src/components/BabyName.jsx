import { useState } from "react";
import axios from "axios";

export default function BabyName() {
    const [culture, setCulture] = useState("");
    const [meaning, setMeaning] = useState("");
    const [letter, setLetter] = useState("");
    const [gender, setGender] = useState("");
    const [suggestedNames, setSuggestedNames] = useState([]);
    const [message, setMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!culture || !meaning || !letter || !gender) {
            setMessage("All fields are required!");
            return;
        }

        const requestData = { culture, meaning, letter, gender };

        try {
            const response = await axios.post("http://localhost:3000/names/generate-names", requestData, {
                headers: { "Content-Type": "application/json" }
            });
        
            const data = response.data.names;
            setSuggestedNames(data);
        } catch (error) {
            setMessage("Error fetching names. Please try again.");
        }
    };

    return (
        <div className="bg-pink-100 min-h-screen flex flex-col items-center py-10">
            <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-md">
                <h2 className="text-pink-600 text-2xl font-bold text-center">Suggest a Baby Name</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Culture Dropdown */}
                    <select value={culture} onChange={(e) => setCulture(e.target.value)} className="w-full px-4 py-2 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500">
                        <option value="">Select Culture</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Sikh">Sikh</option>
                        <option value="Christian">Christian</option>
                        <option value="Buddhist">Buddhist</option>
                        <option value="Jain">Jain</option>
                        <option value="Parsi">Parsi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="South Indian">South Indian</option>
                        <option value="Western">Western</option>
                        <option value="Greek">Greek</option>
                    </select>

                    <input type="text" placeholder="Meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} className="w-full px-4 py-2 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500"/>
                    <input type="text" placeholder="Starting Letter" value={letter} onChange={(e) => setLetter(e.target.value)} className="w-full px-4 py-2 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500"/>
                    
                    {/* Gender Dropdown */}
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-4 py-2 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>

                    <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition">Get Baby Names</button>
                </form>

                {message && <p className="text-center mt-4 text-pink-600">{message}</p>}
            </div>

            {suggestedNames.length > 0 && (
                <div className="bg-white shadow-lg p-6 rounded-xl mt-6 w-full max-w-md">
                    <h3 className="text-pink-600 text-xl font-bold text-center">Suggested Names:</h3>
                    <ul className="mt-4 space-y-2">
                        {suggestedNames.map((nameObj, index) => (
                            <li key={index} className="text-center bg-pink-200 py-2 px-4 rounded-md">
                                <strong>{nameObj.name}</strong> - {nameObj.meaning} ({nameObj.origin})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
