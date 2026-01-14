"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          email: formData.email,
          name: formData.name,
          message: `Subject: ${formData.subject}\n\n${formData.message}`
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 mb-6 tracking-tight">
            Let's Start a Conversation
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or just want to say hello? We're here to help you get the most out of ToolsVault.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-neutral-400 mb-8 max-w-md mx-auto">Thank you for reaching out. Our team will review your message and get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-neutral-800 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors border border-neutral-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-neutral-300 ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-sm font-bold text-neutral-300 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                         className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-neutral-300 ml-1">
                      Subject
                    </label>
                    <div className="relative">
                      <select 
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                         className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic...</option>
                        <option value="feedback">General Feedback</option>
                        <option value="bug">Report a Bug</option>
                        <option value="feature">Request a Feature</option>
                        <option value="business">Business Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-neutral-300 ml-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                       className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full py-4 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                         </svg>
                      </>
                    )}
                  </button>
                  
                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm font-medium">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Failed to send message. Please try again.
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            
            {/* Social Channels */}
            {/* Social Channels */}
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Connect With Us
              </h3>
              
              <div className="space-y-3">
                <a href="mailto:privacy.toolsvault@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 hover:bg-black transition-all group overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Email Us</p>
                    <p className="text-neutral-200 font-semibold group-hover:text-blue-400 transition-colors truncate">privacy.toolsvault@gmail.com</p>
                  </div>
                </a>

                 <a href="https://x.com/Tools_Vault" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 hover:bg-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Follow Us</p>
                    <p className="text-neutral-200 font-semibold group-hover:text-blue-400 transition-colors">@Tools_Vault</p>
                  </div>
                </a>

                <a href="https://github.com/Mux071" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 hover:bg-black transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">Star Repo</p>
                    <p className="text-neutral-200 font-semibold group-hover:text-blue-400 transition-colors">ToolsVault</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">We Value Your Input</h3>
              <p className="text-neutral-400 text-sm leading-relaxed relative z-10">
                Found a bug? Have a tool suggestion? We read every message and typically respond within 24-48 hours. Your feedback shapes the future of ToolsVault!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
