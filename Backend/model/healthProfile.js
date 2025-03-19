const mongoose = require("mongoose");

const healthProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true, trim: true },
    trimester: { type: Number, required: true, enum: [1, 2, 3] }, // 1st, 2nd, or 3rd trimester
    preWeight: { type: Number, required: true }, // kg (Before pregnancy)
    postWeight: { type: Number, required: true }, // kg (Current weight)
    height: { type: Number, required: true }, // cm
    medicalConditions: { type: [String], default: [], trim: true }, // E.g., ["Anemia", "Diabetes"]
    dueDate: { type: Date, required: false },

    // ✅ Auto-Calculated Fields (Don't store directly, use virtuals or hooks)
    bmi: { type: Number, default: 0 }, // Auto-calculated BMI
    recommendedCalories: { type: Number, default: 0 }, // Based on trimester
    hydrationNeeds: { type: Number, default: 0 }, // Liters per day (Weight * 0.033)
    pregnancyRiskLevel: { type: String, enum: ["Low", "Moderate", "High"], default: "Low" }, // Risk assessment

    createdAt: { type: Date, default: Date.now }
});

// ✅ Auto-calculate fields before saving
healthProfileSchema.pre("save", function (next) {
    this.bmi = this.weight / ((this.height / 100) ** 2);
    this.hydrationNeeds = this.weight * 0.033;

    // ✅ Auto-calculate recommended calories based on trimester
    const calorieIntake = { 1: 1800, 2: 2200, 3: 2400 };
    this.recommendedCalories = calorieIntake[this.trimester];

    // ✅ Auto-determine pregnancy risk based on age & medical conditions
    if (this.age > 35 || this.medicalConditions?.includes("Diabetes") || this.medicalConditions?.includes("Hypertension")) {
        this.pregnancyRiskLevel = "High";
    } else if (this.age >= 30 || this.medicalConditions?.length > 0) {
        this.pregnancyRiskLevel = "Moderate";
    } else {
        this.pregnancyRiskLevel = "Low";
    }

    next();
});

const HealthProfile = mongoose.model("HealthProfile", healthProfileSchema);
module.exports = HealthProfile;