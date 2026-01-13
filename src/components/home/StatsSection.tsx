"use client";

import { useInView } from "@/hooks/useInView";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsSection() {
  const { ref, isInView } = useInView(0.3);

  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.02]">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0ms' }}>
            <div className="text-4xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors group-hover:scale-110 transform duration-300">
              <AnimatedCounter target={50000} suffix="+" isVisible={isInView} duration={2000} />
            </div>
            <div className="text-sm text-neutral-500">Monthly Users</div>
          </div>
          <div className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
            <div className="text-4xl font-black text-white mb-1 group-hover:text-purple-400 transition-colors group-hover:scale-110 transform duration-300">
              <AnimatedCounter target={12} suffix="+" isVisible={isInView} duration={1500} />
            </div>
            <div className="text-sm text-neutral-500">Free Tools</div>
          </div>
          <div className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
            <div className="text-4xl font-black text-white mb-1 group-hover:text-green-400 transition-colors group-hover:scale-110 transform duration-300">
              <AnimatedCounter target={100} suffix="%" isVisible={isInView} duration={1800} />
            </div>
            <div className="text-sm text-neutral-500">Client-Side</div>
          </div>
          <div className={`group transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '450ms' }}>
            <div className="text-4xl font-black text-white mb-1 group-hover:text-pink-400 transition-colors group-hover:scale-110 transform duration-300">
              <AnimatedCounter target={0} suffix="" isVisible={isInView} duration={500} />
            </div>
            <div className="text-sm text-neutral-500">Data Collected</div>
          </div>
        </div>
      </div>
    </section>
  );
}
