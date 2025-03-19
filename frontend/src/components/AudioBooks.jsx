import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const YouTubeAudio = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const iframeRef = useRef(null);

  // Fetching videos from the API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/books/youtube-audio")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching YouTube audio data:", error);
      });
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Function to play/pause audio
  const handlePlayAudio = (videoId) => {
    if (playingVideoId === videoId) {
      stopAudio();
    } else {
      setPlayingVideoId(videoId);
      playAudio(videoId);
    }
  };

  // Play YouTube audio in hidden iframe
  const playAudio = (videoId) => {
    if (!window.YT || !window.YT.Player) return;

    if (!iframeRef.current) {
      iframeRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => event.target.playVideo(),
        },
      });
    } else {
      iframeRef.current.loadVideoById(videoId);
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (iframeRef.current) {
      iframeRef.current.stopVideo();
    }
    setPlayingVideoId(null);
  };

  // ✅ Filter videos based on search input
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
        Garbh Sanskar
      </h1>
      <h3 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        Pregnancy Mantras & Audiobooks 🎧
      </h3>

      {/* Search Bar */}
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-lg border border-pink-300 rounded-full px-4 py-3 focus:border-pink-500 focus:ring-pink-300 transition"
        />
      </div>

      {/* Audio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video.videoId}
              className="p-6 bg-pink-100 shadow-lg rounded-2xl transition transform hover:scale-105 hover:shadow-xl text-center"
            >
              {/* Video Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-pink-700">
                {video.title}
              </h3>

              {/* Play/Pause Button */}
              <Button
                onClick={() => handlePlayAudio(video.videoId)}
                className="mt-3 bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded-full"
              >
                {playingVideoId === video.videoId ? "Stop Audio" : "Play Audio"}
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-3 text-center">No audio found.</p>
        )}
      </div>

      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="hidden"></div>
    </div>
  );
};

export default YouTubeAudio;