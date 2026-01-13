"use client";

import { useState, useMemo } from "react";
import ToolCard from "@/components/ui/ToolCard";

const tools = [
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and beautify your JSON data with syntax highlighting.",
    image: "/toolsimages/jsonformatter.webp",
    category: "Developer",
    href: "/tools/json-formatter",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in any text.",
    image: "/toolsimages/wordcounter.webp",
    category: "Text",
    href: "/tools/word-counter",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, or contact information instantly.",
    image: "/toolsimages/qrcodegenerator.webp",
    category: "Utility",
    href: "/tools/qr-code-generator",
  },
  {
    id: "color-palette",
    title: "Color Palette Generator",
    description: "Generate beautiful color palettes for your design projects.",
    image: "/toolsimages/colorpalletegenerator.webp",
    category: "Design",
    href: "/tools/color-palette",
  },
  {
    id: "base64",
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings quickly and securely.",
    image: "/toolsimages/base64encoderdecoder.jpg",
    category: "Developer",
    href: "/tools/base64",
  },
  {
    id: "markdown-preview",
    title: "Markdown Preview",
    description: "Write and preview Markdown with live rendering and export.",
    image: "/toolsimages/markdownpreview.jpg",
    category: "Developer",
    href: "/tools/markdown-preview",
  },
  {
    id: "jwt-generator",
    title: "JWT Token Generator",
    description: "Generate and decode JSON Web Tokens for authentication.",
    image: "/toolsimages/jwtkeygenerator.webp",
    category: "Developer",
    href: "/tools/jwt-generator",
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups.",
    image: "/toolsimages/loremipsum.webp",
    category: "Text",
    href: "/tools/lorem-ipsum",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Compress JPEG, PNG, and WebP images without losing quality.",
    image: "/toolsimages/image-compressor.webp",
    category: "Utility",
    href: "/tools/image-compressor",
  },
  {
    id: "uuid-generator",
    title: "UUID Generator",
    description: "Generate unique UUIDs (v1, v4) for databases and applications.",
    image: "/toolsimages/uuidgenerator.png",
    category: "Developer",
    href: "/tools/uuid-generator",
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text or files.",
    image: "/toolsimages/hashgenerator.png",
    category: "Security",
    href: "/tools/hash-generator",
  },
  {
    id: "regex-tester",
    title: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching.",
    image: "/toolsimages/regextester.png",
    category: "Developer",
    href: "/tools/regex-tester",
  },
];

const categories = ["All", "Developer", "Text", "Design", "Utility", "Security"];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-6 sm:pb-10 md:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {tools.length} Free Tools
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 animate-slide-up">
              Free Online <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 animate-slide-up stagger-1 max-w-xl mx-auto">
              Professional-grade tools for developers, designers, and creators. 
              All tools run entirely in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section - Sticky on Mobile */}
      <section className="sticky top-16 sm:top-20 z-30 py-3 sm:py-4 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Professional Design */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <div className="relative flex items-center">
              <div className="absolute left-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools by name or feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-slate-900/80 border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle Button - Mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm font-medium text-gray-300"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filter: {activeCategory}</span>
              </div>
              <svg className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile Filter Dropdown */}
            {showFilters && (
              <div className="mt-2 p-2 bg-slate-800/80 border border-slate-700/50 rounded-xl grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700/50 text-gray-400 hover:bg-slate-600/50 hover:text-white"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-1 opacity-70">
                        ({tools.filter(t => t.category === category).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Filter Pills */}
          <div className="hidden sm:flex gap-2 justify-center flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-60">
                    ({tools.filter(t => t.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-6 sm:py-10 md:py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          {(searchQuery || activeCategory !== "All") && (
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-gray-500 text-xs sm:text-sm">
                Showing {filteredTools.length} of {tools.length} tools
                {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
                {activeCategory !== "All" && <span> in {activeCategory}</span>}
              </p>
            </div>
          )}

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredTools.map((tool, index) => (
                <div key={tool.id} className={`animate-slide-up stagger-${(index % 5) + 1}`}>
                  <ToolCard {...tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Use Our Tools?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="trust-box">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-500">All tools run in your browser. No server processing means instant results.</p>
            </div>
            
            <div className="card text-center">
              <div className="trust-box">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">100% Private</h3>
              <p className="text-gray-500">Your data never leaves your device. We don&apos;t store or track anything.</p>
            </div>
            
            <div className="card text-center">
              <div className="trust-box">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Always Free</h3>
              <p className="text-gray-500">No hidden costs, no premium tiers. All features are free forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tools Section */}
      <section className="py-20 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="badge mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2" />
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Tuned for <span className="gradient-text">Upcoming Tools</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We&apos;re building powerful AI-powered automation tools to help you scale your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bulk Email & WhatsApp */}
            <div className="card p-0 overflow-hidden group hover:border-purple-500/30">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/toolsimages/bulkemailand whatappsender.jpg"
                  alt="Bulk Email & WhatsApp Sender"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <span className="absolute top-4 left-4 inline-block text-xs font-medium px-3 py-1 rounded-full bg-purple-500/30 backdrop-blur-sm text-purple-200 border border-purple-500/30">
                  AI Powered
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Bulk Email & WhatsApp Sender
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Automate your outreach with AI-powered bulk messaging. Send personalized emails and WhatsApp messages at scale.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI-generated personalized messages
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Schedule and automate campaigns
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Analytics and tracking dashboard
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Content Marketing */}
            <div className="card p-0 overflow-hidden group hover:border-cyan-500/30">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/toolsimages/AIautomationandconetnet marketing.webp"
                  alt="AI Content Marketing Automation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <span className="absolute top-4 left-4 inline-block text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/30 backdrop-blur-sm text-cyan-200 border border-cyan-500/30">
                  Multi-Platform
                </span>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  AI Content Marketing Automation
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Create, schedule, and publish content across Meta, Instagram, and LinkedIn automatically.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI-powered content generation
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cross-platform scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Performance insights & optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Notify CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Want to be the first to know when these tools launch?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
              />
              <button className="btn btn-primary whitespace-nowrap">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
