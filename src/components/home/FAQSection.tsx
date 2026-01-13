"use client";

import { useInView } from "@/hooks/useInView";
import { faqs } from "@/lib/constants";

export default function FAQSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px]" />
      
      <div 
        ref={ref}
        className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-300">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Questions</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Got questions? We&apos;ve got answers. Can&apos;t find what you&apos;re looking for? Reach out to us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group p-6 rounded-2xl border border-blue-500/20 bg-neutral-900/50 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 cursor-pointer"
            >
              <summary className="flex items-start gap-4 cursor-pointer list-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-blue-400 font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors text-lg leading-tight">{faq.question}</h3>
                </div>
                <span className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-open:rotate-180 group-open:bg-blue-500/20 transition-all duration-300">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 ml-14 pr-12">
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl border border-blue-500/20 bg-neutral-900/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-neutral-400 text-sm">Still have questions?</p>
              <a href="mailto:support@toolsvault.com" className="text-white font-semibold hover:text-blue-300 transition-colors">
                Contact our support team →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
