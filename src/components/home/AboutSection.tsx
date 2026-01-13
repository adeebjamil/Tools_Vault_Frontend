"use client";

import AnimatedText from "@/components/ui/AnimatedText";

export default function AboutSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedText delay={0}>
          <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block text-center">About ToolsVault</span>
        </AnimatedText>
        <AnimatedText delay={100}>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8 text-center">
            What is ToolsVault?
          </h2>
        </AnimatedText>
        <div 
          className="prose prose-invert prose-lg max-w-none relative group/spotlight"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
          }}
        >
          {/* Spotlight overlay */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 60%)',
            }}
          />
          <AnimatedText delay={200}>
            <p className="text-neutral-400 leading-relaxed mb-6 relative z-10 [&:hover]:text-blue-100 transition-colors duration-300 cursor-default">
              <strong className="text-white hover:text-blue-400 transition-colors">ToolsVault</strong> is a comprehensive collection of free online developer tools designed for professionals who value both efficiency and privacy. 
              Unlike traditional online tools that upload your data to remote servers, ToolsVault processes everything directly in your web browser using modern JavaScript and WebAssembly technologies.
            </p>
          </AnimatedText>
          <AnimatedText delay={300}>
            <p className="text-neutral-400 leading-relaxed mb-6 relative z-10 [&:hover]:text-blue-100 transition-colors duration-300 cursor-default">
              Whether you&apos;re a <strong className="text-white hover:text-blue-400 transition-colors">software developer</strong> debugging JSON APIs, a <strong className="text-white hover:text-blue-400 transition-colors">content creator</strong> optimizing articles for SEO, 
              a <strong className="text-white hover:text-blue-400 transition-colors">designer</strong> crafting the perfect color scheme, or a <strong className="text-white hover:text-blue-400 transition-colors">marketer</strong> generating QR codes for campaigns — 
              ToolsVault has the utilities you need without compromising your data security.
            </p>
          </AnimatedText>
          <AnimatedText delay={400}>
            <p className="text-neutral-400 leading-relaxed relative z-10 [&:hover]:text-blue-100 transition-colors duration-300 cursor-default">
              Our tools are built with modern web technologies including <strong className="text-white hover:text-blue-400 transition-colors">React</strong>, <strong className="text-white hover:text-blue-400 transition-colors">Next.js</strong>, and <strong className="text-white hover:text-blue-400 transition-colors">TypeScript</strong>, 
              ensuring a fast, reliable, and accessible experience across all devices and browsers. Best of all — it&apos;s completely free, with no hidden fees, premium tiers, or intrusive advertisements.
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
