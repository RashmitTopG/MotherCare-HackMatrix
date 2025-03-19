const express = require("express");
const axios = require("axios");
const HealthProfile = require("../model/healthProfile");

const router = express.Router();

// Load API keys from environment variables
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY;
const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const WORKOUT_API_KEY = process.env.WORKOUT_API_KEY;

// ✅ Save or Update User Health Profile
router.post("/", async (req, res) => {
    try {
        console.log("📩 Received Data:", req.body); // Log incoming request data

        const { 
            userId, 
            name, 
            age, 
            bloodGroup, 
            trimester, 
            preWeight, 
            postWeight, 
            height, 
            medicalConditions = [], 
            dueDate 
        } = req.body;

        // ✅ Validate Required Fields
        if (!userId || !name || !age || !bloodGroup || !trimester || !preWeight || !postWeight || !height) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // ✅ Convert String Numbers to Actual Numbers
        const validateNumber = (value) => (isNaN(value) ? null : Number(value));

        // ✅ Ensure medicalConditions is an Array
        const formattedMedicalConditions = Array.isArray(medicalConditions) 
            ? medicalConditions 
            : medicalConditions.split(",").map((item) => item.trim());

        // ✅ Calculate BMI
        const bmi = (validateNumber(postWeight) / ((validateNumber(height) / 100) ** 2)).toFixed(2);

        // ✅ Update or Create the Profile
        const profile = await HealthProfile.findOneAndUpdate(
            { userId },
            { 
                name, 
                age: validateNumber(age),
                bloodGroup, 
                trimester: validateNumber(trimester),
                preWeight: validateNumber(preWeight),
                postWeight: validateNumber(postWeight),
                height: validateNumber(height),
                bmi, 
                medicalConditions: formattedMedicalConditions, 
                dueDate 
            },
            { new: true, upsert: true, runValidators: true }
        );

        console.log("✅ Profile saved:", profile);
        res.status(201).json({ message: "Health Profile Saved!", profile });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// ✅ Fetch Meal Plan from Edamam API (Primary)
const fetchMealPlanFromEdamam = async (trimester, medicalConditions) => {
    const query = medicalConditions.length > 0 ? medicalConditions.join(",") : "pregnancy";
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_API_KEY}`;

    try {
        console.log("Fetching meal plan from Edamam:", url);
        const response = await axios.get(url, {
            headers: { "Edamam-Account-User": "default" } // REQUIRED HEADER
        });

        console.log("Meal Plan API Response:", response.data);
        return response.data.hits.map(meal => meal.recipe.label);
    } catch (error) {
        console.error("Edamam API Error:", error.response?.data || error.message);
        return null; // Return null so we can use the fallback
    }
};

// ✅ Fetch Meal Plan from Spoonacular API (Fallback)
const fetchMealPlanFromSpoonacular = async () => {
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${SPOONACULAR_API_KEY}`;

    try {
        console.log("Fetching meal plan from Spoonacular:", url);
        const response = await axios.get(url);
        return response.data.meals.map(meal => meal.title);
    } catch (error) {
        console.error("Spoonacular API Error:", error.response?.data || error.message);
        return ["Meal plan not available"];
    }
};

// ✅ Fetch Exercise Plan from Workout API
const fetchExercisePlan = async () => {
    const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`;
    try {
        console.log("Fetching exercise plan from:", url);
        const response = await axios.get(url, { headers: { "X-Api-Key": WORKOUT_API_KEY } });
        console.log("Exercise Plan API Response:", response.data);
        return response.data.map(exercise => exercise.name);
    } catch (error) {
        console.error("Exercise Plan API Error:", error.response?.data || error.message);
        return ["Exercise plan not available"];
    }
};

// ✅ API Endpoint: Get AI-Based Meal & Exercise Plan
router.get("/recommend/:userId", async (req, res) => {
    try {
        const profile = await HealthProfile.findOne({ userId: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profile Not Found" });

        let mealPlan = await fetchMealPlanFromEdamam(profile.trimester, profile.medicalConditions);
        if (!mealPlan) {
            console.log("Edamam API failed, switching to Spoonacular...");
            mealPlan = await fetchMealPlanFromSpoonacular();
        }

        const exercisePlan = await fetchExercisePlan();

        res.json({ mealPlan, exercisePlan });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ API Endpoint: Get User Info
router.get("/userinfo/:userId", async (req, res) => {
    try {
        const profile = await HealthProfile.findOne({ userId: req.params.userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile Not Found" });
        }

        // ✅ Respond with all fields from the schema
        res.json(profile);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;