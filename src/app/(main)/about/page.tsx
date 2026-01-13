import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - ToolsVault | Free Developer Tools Platform",
  description:
    "Learn about ToolsVault, our mission to provide free, secure, and privacy-focused online tools for developers and creators. We offer free tools which help make life easier in every category.",
  keywords: [
    "about ToolsVault",
    "free developer tools",
    "online tools platform",
    "privacy-focused tools",
    "client-side processing",
    "web development tools",
    "developer utilities",
    "open source tools",
    "browser-based tools",
    "make life easier",
  ],
  authors: [{ name: "ToolsVault Team" }],
  creator: "ToolsVault",
  publisher: "ToolsVault",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tools-vault.app/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tools-vault.app/about",
    siteName: "ToolsVault",
    title: "About Us - ToolsVault | Free Developer Tools Platform",
    description:
      "Discover ToolsVault's mission to provide fast, free, and privacy-focused tools for developers. All processing happens locally in your browser.",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "About ToolsVault - Your Digital Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ToolsVault | Free Developer Tools",
    description:
      "Discover ToolsVault's mission to provide fast, free, and privacy-focused tools for developers worldwide.",
    images: ["/og-about.png"],
    creator: "@toolsvault",
  },
  other: {
    "application-name": "ToolsVault",
    "apple-mobile-web-app-title": "ToolsVault",
  },
};

const values = [
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Speed First",
    description: "All our tools run entirely in your browser - no server round-trips means instant results every time.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Privacy Focused",
    description: "Your data never leaves your device. We don't track, store, or sell any information you process.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Forever Free",
    description: "No premium tiers, no hidden costs. All features are completely free and accessible to everyone.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Always Improving",
    description: "We constantly add new tools and improve existing ones based on developer community feedback.",
  },
];


const stats = [
  { value: "50K+", label: "Monthly Users" },
  { value: "7+", label: "Free Tools" },
  { value: "0", label: "Data Stored" },
  { value: "100%", label: "Browser-Based" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />
        
        {/* Floating Elements - Hidden on small mobile */}
        <div className="hidden sm:block absolute top-40 right-1/4 w-32 h-32 opacity-10 animate-float">
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 rotate-12" />
        </div>
        <div className="hidden sm:block absolute bottom-20 left-1/4 w-20 h-20 opacity-10 animate-float stagger-3">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 -rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="badge mb-4 animate-fade-in">About Us</span>
              <h1 className="text-white mb-4 sm:mb-6 animate-slide-up">
                Building the Future of <span className="gradient-text">Developer Tools</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 animate-slide-up stagger-1">
                ToolsVault was born from a simple idea: developers deserve fast, free, and 
                privacy-focused tools that just work. No sign-ups, no data collection, 
                no compromise on quality.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-slide-up stagger-2">
                <Link href="/tools" className="btn btn-primary w-full sm:w-auto justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Explore Tools
                </Link>
                <Link href="/contact" className="btn btn-secondary w-full sm:w-auto justify-center">
                  Get in Touch
                </Link>
              </div>
            </div>
            
            {/* Right - 3D Logo - Hidden on mobile, show on md+ */}
            <div className="hidden lg:flex relative items-center justify-center animate-float">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                {/* Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                
                {/* Logo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo1.png"
                    alt="ToolsVault"
                    width={350}
                    height={350}
                    className="drop-shadow-2xl object-contain"
                  />
                </div>
                
                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-500 shadow-glow" />
                </div>
                <div className="absolute inset-4 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-purple-400/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-12 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 glow-text">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="badge mb-3 sm:mb-4">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              What Drives Us
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              We believe great tools should be accessible to everyone. Here&apos;s what we stand for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className={`card p-4 sm:p-6 group animate-slide-up stagger-${index + 1}`}>
                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="trust-box flex-shrink-0 group-hover:animate-pulse-glow w-12 h-12 sm:w-16 sm:h-16 mb-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="badge mb-6">Our Mission</span>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8">
              &ldquo;To empower developers and creators worldwide with 
              <span className="gradient-text"> fast, free, and privacy-focused </span>
              tools that make their workflow seamless.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">TV</span>
              </div>
              <div className="text-left">
                <p className="text-white font-medium">The ToolsVault Team</p>
                <p className="text-sm text-gray-500">Building for developers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 border-blue-500/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Try Our Tools?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join thousands of developers who use ToolsVault every day. 
              No sign-up required – just start using our free tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools" className="btn btn-primary text-lg px-8 py-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started Free
              </Link>
              <Link href="/contact" className="btn btn-secondary text-lg px-8 py-4">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
