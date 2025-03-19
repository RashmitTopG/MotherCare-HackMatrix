const express = require("express");
const Post = require("../model/Post");
const HealthProfile = require("../model/healthProfile");
const mongoose = require("mongoose");

const router = express.Router();

// ✅ Create a new post (Auto-fetch trimester & allow tags)
router.post("/", async (req, res) => {
    try {
        const { userId, content, tags } = req.body;

        // Fetch trimester from HealthProfile
        const healthProfile = await HealthProfile.findOne({ userId });
        if (!healthProfile) {
            return res.status(400).json({ message: "Health Profile not found! Please complete it first." });
        }

        const post = new Post({ 
            userId, 
            trimester: healthProfile.trimester, 
            content, 
            tags 
        });
        await post.save();

        res.status(201).json({ message: "Post created successfully!", post });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get all posts (Sorted by latest, includes user details)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "name email") // Fetch user's name and email
            .populate("replies.userId", "name email")
            .sort({ createdAt: -1 }); // Sort by latest
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get posts by trimester (Auto-fetched from HealthProfile)
router.get("/trimester/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user's trimester
        const healthProfile = await HealthProfile.findOne({ userId });
        if (!healthProfile) return res.status(400).json({ message: "Health Profile not found!" });

        const posts = await Post.find({ trimester: healthProfile.trimester })
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Get posts by tag (e.g., "Baby", "Mother Care")
router.get("/tag/:tag", async (req, res) => {
    try {
        const { tag } = req.params;
        const posts = await Post.find({ tags: tag })
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Reply to a post
router.post("/:postId/reply", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, content } = req.body;

        // Debugging: Log the received data
        console.log("Received request to reply to post:", postId);
        console.log("User ID:", userId);
        console.log("Content:", content);

        // Validate input
        if (!userId || !content) {
            return res.status(400).json({ message: "User ID and content are required" });
        }

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Add the reply
        post.replies.push({ userId, content });
        await post.save();

        // Debugging: Log the updated post
        console.log("Updated post with new reply:", post);

        res.status(201).json({ message: "Reply added!", post });
    } catch (error) {
        console.error("Error replying to post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// ✅ Delete my own post
router.delete("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findOne({ _id: postId, userId });
        if (!post) return res.status(403).json({ message: "Unauthorized or Post not found" });

        await Post.findByIdAndDelete(postId);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;