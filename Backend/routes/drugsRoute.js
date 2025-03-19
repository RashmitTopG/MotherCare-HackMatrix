const express = require("express");
const router = express.Router();
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyDWhFONakezFbG_AmmxMzS9IZs1uTRY5h0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// FastAPI Base URL
const FASTAPI_URL = "http://127.0.0.1:8000";

router.post("/GivePres", async (req, res) => {
    try {
        const { AllMedicines } = req.body;
        const response = await axios.post(`${FASTAPI_URL}/check/${AllMedicines}`);

        let responseData = response.data;
        let results = [];

        // Function to get Gemini response
        async function GenerateGeminiResponse(elem) {
            const prompt = `Justify this Sentence: "${elem}" in 200 words and tell the level of severity of non-compatibleness.`;
            const result = await model.generateContent(prompt);
            const geminiResponse = await result.response;
            const text = geminiResponse.text();

            return {
                Elem: elem,
                text: text,
                Data: responseData
            };
        }

        // Process response and get Gemini output if necessary
        for (let elem of responseData) {
            if (!elem.includes("are compatible") && !elem.includes("Sorry for the inconvenience")) {
                const geminiResult = await GenerateGeminiResponse(elem);
                results.push(geminiResult);
            }
        }

        res.json(results);
    } catch (error) {
        console.error("Error in /GivePres:", error.message);
        res.status(500).json({ error: "Error fetching drug interactions" });
    }
});

router.post("/givePrecautions", async (req, res) => {
    try {
        const { AllMedicines } = req.body;
        const response = await axios.post(`${FASTAPI_URL}/food/${AllMedicines}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error in /givePrecautions:", error.message);
        res.status(500).json({ error: "Error fetching food precautions" });
    }
});

// Route to get substitute drugs
router.post("/giveSuggestiveDrug", async (req, res) => {
    try {
        const { Drug } = req.body;
        const response = await axios.post(`${FASTAPI_URL}/Suggest/${Drug}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error in /giveSuggestiveDrug:", error.message);
        res.status(500).json({ error: "Error fetching substitute drugs" });
    }
});

// Route to check allergies
router.post("/allergy", async (req, res) => {
    try {
        const { Drug, Content } = req.body;
        const response = await axios.post(`${FASTAPI_URL}/allergy/${Drug}/${Content}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error in /allergy:", error.message);
        res.status(500).json({ error: "Error checking allergy" });
    }
});

module.exports = router;