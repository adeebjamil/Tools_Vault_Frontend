"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  createdAt: string;
}

const CATEGORY_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  "": { color: "from-blue-500 to-cyan-500", icon: "📚", label: "All Articles" },
  "web-development": { color: "from-blue-500 to-cyan-500", icon: "🌐", label: "Web Dev" },
  "productivity": { color: "from-green-500 to-emerald-500", icon: "⚡", label: "Productivity" },
  "programming": { color: "from-blue-600 to-cyan-500", icon: "💻", label: "Programming" },
  "design": { color: "from-orange-500 to-amber-500", icon: "🎨", label: "Design" },
  "ai-tools": { color: "from-blue-500 to-indigo-500", icon: "🤖", label: "AI Tools" },
  "tutorials": { color: "from-cyan-500 to-blue-500", icon: "📖", label: "Tutorials" },
  "security": { color: "from-blue-600 to-blue-400", icon: "🔐", label: "Security" },
  "seo": { color: "from-amber-500 to-yellow-500", icon: "📈", label: "SEO" },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = selectedCategory 
          ? `${API_URL}/api/blog/public?category=${selectedCategory}`
          : `${API_URL}/api/blog/public`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setPosts(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const categories = [
    { id: "", name: "All" },
    { id: "web-development", name: "Web Dev" },
    { id: "productivity", name: "Productivity" },
    { id: "programming", name: "Programming" },
    { id: "design", name: "Design" },
    { id: "ai-tools", name: "AI Tools" },
    { id: "tutorials", name: "Tutorials" },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
      case "web-development":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
      case "productivity":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
      case "programming":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
      case "design":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
      case "ai-tools":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case "tutorials":
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
      default:
        return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual subscription logic here
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[1000px] h-[300px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-[600px] h-[200px] sm:h-[400px] bg-cyan-600/10 rounded-full blur-[60px] sm:blur-[120px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-300">Developer Blog</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 leading-tight">
              <span className="text-white">Insights & </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Tutorials
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Expert articles on web development, productivity, design, and developer tools. 
              Learn best practices and stay ahead with our curated content.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 pl-14 bg-neutral-900/50 border border-blue-500/20 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <svg 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-neutral-500">Loading articles...</p>
          </div>
        ) : posts.length === 0 ? (
          /* Professional Empty State */
          <div className="relative">
            {/* Coming Soon Section */}
            <div className="text-center py-16">
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center mx-auto">
                  <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✨</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                <span className="text-white">Content is </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Coming Soon</span>
              </h2>
              
              <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-8">
                We&apos;re crafting high-quality articles on development, design, and productivity. 
                Subscribe to be the first to know when we publish!
              </p>

              {/* Newsletter Signup */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-12">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-3 bg-neutral-900/50 border border-blue-500/20 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    {subscribed ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Subscribed!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Notify Me
                      </>
                    )}
                  </button>
                </div>
                <p className="text-neutral-500 text-sm mt-3">No spam. Unsubscribe anytime.</p>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/tools"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Explore Tools
                </Link>
                <Link 
                  href="/about"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  About Us
                </Link>
              </div>
            </div>

            {/* What to Expect Section */}
            <div className="mt-20 pt-16 border-t border-white/5">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-2">What to Expect</h3>
                <p className="text-neutral-500">Topics we&apos;ll be covering</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, title: "Web Development", desc: "React, Next.js, TypeScript, CSS, and modern frameworks" },
                  { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, title: "Productivity", desc: "Tips and tools to boost your development workflow" },
                  { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>, title: "UI/UX Design", desc: "Design principles, accessibility, and user experience" },
                  { icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, title: "AI & Automation", desc: "AI tools, automation scripts, and smart workflows" },
                ].map((topic, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl border border-blue-500/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">{topic.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{topic.title}</h4>
                    <p className="text-neutral-500 text-sm">{topic.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                    ⭐ Featured
                  </span>
                  <span className="text-neutral-500 text-sm">Latest article</span>
                </div>
                
                <Link href={`/blog/${featuredPost.slug}`}>
                  <article className="group grid md:grid-cols-2 gap-8 p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/30 transition-all">
                    {/* Image */}
                    <div className="aspect-video md:aspect-[4/3] relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      {featuredPost.featuredImage ? (
                        <Image
                          src={featuredPost.featuredImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_CONFIG[featuredPost.category]?.color || "from-purple-600 to-pink-600"} opacity-30`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-gradient-to-r ${CATEGORY_CONFIG[featuredPost.category]?.color || "from-purple-500 to-pink-500"} text-white`}>
                          {featuredPost.category?.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-purple-400 transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-neutral-400 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {featuredPost.readingTime} min read
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
                          Read Article
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Blog Grid */}
            {remainingPosts.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-white">More Articles</h3>
                  <span className="text-neutral-500 text-sm">{posts.length} total articles</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <article 
                        className="group h-full bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/5"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Featured Image */}
                        <div className="aspect-video relative bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_CONFIG[post.category]?.color || "from-purple-600 to-pink-600"} opacity-20`} />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${CATEGORY_CONFIG[post.category]?.color || "from-purple-500 to-pink-500"} text-white`}>
                              {post.category?.replace("-", " ")}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5">
                          <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-neutral-500 text-sm line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.readingTime} min
                              </span>
                              <span>
                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric"
                                })}
                              </span>
                            </div>
                            <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {/* Newsletter Section (shown when posts exist) */}
      {posts.length > 0 && (
        <section className="py-20 bg-black relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px]" />
          
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              <span className="text-white">Stay </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Updated</span>
            </h3>
            <p className="text-neutral-400 mb-8">
              Get the latest articles and tutorials delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 bg-neutral-900/50 border border-blue-500/20 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              <button 
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
