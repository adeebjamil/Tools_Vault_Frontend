"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  featuredImage: string | null;
  category: string;
  tags: string[];
  readingTime: number;
  aiGenerated: boolean;
  createdAt: string;
  publishedAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "web-development": "from-blue-500 to-cyan-500",
  "productivity": "from-green-500 to-emerald-500",
  "programming": "from-blue-600 to-cyan-500",
  "design": "from-orange-500 to-amber-500",
  "seo": "from-amber-500 to-yellow-500",
  "ai-tools": "from-blue-500 to-indigo-500",
  "security": "from-blue-600 to-blue-400",
  "tutorials": "from-cyan-500 to-blue-500",
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const res = await fetch(`${API_URL}/api/blog/public/${slug}`);
        const data = await res.json();
        
        if (data.success) {
          setPost(data.data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-neutral-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-2xl bg-neutral-800/50 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-3">Article Not Found</h1>
          <p className="text-neutral-400 mb-8">
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = formatDate(post.publishedAt || post.createdAt);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Header/Navigation */}
      <div className="pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${CATEGORY_COLORS[post.category] || "from-blue-500 to-cyan-500"} text-white`}>
              {post.category?.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            
            <div className="flex items-center gap-4 text-neutral-400 text-sm">
              {post.readingTime > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} min read
                </span>
              )}
              {publishedDate && (
                <>
                  <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {publishedDate}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-4 sm:mb-6 md:mb-8">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-400 leading-relaxed font-light">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16">
          <div className="aspect-video sm:aspect-[21/9] relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
          </div>
        </section>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-10 sm:pb-12 md:pb-16">
        <div 
          className="prose prose-lg prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
            prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
            prose-p:text-neutral-300 prose-p:leading-[1.8] prose-p:mb-6
            prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-300 prose-a:transition-colors
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-neutral-200
            prose-code:bg-neutral-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-blue-300 prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:text-neutral-300 prose-ul:my-6
            prose-ol:text-neutral-300 prose-ol:my-6
            prose-li:text-neutral-300 prose-li:my-2 prose-li:leading-relaxed
            prose-li:marker:text-blue-500
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-neutral-300
            prose-hr:border-white/10 prose-hr:my-12
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-white/10"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Tags & Share Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="border-t border-white/10 pt-8 sm:pt-10 md:pt-12">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl sm:rounded-3xl">
            <h3 className="flex items-center gap-2 font-bold text-base sm:text-lg mb-4 sm:mb-6">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share this article
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] rounded-xl hover:bg-[#1DA1F2]/20 transition-all font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter / X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5] rounded-xl hover:bg-[#0077B5]/20 transition-all font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  copied 
                    ? "bg-green-500/10 border border-green-500/30 text-green-400" 
                    : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10"
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="border-t border-white/5 py-16 px-6 bg-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px]" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-white">Enjoyed this </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">article?</span>
          </h3>
          <p className="text-neutral-400 mb-8">
            Explore more insights and tutorials on our blog.
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20"
          >
            Browse All Articles
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
