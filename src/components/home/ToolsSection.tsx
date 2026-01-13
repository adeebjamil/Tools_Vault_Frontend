"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { allTools } from "@/lib/constants";

export default function ToolsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="tools" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent">
      <div 
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Available Now</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Professional Developer Tools
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A curated collection of essential utilities built for speed, privacy, and ease of use. 
            Each tool is optimized for instant results — no server round-trips, no waiting.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {allTools.map((tool, index) => (
            <Link 
              key={tool.id} 
              href={tool.href}
              className="group p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
              <div className="flex sm:block items-start gap-4">
                <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xl font-mono text-white shrink-0 sm:mb-4 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium text-neutral-500 bg-white/5 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {tool.description}
                  </p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex items-center gap-1 text-blue-400 text-xs sm:text-sm font-medium sm:opacity-0 group-hover:opacity-100 transition-opacity">
                Use Tool
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View All Tools with Filters
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
