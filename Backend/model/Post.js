const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    trimester: { type: Number, enum: [1, 2, 3] },
    content: { type: String, required: true },
    tags: [{ type: String, enum: ["Trimester", "Baby", "Mother Care", "Health", "Postpartum"] }],
    
    // Change likes from array to number
    likes: { type: Number, default: 0 }, // Store total likes count
    
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
