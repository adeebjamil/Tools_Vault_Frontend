"use client";

import { useInView } from "@/hooks/useInView";

export default function UseCasesSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Use Cases</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Who is ToolsVault For?
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Tailored solutions for every digital creator.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* For Developers */}
          <div className="group p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">For Developers</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Format and validate JSON with syntax highlighting
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Generate secure passwords and UUIDs instantly
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Encode/Decode Base64 strings for debugging
              </li>
            </ul>
          </div>
          
          {/* For Designers */}
          <div className="group p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">For Designers</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Generate harmonious color palettes using color theory
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Create QR codes with custom colors and branding
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Generate Lorem Ipsum placeholder text for mockups
              </li>
            </ul>
          </div>
          
          {/* For Content Creators */}
          <div className="group p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">For Content Creators</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Analyze word count, reading time, and keyword density
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Write and preview Markdown for blogs and docs
              </li>
              <li className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Generate QR codes for social media campaigns
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
