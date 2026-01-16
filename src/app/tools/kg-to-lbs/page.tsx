"use client";

import { useState } from "react";
import Link from "next/link";

export default function KgToLbsPage() {
  const [kg, setKg] = useState<number | string>(1);
  const [lbs, setLbs] = useState<number | string>(2.20462);

  const handleKgChange = (val: string) => {
    setKg(val);
    if (!val) { setLbs(""); return; }
    setLbs(Number((parseFloat(val) * 2.20462).toFixed(4)));
  };

  const handleLbsChange = (val: string) => {
    setLbs(val);
    if (!val) { setKg(""); return; }
    setKg(Number((parseFloat(val) / 2.20462).toFixed(4)));
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">KG to Lbs</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">KG to Lbs Converter</h1>
              <p className="text-gray-400">Convert Kilograms to Pounds instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative">
                
                {/* KG Input */}
                <div className="flex-1 w-full">
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Kilograms (kg)</label>
                    <input
                        type="number"
                        value={kg}
                        onChange={(e) => handleKgChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 text-3xl text-white focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Arrow */}
                <div className="text-gray-500">
                    <svg className="w-8 h-8 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>

                {/* Lbs Input */}
                <div className="flex-1 w-full">
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Pounds (lbs)</label>
                    <input
                        type="number"
                        value={lbs}
                        onChange={(e) => handleLbsChange(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 text-3xl text-white focus:border-blue-500 focus:outline-none"
                    />
                </div>

            </div>

             {/* Formula */}
             <div className="mt-8 text-center">
                <p className="text-gray-500">Formula: <span className="text-blue-400 font-mono">1 kg = 2.20462 lbs</span></p>
             </div>
        </div>
      </section>
    </>
  );
}
