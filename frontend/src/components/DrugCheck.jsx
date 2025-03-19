import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

const DrugCheck = () => {
    const [medicines, setMedicines] = useState("");
    const [drug, setDrug] = useState("");
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState(null); // Track which button is active

    const handleCheck = async (endpoint, body, buttonType) => {
        setLoading(true);
        setActiveButton(buttonType); // Disable other buttons

        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (endpoint === "giveSuggestiveDrug" && typeof data === "string") {
                const cleanedData = data
                    .replace(/\\n/g, "\n")
                    .split("\n")
                    .map((item) => item.trim())
                    .filter((item) => item.length > 0);

                setResult2({ substitutes: cleanedData });
            } else {
                setResult1(data);
            }
        } catch (error) {
            console.error("Error:", error);
            setResult1({ error: "Something went wrong" });
        }

        setLoading(false);
        setActiveButton(null); // Re-enable all buttons after completion
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50 p-10">
            <Card className="w-full max-w-4xl bg-white shadow-2xl border border-pink-400 rounded-2xl p-8">
                <CardHeader className="bg-pink-200 rounded-t-2xl p-6 text-center">
                    <CardTitle className="text-pink-700 text-3xl font-extrabold">
                        Drug Safety Checker
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    
                    {/* Medicines Input */}
                    <Input
                        type="text"
                        placeholder="Enter Medicines (comma-separated)"
                        value={medicines}
                        onChange={(e) => setMedicines(e.target.value)}
                        className="border border-pink-400 p-4 text-lg focus:ring-pink-500 rounded-lg"
                    />
                    
                    {/* Interaction & Precaution Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={() => handleCheck("GivePres", { AllMedicines: medicines }, "interactions")}
                            disabled={loading && activeButton !== "interactions"}
                            className={`p-4 text-lg ${
                                activeButton === "interactions"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-pink-600 hover:bg-pink-700"
                            }`}
                        >
                            {loading && activeButton === "interactions" ? (
                                <Loader className="animate-spin" size={22} />
                            ) : (
                                "Check Interactions"
                            )}
                        </Button>
                        <Button
                            onClick={() => handleCheck("givePrecautions", { AllMedicines: medicines }, "precautions")}
                            disabled={loading && activeButton !== "precautions"}
                            className={`p-4 text-lg ${
                                activeButton === "precautions"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-pink-600 hover:bg-pink-700"
                            }`}
                        >
                            {loading && activeButton === "precautions" ? (
                                <Loader className="animate-spin" size={22} />
                            ) : (
                                "Check Food Precautions"
                            )}
                        </Button>
                    </div>

                    {/* Drug Input */}
                    <Input
                        type="text"
                        placeholder="Enter Drug Name"
                        value={drug}
                        onChange={(e) => setDrug(e.target.value)}
                        className="border border-pink-400 p-4 text-lg focus:ring-pink-500 rounded-lg"
                    />
                    
                    {/* Find Substitute Button */}
                    <Button
                        onClick={() => handleCheck("giveSuggestiveDrug", { Drug: drug }, "substitute")}
                        disabled={loading && activeButton !== "substitute"}
                        className={`w-full p-4 text-lg ${
                            activeButton === "substitute"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-pink-600 hover:bg-pink-700"
                        }`}
                    >
                        {loading && activeButton === "substitute" ? (
                            <Loader className="animate-spin" size={22} />
                        ) : (
                            "Find Substitute"
                        )}
                    </Button>

                    {/* Result 1 (Interactions, Precautions, etc.) */}
                    {result1 && (
                        <Card className="mt-6 p-6 bg-pink-100 border border-pink-400 rounded-xl shadow-lg">
                            <h3 className="text-pink-700 font-bold text-xl mb-3">Result:</h3>
                            {result1.error ? (
                                <p className="text-red-500 font-semibold">{result1.error}</p>
                            ) : Array.isArray(result1) ? (
                                result1.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg text-gray-800 shadow-md border border-gray-300 mb-3">
                                        <p className="text-lg font-semibold">{item.Elem}</p>
                                        <p className="text-sm text-gray-600">{item.text}</p>
                                        {item.Data && (
                                            <ul className="mt-2 list-disc list-inside text-gray-700">
                                                {item.Data.map((dataItem, i) => (
                                                    <li key={i}>{dataItem}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg font-semibold text-gray-700">{JSON.stringify(result1, null, 2)}</p>
                            )}
                        </Card>
                    )}

                    {/* Result 2 (Substitutes) */}
                    {result2 && (
                        <Card className="mt-6 p-6 bg-pink-100 border border-pink-400 rounded-xl shadow-lg">
                            <h3 className="text-pink-700 font-bold text-xl mb-3">Drug Substitutes:</h3>
                            {result2.substitutes ? (
                                <ul className="mt-2 list-disc list-inside text-gray-700">
                                    {result2.substitutes.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-lg font-semibold text-gray-700">{JSON.stringify(result2, null, 2)}</p>
                            )}
                        </Card>
                    )}

                </CardContent>
            </Card>
        </div>
    );
};

export default DrugCheck;
