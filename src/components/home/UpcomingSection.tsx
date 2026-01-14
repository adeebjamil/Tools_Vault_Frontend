"use client";

import { useInView } from "@/hooks/useInView";
import { upcomingTools } from "@/lib/constants";
import { useState } from "react";

export default function UpcomingSection() {
  const { ref, isInView } = useInView(0.1);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email: email,
          name: "Upcoming Tools Subscriber",
          message: "Subscribed via Upcoming Tools section"
        })
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      if(status !== "success") { 
         setTimeout(() => setStatus("idle"), 3000); 
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div 
        ref={ref}
        className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-300 tracking-wide">IN DEVELOPMENT</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            <span className="text-white">Stay Tuned for</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Upcoming Tools
            </span>
          </h2>
          
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            We&apos;re constantly building new tools to make your development workflow smoother. 
            Here&apos;s a peek at what&apos;s coming next.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTools.map((tool, index) => (
            <div 
              key={tool.title}
              className="group relative p-6 rounded-2xl border border-blue-500/20 bg-neutral-900/50 backdrop-blur-sm hover:border-blue-500/50 hover:bg-neutral-900/80 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  tool.status === "In Development" 
                    ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                    : tool.status === "Coming Soon"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-neutral-500/20 text-neutral-300 border border-neutral-500/30"
                }`}>
                  {tool.status}
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 group-hover:border-blue-400/50 transition-all">
                  {tool.icon}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-3xl border border-blue-500/20 bg-neutral-900/50 backdrop-blur-sm max-w-xl w-full">
            <h3 className="text-xl font-bold text-white mb-2">Get Notified When We Launch</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Be the first to know when new tools are available. No spam, just updates.
            </p>
            
            {status === "success" ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-green-400 font-bold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You&apos;re on the list!
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full bg-black/50 border border-blue-500/20 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={status === "loading" || !email}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notify Me
                    </>
                  )}
                </button>
              </div>
            )}
             {status === "error" && (
                <p className="text-red-500 text-sm mt-3">Something went wrong. Please try again.</p>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}

