"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import * as Diff from "diff";

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState("The quick brown fox jumps over the lazy dog.");
  const [modified, setModified] = useState("The quick brown cat jumps over the happy dog.");
  const [diffMode, setDiffMode] = useState<"chars" | "words" | "lines">("words");
  const [diffResult, setDiffResult] = useState<Diff.Change[]>([]);

  useEffect(() => {
    let diffs;
    if (diffMode === "chars") {
      diffs = Diff.diffChars(original, modified);
    } else if (diffMode === "lines") {
      diffs = Diff.diffLines(original, modified);
    } else {
      diffs = Diff.diffWords(original, modified);
    }
    setDiffResult(diffs);
  }, [original, modified, diffMode]);

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Diff Checker</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Text Diff Checker</h1>
              <p className="text-gray-400">Compare text differences with highlighting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-slate-900 border border-slate-700 rounded-xl p-2">
                <div className="flex items-center gap-2">
                    {["chars", "words", "lines"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setDiffMode(mode as any)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                                diffMode === mode 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" 
                                : "text-gray-400 hover:text-white hover:bg-slate-800"
                            }`}
                        >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="text-xs text-gray-500 font-mono hidden sm:block px-4">
                    {diffResult.length} changes found
                </div>
            </div>

            {/* Input Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Original Text</label>
                    <textarea 
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-gray-300 font-mono text-sm resize-none focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Modified Text</label>
                    <textarea 
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                        className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 text-gray-300 font-mono text-sm resize-none focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Results Area */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Comparison Result</h3>
                    <div className="flex gap-4 text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
                            Removed
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
                            Added
                        </span>
                    </div>
                </div>
                
                <div className="p-6 overflow-x-auto">
                    <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-300">
                        {diffResult.map((part, index) => {
                            const color = part.added ? 'bg-green-500/20 text-green-200 border-b-2 border-green-500/30' : 
                                          part.removed ? 'bg-red-500/20 text-red-200 border-b-2 border-red-500/30 decoration-slice' : 
                                          'text-gray-400';
                            
                            // For line diffs, we might want block display
                            return (
                                <span key={index} className={`${color} rounded-[2px] px-0.5`}>
                                    {part.value}
                                </span>
                            );
                        })}
                    </pre>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
