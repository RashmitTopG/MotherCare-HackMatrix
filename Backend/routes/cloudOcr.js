const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OCR_API_URL = "http://127.0.0.1:5000/ocr"; // Replace with your deployed URL

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dsd6kt4v5', 
    api_key: '996386968544176', 
    api_secret: 'd4AG15Xm8-ODQEQX0meygvKfK0I' // Click 'View API Keys' above to copy your API secret
});

// Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/extract", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    try {
        // Upload image to Cloudinary
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "prescriptions" },
                (error, result) => (error ? reject(error) : resolve(result))
            );
            uploadStream.end(req.file.buffer);
        });

        const imageUrl = cloudinaryResponse.secure_url;
        console.log("Uploaded Image URL:", imageUrl);

        // Call the OCR Python API
        const ocrResponse = await axios.post(OCR_API_URL, { image_url: imageUrl });
        const extractedText = ocrResponse.data.text;

        if (!extractedText) {
            return res.status(500).json({ error: "No valid text detected in image" });
        }

        console.log("Extracted OCR Text:", extractedText);

        // Process text with Gemini API
        const structuredData = await extractMedicineDetails(extractedText);

        res.json({
            text: extractedText,
            structured: structuredData
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * Function to extract structured medicine details using Gemini API
 */
async function extractMedicineDetails(extractedText) {
    try {
        const prompt = `Extract structured medical details from the following prescription text.
        Return a JSON array without markdown.
        Format:
        [
            {"medicineName": "Medicine1", "purpose": "Purpose1", "uses": "Uses1", "sideEffects": "Side effects1"},
            {"medicineName": "Medicine2", "purpose": "Purpose2", "uses": "Uses2", "sideEffects": "Side effects2"}
        ]

        Prescription text:
        ${extractedText}
    `;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            { contents: [{ parts: [{ text: prompt }] }] },
            { params: { key: GEMINI_API_KEY } }
        );

        let jsonText = response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() || "{}";
        jsonText = jsonText.replace(/```json|```/g, "").trim();

        console.log("Extracted JSON:", jsonText);
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return { medicineNames: [], purpose: "Not available", uses: "Not available", sideEffects: "Not available" };
    }
}

module.exports = router;