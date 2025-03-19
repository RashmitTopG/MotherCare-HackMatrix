const express = require("express");
const router = express.Router();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure this is set in your .env file

router.post("/chatbot", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        if (!userMessage) {
            return res.status(400).json({ reply: "Please provide a message." });
        }

        const prompt = `
            User asked: "${userMessage}". Provide pregnancy-related advice in a helpful manner in very short and answer like you are chatbot made by Mothercare and be polite.
        `;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            { params: { key: GEMINI_API_KEY } }
        );

        let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Sorry, I couldn't generate a response.";

        // 🔹 Fix: Remove potential markdown formatting (e.g., ⁠  and  ⁠json)
        aiResponse = aiResponse.replace(/⁠  json|  ⁠/g, "").trim();

        res.json({ reply: aiResponse });

    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ reply: "Sorry, I couldn't process that right now." });
    }
});

module.exports = router;