import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageCircle, Send, Heart } from "lucide-react";
import axios from "axios";
import moment from "moment";

export default function CommunityPage() {
  const predefinedTags = ["Trimester", "Baby", "Mother Care", "Health", "Postpartum"];

  const [post, setPost] = useState({ healthIssue: "", tags: [] });
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState("");
  const [replyPostId, setReplyPostId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const userId = localStorage.getItem("userId");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



  // Fetch posts based on selected tag
  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  const fetchPosts = async () => {
    try {
      let url = `${BACKEND_URL}/community${selectedTag !== "All" ? `/tag/${selectedTag}` : ""}`;
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      let userId = localStorage.getItem("userId")?.trim();
      if (!userId) {
        console.error("User ID is missing");
        return;
      }

      const post = posts.find((p) => p._id === postId);
      if (!post) return;

      const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
      const hasLiked = likedBy.includes(userId);

      // Optimistic UI update
      const updatedPosts = posts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: hasLiked ? Math.max(p.likes - 1, 0) : p.likes + 1,
              likedBy: hasLiked ? likedBy.filter((id) => id !== userId) : [...likedBy, userId],
            }
          : p
      );
      setPosts(updatedPosts);

      // Send request to like the post
      await axios.post(`/api/posts/${postId}/like`, { userId });
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userId = localStorage.getItem("userId")?.trim();
      const response = await axios.post(`${BACKEND_URL}/community`, {
        userId,
        content: post.healthIssue,
        tags: post.tags,
      });
      setPosts([response.data.post, ...posts]);
      setPost({ healthIssue: "", tags: [] });
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleReplySubmit = async (e, postId) => {
    e.preventDefault();
    try {
      let userId = localStorage.getItem("userId")?.trim();

      console.log(postId),
      console.log(userId),
      console.log(reply)

      const response = await axios.post(`${BACKEND_URL}/community/${postId}/reply`, {
        userId,
        content: reply,
      });


      // Update the posts state with the new reply
      const updatedPosts = posts.map((post) =>
        post._id === postId ? response.data.post : post
      );
      setPosts(updatedPosts);

      setReply("");
      setReplyPostId(null);
    } catch (error) {
      console.error("Error replying:", error);
    }
  };

  const toggleTag = (tag) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const sortedPosts = [...posts].sort((a, b) =>
    sortOrder === "Newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-pink-600 text-center">Pregnancy Community</h1>

      {/* Search Bar */}
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search questions..."
          className="pl-12 py-2 w-full border-2 border-pink-400 focus:border-pink-500 focus:ring-pink-500 rounded-lg shadow-md transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500"
          size={22}
        />
      </div>

      {/* Tags Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {["All", ...predefinedTags].map((tag) => (
          <Button
            key={tag}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium shadow-md ${
              selectedTag === tag
                ? "bg-pink-500 text-white border border-pink-600"
                : "bg-white text-pink-500 border border-pink-500 hover:bg-pink-100"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Sort By */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Sort by:</span>
        <Button
          className="bg-purple-500 text-white"
          onClick={() => setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest")}
        >
          {sortOrder}
        </Button>
      </div>

      {/* Post Submission Form */}
      <Card className="p-4 bg-pink-100 shadow-lg rounded-2xl border border-pink-300">
        <Textarea
          placeholder="Share your experience or ask a question..."
          value={post.healthIssue}
          onChange={(e) => setPost({ ...post, healthIssue: e.target.value })}
          className="p-3 border-2 border-pink-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-lg bg-white"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {predefinedTags.map((tag) => (
            <Button
              key={tag}
              className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium shadow-md ${
                post.tags.includes(tag)
                  ? "bg-pink-500 text-white border border-pink-600"
                  : "bg-pink-200 text-pink-800 border border-pink-300 hover:bg-pink-300"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-200"
        >
          Post
        </Button>
      </Card>

      {/* Display Posts */}
      <div className="space-y-6">
        {sortedPosts
          .filter((p) => p.content.toLowerCase().includes(search.toLowerCase()))
          .map((post) => (
            <Card key={post._id} className="p-6 bg-pink-50 shadow-md rounded-lg border border-pink-200">
              <CardContent>
                <p className="font-bold text-xl text-pink-700">{post.content}</p>
                <p className="text-sm text-pink-500">{moment(post.createdAt).fromNow()}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-pink-200 text-pink-700 text-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Like & Reply Buttons */}
                <div className="flex items-center gap-6 mt-4">
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 text-lg ${
                      post.likedBy?.includes(userId) ? "text-red-500" : "text-pink-500"
                    } hover:text-red-700`}
                    onClick={() => toggleLike(post._id)}
                  >
                    <Heart size={20} fill={post.likedBy?.includes(userId) ? "currentColor" : "none"} />
                    {post.likes} Likes
                  </Button>

                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-lg text-pink-500 hover:text-pink-700"
                    onClick={() => setReplyPostId(replyPostId === post._id ? null : post._id)}
                  >
                    <MessageCircle size={20} /> {post.replies.length} Replies
                  </Button>
                </div>

                {/* Replies Section */}
                {replyPostId === post._id && (
                  <div className="mt-4 border-t pt-4">
                    {post.replies.map((reply, index) => (
                      <div key={index} className="p-3 bg-pink-100 rounded-md mb-2">
                        <p className="text-md text-pink-800">{reply.content}</p>
                        <p className="text-xs text-pink-500">{moment(reply.createdAt).fromNow()}</p>
                      </div>
                    ))}
                    <div className="mt-2 flex gap-2">
                      <Textarea
                        className="flex-1 border-pink-300 focus:ring-pink-400"
                        placeholder="Write a reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                      />
                      <Button
                        className="bg-pink-500 text-white hover:bg-pink-600"
                        onClick={(e) => handleReplySubmit(e, post._id)}
                      >
                        <Send size={20} />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}