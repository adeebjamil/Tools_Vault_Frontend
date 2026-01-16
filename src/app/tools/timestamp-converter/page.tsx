"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TimestampConverterPage() {
  const [now, setNow] = useState(Date.now());
  const [tsInput, setTsInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateResult, setDateResult] = useState("");
  
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));
  const [tsResult, setTsResult] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertTimestamp = (val: string) => {
      setTsInput(val);
      if (!val) { setDateResult(""); return; }
      
      let ts = Number(val);
      // Guess if seconds or ms
      if (val.length <= 10) ts *= 1000;
      
      const date = new Date(ts);
      if (date.toString() === "Invalid Date") {
          setDateResult("Invalid Date");
      } else {
          setDateResult(date.toUTCString() + " / " + date.toLocaleString());
      }
  };

  const convertDate = (val: string) => {
      setDateInput(val);
      if (!val) { setTsResult(""); return; }
      const ts = new Date(val).getTime();
      if (isNaN(ts)) {
          setTsResult("Invalid Date");
      } else {
          setTsResult(Math.floor(ts / 1000).toString());
      }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Timestamp Converter</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Unix Timestamp Converter</h1>
              <p className="text-gray-400">Convert between Epoch time and human-readable dates</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Current Time */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/30 rounded-xl p-6 text-center">
            <p className="text-blue-300 text-sm font-medium mb-2 uppercase tracking-wide">Current Unix Timestamp</p>
            <div className="text-4xl md:text-5xl font-mono text-white mb-2">{Math.floor(now / 1000)}</div>
            <p className="text-gray-500 text-sm">refreshes every second</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* TS -> Date */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Timestamp to Date</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Unix Timestamp (Seconds/Millis)</label>
                        <input
                            type="number"
                            value={tsInput}
                            onChange={(e) => convertTimestamp(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 min-h-[60px] flex items-center">
                        <p className="text-sm text-green-400">{dateResult}</p>
                    </div>
                </div>
            </div>

            {/* Date -> TS */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Date to Timestamp</h3>
                <div className="space-y-4">
                     <div>
                        <label className="text-xs text-gray-500 mb-1 block">Date & Time</label>
                        <input
                            type="datetime-local"
                            value={dateInput}
                            onChange={(e) => convertDate(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none color-scheme-dark"
                        />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 min-h-[60px] flex items-center justify-between">
                        <p className="text-xl font-mono text-blue-400">{tsResult}</p>
                        {tsResult && (
                             <button
                                onClick={() => navigator.clipboard.writeText(tsResult)}
                                className="text-gray-500 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>

      </div>
      </section>
    </>
  );
}
