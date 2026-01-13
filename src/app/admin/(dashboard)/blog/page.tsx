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
  const [progress, setProgress] = useState(0);

  // Topic creation state
  const [newTopicName, setNewTopicName] = useState("");
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [showTopicInput, setShowTopicInput] = useState(false);
  
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

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) return;
    setIsCreatingTopic(true);
    try {
      const res = await fetch(`${API_URL}/api/blog/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTopicName }),
      });
      const data = await res.json();
      if (data.success) {
        setTopics([...topics, data.data]);
        setNewTopicName("");
        setShowTopicInput(false);
        setSelectedTopic(data.data.id); // Auto-select new topic
        alert("Topic created successfully!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to create topic");
    } finally {
      setIsCreatingTopic(false);
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
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        // Faster at start, slower at end
        const increment = prev < 50 ? 5 : prev < 80 ? 2 : 0.5;
        return prev + increment;
      });
    }, 800); // Update every 800ms

    try {
      const res = await fetch(`${API_URL}/api/blog/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic, count: postCount }),
      });

      const data = await res.json();
      
      clearInterval(interval);
      setProgress(100);
      
      // Small delay to show 100%
      await new Promise(resolve => setTimeout(resolve, 500));

      if (data.success) {
        if (data.data && data.data.generated > 0) {
          alert(`✅ Successfully generated ${data.data.generated} posts!`);
          setShowGenerator(false);
          setSelectedTopic("");
          setPostCount(1);
          fetchPosts();
        } else {
           // Handle case where success=true but 0 generated (all failed)
           const firstError = data.data?.errors?.[0]?.error || "Unknown error";
           console.error("Generation failed:", data.data?.errors);
           alert(`❌ Generation failed: ${firstError}`);
        }
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      clearInterval(interval);
      alert("Failed to generate posts. Check your API configuration.");
    } finally {
      setIsGenerating(false);
      setProgress(0);
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
        alert("Post updated successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update post");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-neutral-400">AI-Powered Content Creation</p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Generate Posts
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { 
            label: "Total Posts", 
            value: counts.total, 
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            )
          },
          { 
            label: "Drafts", 
            value: counts.drafts, 
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            )
          },
          { 
            label: "Published", 
            value: counts.published, 
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-900 rounded-xl border border-neutral-800 p-5 group hover:border-yellow-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 font-medium text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-neutral-800 text-yellow-500 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-800 pb-1 overflow-x-auto">
        {(["all", "draft", "published"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 border-b-2 font-medium capitalize whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "border-yellow-500 text-yellow-500"
                : "border-transparent text-neutral-400 hover:text-white hover:border-neutral-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-neutral-500 mt-4 text-sm">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="w-16 h-16 bg-neutral-800 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
            <p className="text-neutral-400 mb-6">Start by generating content with AI or create a new post.</p>
            <button
              onClick={() => setShowGenerator(true)}
              className="px-6 py-2.5 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Generate Posts
            </button>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-yellow-500/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                      post.status === "published" 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }`}>
                      {post.status}
                    </span>
                    {post.aiGenerated && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI
                      </span>
                    )}
                    <span className="text-neutral-500 text-xs font-medium uppercase tracking-wide px-2 py-0.5 bg-neutral-800 rounded-full border border-neutral-700">
                      {post.category?.replace("-", " ")}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors truncate">
                    {post.title}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime || 5} min read
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
                
                {/* Featured Image Thumbnail */}
                {post.featuredImage && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0 border border-neutral-800">
                    <Image 
                      src={post.featuredImage} 
                      alt="" 
                      width={96} 
                      height={96} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
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
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors border border-transparent hover:border-neutral-700"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {post.status === "draft" ? (
                    <button
                      onClick={() => handlePublish(post._id)}
                      className="p-2 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors border border-transparent hover:border-green-500/20"
                      title="Publish"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublish(post._id)}
                      className="p-2 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors border border-transparent hover:border-yellow-500/20"
                      title="Unpublish"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => !isGenerating && setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 max-w-lg w-full"
            >
              <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-yellow-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Blog Generator</h2>
                  <p className="text-neutral-400 text-sm">Create SEO-optimized posts in seconds</p>
                </div>
              </div>

              {isGenerating ? (
                <div className="text-center py-10">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-neutral-800"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        className="text-yellow-500 transition-all duration-300 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Generating Content...</h3>
                  <p className="text-neutral-400 max-w-xs mx-auto text-sm animate-pulse">
                    {progress < 30 && "Analyzing topic requirements..."}
                    {progress >= 30 && progress < 60 && "Drafting comprehensive articles..."}
                    {progress >= 60 && progress < 90 && "Optimizing for SEO & formatting..."}
                    {progress >= 90 && "Finalizing and saving..."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-white mb-3">
                      Number of posts
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={postCount}
                        onChange={(e) => setPostCount(parseInt(e.target.value))}
                        className="flex-1 accent-yellow-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="w-10 text-center font-bold text-yellow-500 text-xl">{postCount}</span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-2 text-right">Max 5 posts per batch</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-white">
                        Select Topic
                      </label>
                      <button 
                        onClick={() => setShowTopicInput(!showTopicInput)}
                        className="text-xs text-yellow-500 hover:text-yellow-400 font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Topic
                      </button>
                    </div>

                    <AnimatePresence>
                      {showTopicInput && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mb-3"
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newTopicName}
                              onChange={(e) => setNewTopicName(e.target.value)}
                              placeholder="Enter topic name..."
                              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500"
                            />
                            <button
                              onClick={handleCreateTopic}
                              disabled={isCreatingTopic || !newTopicName.trim()}
                              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-bold hover:bg-yellow-400 disabled:opacity-50 transition-colors"
                            >
                              {isCreatingTopic ? "..." : "Add"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                      {topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedTopic === topic.id
                              ? "border-yellow-500 bg-yellow-500/10 ring-1 ring-yellow-500"
                              : "border-neutral-800 bg-neutral-800 hover:bg-neutral-800/80 hover:border-neutral-700"
                          }`}
                        >
                          <div className={`font-bold text-sm ${selectedTopic === topic.id ? "text-yellow-500" : "text-white"}`}>{topic.name}</div>
                          <div className="text-neutral-500 text-xs mt-1 line-clamp-1">{topic.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowGenerator(false)}
                      className="flex-1 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={!selectedTopic}
                      className={`flex-[2] py-3.5 rounded-xl font-bold transition-all ${
                        selectedTopic
                          ? "bg-yellow-500 text-black hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20"
                          : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      }`}
                    >
                      Start Generating
                    </button>
                  </div>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => !isSaving && setShowEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Edit Post</h2>
                <button 
                  onClick={() => setShowEditor(false)}
                  className="text-neutral-500 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white font-medium"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-white text-sm"
                  />
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Featured Image</label>
                  <div className="border-2 border-dashed border-neutral-700 bg-neutral-800/30 rounded-xl p-4 hover:border-yellow-500/50 hover:bg-neutral-800/50 transition-all group">
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
                          className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer py-10"
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-3" />
                            <span className="text-neutral-400 text-sm">Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-neutral-700 transition-colors">
                              <svg className="w-7 h-7 text-neutral-400 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-white font-bold">Click to upload image</p>
                            <p className="text-neutral-500 text-sm mt-1">PNG, JPG, WebP up to 5MB</p>
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
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={12}
                    className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none font-mono text-sm text-neutral-300 leading-relaxed"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-neutral-800">
                  <button
                    onClick={() => setShowEditor(false)}
                    disabled={isSaving}
                    className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-black rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>Save Changes</>
                    )}
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
