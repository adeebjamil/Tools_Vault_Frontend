"use client";

import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { testimonials } from "@/lib/constants";

export default function TestimonialsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 px-6">
      <div 
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="text-center mb-16">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            <span className="text-white">Loved by </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Developers</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what the community has to say.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 relative">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 border-t border-white/5 pt-16">
          <div className="grid grid-cols-3 gap-8 text-center divide-x divide-white/10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-blue-400">5,000+</div>
              <div className="text-sm text-neutral-500">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400">4.9/5</div>
              <div className="text-sm text-neutral-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-emerald-400">99%</div>
              <div className="text-sm text-neutral-500">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
