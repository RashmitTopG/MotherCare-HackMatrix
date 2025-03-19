import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaCapsules, FaClipboardList, FaHeartbeat, FaExclamationCircle } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const CloudOcr = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [text, setText] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showFullText, setShowFullText] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image!");
            return;
        }
        setError("");
        setLoading(true);
        setText("");
        setMedicines([]);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(`${BACKEND_URL}/extract`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setText(response.data.text);
            setMedicines(response.data.structured || []);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to extract text or fetch medicine details.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center p-12">
            
            <div className="w-full max-w-4xl ">


                <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">📜 Prescription Analyzer</h1>

                {/* How It Works Section */}
                
                <Card className="bg-white shadow-2xl rounded-2xl border border-pink-400 p-8 w-full">
                    <CardContent>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 p-2 border rounded w-full" />
                        {preview && <img src={preview} alt="Preview" className="w-full h-40 object-contain mb-4 rounded-lg border" />}
                        <button onClick={handleUpload} className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:opacity-50" disabled={loading}>
                            {loading ? "Processing..." : "Upload & Extract"}
                        </button>
                    </CardContent>
                </Card>

                {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded w-full text-center">{error}</div>}

                {text && (
                    <Card className="mt-6 bg-white shadow-2xl rounded-2xl border border-pink-400 p-8">
                        <CardHeader>
                            <h2 className="text-2xl font-semibold text-gray-800">📝 Extracted Prescription</h2>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 whitespace-pre-line">
                                {showFullText ? text : text.substring(0, 300)}
                                {text.length > 300 && (
                                    <button className="ml-2 text-pink-500 underline" onClick={() => setShowFullText(!showFullText)}>
                                        {showFullText ? "Show Less" : "More Info"}
                                    </button>
                                )}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {medicines.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-3xl font-semibold text-pink-800 mb-4 text-center">💊 Medicine Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {medicines.map((medicine, index) => (
                                <Card key={index} className="bg-white shadow-lg rounded-2xl border border-gray-300 p-6">
                                    <CardHeader>
                                        <h3 className="text-xl font-bold text-pink-700 flex items-center">
                                            <FaCapsules className="mr-2 text-gray-600" />
                                            {medicine.medicineName}
                                        </h3>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 flex items-center">
                                            <FaClipboardList className="mr-2 text-gray-500" />
                                            <span><strong>Purpose:</strong> {medicine.purpose || "Not available"}</span>
                                        </p>
                                        <p className="text-gray-700 flex items-center mt-2">
                                            <FaHeartbeat className="mr-2 text-green-500" />
                                            <span><strong>Uses:</strong> {medicine.uses || "Not available"}</span>
                                        </p>
                                        <div className="text-gray-700 mt-2">
                                            <div className="flex items-center text-red-500">
                                                <FaExclamationCircle className="mr-2" />
                                                <strong>Side Effects:</strong>
                                            </div>
                                            <ul className="list-disc pl-6 text-gray-600 text-sm mt-1">
                                                {medicine.sideEffects
                                                    ? medicine.sideEffects.split(",").map((effect, i) => (
                                                        <li key={i} className="mt-1">{effect.trim()}</li>
                                                    ))
                                                    : <li>Not available</li>
                                                }
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CloudOcr;
