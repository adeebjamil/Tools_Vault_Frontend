"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ ...preferences, marketing: true }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-4 md:p-5 rounded-2xl shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                {/* Cookie Icon */}
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 items-center justify-center text-blue-400 shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-white font-bold text-sm md:text-base mb-0.5">🍪 We value your privacy</h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                    We use cookies to enhance your browsing experience and analyze site traffic. No personal data is ever collected or sold.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="flex-1 md:flex-none px-4 py-2.5 text-neutral-400 hover:text-white text-sm font-medium transition-colors hover:bg-white/5 rounded-xl"
                  >
                    Customize
                  </button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-medium transition-all"
                  >
                    Decline
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Cookie Preferences</h2>
                <p className="text-neutral-400 text-sm mb-8">Manage how cookies are used on ToolsVault.</p>
                
                <div className="space-y-6">
                  {/* Essential */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Essential</div>
                      <div className="text-xs text-neutral-500">Required for the site to function.</div>
                    </div>
                    <div className="text-blue-500 text-xs font-bold uppercase tracking-widest">Always on</div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Analytics</div>
                      <div className="text-xs text-neutral-500">Help us improve by understanding usage.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Marketing</div>
                      <div className="text-xs text-neutral-500">Personalized content and outreach.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex gap-3">
                  <button 
                    onClick={handleSavePreferences}
                    className="flex-1 bg-white text-black font-bold py-3 rounded-2xl hover:bg-neutral-200 transition-colors"
                  >
                    Save Settings
                  </button>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-white/5 text-white font-bold py-3 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
