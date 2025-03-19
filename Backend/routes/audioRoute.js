const express = require("express");
const router = express.Router();
const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = "PLAxK7D2m8t2oJOH1_MCB0PPhkuY6CxAq6"; // Replace with actual YouTube Playlist ID

router.get("/youtube-audio", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: "snippet",
          maxResults: 10,
          playlistId: PLAYLIST_ID,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json(videos);
  } catch (error) {
    console.error("Error fetching YouTube data:", error); // Log the error
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
});

module.exports = router;