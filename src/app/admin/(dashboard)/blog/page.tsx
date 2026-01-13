"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Topic {
  id: string;
  name: string;
  description: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  category: string;
  tags: string[];
  featuredImage: string | null;
  readingTime: number;
  aiGenerated: boolean;
  createdAt: string;
  publishedAt: string | null;
}

interface Counts {
  drafts: number;
  published: number;
  total: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [counts, setCounts] = useState<Counts>({ drafts: 0, published: 0, total: 0 });
  const [activeTab, setActiveTab] = useState<"all" | "draft" | "published">("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // AI Generation state
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [postCount, setPostCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Edit state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const status = activeTab === "all" ? "" : activeTab;
      const res = await fetch(`${API_URL}/api/blog?status=${status}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.data || []);
        setCounts(data.counts || { drafts: 0, published: 0, total: 0 });
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch topics
  const fetchTopics = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog/topics`);
      const data = await res.json();
      if (data.success) {
        setTopics(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTopics();
  }, [activeTab]);

  // Upload image via backend API (uses Cloudinary on server)
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        console.error("Upload failed:", data.error);
        alert(`Upload failed: ${data.error}`);
        return null;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
      return null;
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPost) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Maximum size is 5MB.');
      return;
    }

    setIsUploading(true);
    const url = await uploadImage(file);
    if (url && editingPost) {
      setEditingPost({ ...editingPost, featuredImage: url });
    }
    setIsUploading(false);
  };

  // Generate posts with AI
  const handleGenerate = async () => {
    if (!selectedTopic || postCount < 1) return;
    
    setIsGenerating(true);

    try {
      const res = await fetch(`${API_URL}/api/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, count: postCount }),
      });

      const data = await res.json();
      
      if (data.success) {
        alert(`✅ Successfully generated ${data.data.generated} posts!`);
        setShowGenerator(false);
        setSelectedTopic("");
        setPostCount(1);
        fetchPosts();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert("❌ Failed to generate posts. Check your API configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Publish post
  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}/publish`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to publish:", error);
    }
  };

  // Unpublish post
  const handleUnpublish = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}/unpublish`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to unpublish:", error);
    }
  };

  // Delete post
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  // Update post
  const handleUpdate = async () => {
    if (!editingPost) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/${editingPost._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingPost.title,
          excerpt: editingPost.excerpt,
          content: editingPost.content,
          featuredImage: editingPost.featuredImage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowEditor(false);
        setEditingPost(null);
        fetchPosts();
        alert("✅ Post updated successfully!");
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to update:", error);
      alert("❌ Failed to update post");
    } finally {
      setIsSaving(false);
    }
  };

  // Format date safely
  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "No date";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      });
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">AI-Powered Content Creation</p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Generate Posts
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Posts", value: counts.total, color: "bg-blue-500" },
          { label: "Drafts", value: counts.drafts, color: "bg-amber-500" },
          { label: "Published", value: counts.published, color: "bg-green-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                {stat.value}
              </div>
              <span className="text-gray-600 font-medium">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        {(["all", "draft", "published"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-4">Use AI to generate your first blog posts!</p>
            <button
              onClick={() => setShowGenerator(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Generate Posts
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === "published" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {post.status}
                    </span>
                    {post.aiGenerated && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        🤖 AI Generated
                      </span>
                    )}
                    <span className="text-gray-400 text-sm capitalize">{post.category?.replace("-", " ")}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span>📖 {post.readingTime || 5} min read</span>
                    <span>📅 {formatDate(post.createdAt)}</span>
                  </div>
                </div>
                
                {/* Featured Image Thumbnail */}
                {post.featuredImage && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image 
                      src={post.featuredImage} 
                      alt="" 
                      width={80} 
                      height={80} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowEditor(true);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  {post.status === "draft" ? (
                    <button
                      onClick={() => handlePublish(post._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                    >
                      🚀 Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublish(post._id)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm transition-colors"
                    >
                      📥 Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => !isGenerating && setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Blog Generator</h2>
                  <p className="text-gray-500 text-sm">Auto-generate SEO-optimized posts</p>
                </div>
              </div>

              {isGenerating ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Posts...</h3>
                  <p className="text-gray-500">Creating {postCount} post(s) about {topics.find(t => t.id === selectedTopic)?.name}</p>
                  <p className="text-sm text-purple-600 mt-2">This may take a few moments...</p>
                </div>
              ) : (
                <>
                  {/* Number of posts */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of posts to create
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={postCount}
                      onChange={(e) => setPostCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <p className="text-gray-400 text-xs mt-1">Maximum 10 posts per batch</p>
                  </div>

                  {/* Topic selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Topic
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedTopic === topic.id
                              ? "border-purple-500 bg-purple-50 ring-2 ring-purple-500"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="font-medium text-sm text-gray-900">{topic.name}</div>
                          <div className="text-gray-400 text-xs mt-1 line-clamp-1">{topic.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Start button */}
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedTopic}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedTopic
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    🚀 Start Generating {postCount} Post{postCount > 1 ? "s" : ""}
                  </button>

                  <button
                    onClick={() => setShowGenerator(false)}
                    className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors mt-3"
                  >
                    Cancel
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal with Cloudinary Upload */}
      <AnimatePresence>
        {showEditor && editingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => !isSaving && setShowEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Post</h2>

              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white text-gray-900"
                  />
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-purple-400 transition-colors">
                    {editingPost.featuredImage ? (
                      <div className="relative">
                        <Image 
                          src={editingPost.featuredImage} 
                          alt="Featured" 
                          width={400} 
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setEditingPost({ ...editingPost, featuredImage: null })}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer py-8"
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-2" />
                            <span className="text-gray-500">Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-600 font-medium">Click to upload image</p>
                            <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 5MB</p>
                          </>
                        )}
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={12}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm bg-white text-gray-900"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleUpdate}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>💾 Save Changes</>
                    )}
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    disabled={isSaving}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
