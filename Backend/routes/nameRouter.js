const express = require("express");
const router = express.Router();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/generate-names", async (req, res) => {
    try {
        const { culture, meaning, letter, gender } = req.body;
        const prompt = `
            Suggest exactly 5 unique baby names for a ${gender} from ${culture} culture
            that mean '${meaning}' and start with '${letter}'. 
            Provide the results in a structured JSON format like this:
            [
                {"name": "Name1", "meaning": "Meaning1", "origin": "Origin1"},
                {"name": "Name2", "meaning": "Meaning2", "origin": "Origin2"},
                {"name": "Name3", "meaning": "Meaning3", "origin": "Origin3"},
                {"name": "Name4", "meaning": "Meaning4", "origin": "Origin4"},
                {"name": "Name5", "meaning": "Meaning5", "origin": "Origin5"}
            ]
            Only return the JSON output, no additional text, no code block formatting.
        `;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { params: { key: GEMINI_API_KEY } }
        );

        // Extract raw text response
        let jsonText = response.data.candidates[0].content.parts[0].text.trim();

        // 🔹 Fix: Remove any markdown code block syntax (like ```json and ```)
        jsonText = jsonText.replace(/```json|```/g, "").trim();

        // Convert text to JSON
        const namesWithMeanings = JSON.parse(jsonText);

        res.json({ names: namesWithMeanings });

    } catch (error) {
        console.error("Error generating names:", error);
        res.status(500).json({ error: "Error generating names" });
    }
});

module.exports = router;