"use client";

import { useInView } from "@/hooks/useInView";

export default function FeaturesSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 px-6">
      <div 
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Why ToolsVault</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Developer Tools, Done Right
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            We built the tools we wished existed — fast, private, and actually useful.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <article className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-green-500/30 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Client-Side Processing</h3>
            <p className="text-neutral-400 leading-relaxed">
              All processing happens in your browser. We never see, store, or transmit your data anywhere. 
              Your code, your text, your files — they stay yours. No exceptions.
            </p>
          </article>
          
          <article className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-blue-500/30 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Results, Zero Waiting</h3>
            <p className="text-neutral-400 leading-relaxed">
              No server round-trips means zero waiting time. Paste your JSON, get formatted output instantly. 
              Generate a QR code in milliseconds. It&apos;s the speed you expect.
            </p>
          </article>
          
          <article className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-purple-500/30 transition-all group">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Built with Love for Developers</h3>
            <p className="text-neutral-400 leading-relaxed">
              Created by developers, for developers. Every tool is designed with real-world use cases in mind, 
              not feature checklists. Simple, focused, and effective.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
