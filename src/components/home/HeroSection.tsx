"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimatedText delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-300">12 Free Tools Available • More Coming Soon</span>
          </div>
        </AnimatedText>
        
        <AnimatedText delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
            Free Developer Tools
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
              That Respect Your Privacy
            </span>
          </h1>
        </AnimatedText>
        
        <AnimatedText delay={200}>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            Professional-grade utilities for developers, designers, and content creators.
            Format JSON, generate QR codes, analyze text, create color palettes, and more — 
            all running <strong className="text-white">100% locally in your browser</strong>.
          </p>
        </AnimatedText>
        
        <AnimatedText delay={250}>
          <p className="text-base text-neutral-500 max-w-2xl mx-auto mb-10">
            No sign-ups. No data collection. No server uploads. Your code, your text, your files — they stay <em>yours</em>.
            Built by developers who value speed and privacy as much as you do.
          </p>
        </AnimatedText>
        
        <AnimatedText delay={300}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              href="/tools" 
              className="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              Explore All Tools
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a 
              href="#tools" 
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              See What&apos;s Available
            </a>
          </div>
        </AnimatedText>
        
        {/* Trust Indicators */}
        <AnimatedText delay={400}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-neutral-500">
            <div className="flex items-center gap-2 hover:text-neutral-300 transition-colors">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2 hover:text-neutral-300 transition-colors">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 hover:text-neutral-300 transition-colors">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Forever Free</span>
            </div>
            <div className="flex items-center gap-2 hover:text-neutral-300 transition-colors">
              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Open Source</span>
            </div>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
