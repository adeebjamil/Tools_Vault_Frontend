"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [showDensity, setShowDensity] = useState(true);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    const readingTime = Math.ceil(words / 200); // 200 wpm
    const speakingTime = Math.ceil(words / 130); // 130 wpm

    return { chars, charsNoSpace, words, sentences, paragraphs, readingTime, speakingTime };
  }, [text]);

  const density = useMemo(() => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts: Record<string, number> = {};
    words.forEach(w => counts[w] = (counts[w] || 0) + 1);
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([word, count]) => ({ word, count, percentage: Math.round((count / words.length) * 100) }));
  }, [text]);

  const transform = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    let newText = text;
    if (type === 'upper') newText = text.toUpperCase();
    if (type === 'lower') newText = text.toLowerCase();
    if (type === 'title') {
      newText = text.replace(/\b\w/g, c => c.toUpperCase());
    }
    if (type === 'sentence') {
      newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    }
    setText(newText);
  };

  const clean = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Word Counter & Text Analyzer - Free Online Tool | ToolsVault</title>
        <meta name="description" content="Count words, characters, sentences, and paragraphs in your text. Get reading time estimates and keyword density analysis. Free online word counter." />
        <meta name="keywords" content="word counter, character counter, text analyzer, reading time calculator, keyword density, word count online" />
        <link rel="canonical" href="https://tools-vault.app/tools/word-counter" />
      </Head>

      {/* Header Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6" aria-label="Breadcrumb">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">
              Tools
            </Link>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-400">Word Counter</span>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Word & Character Counter
                </h1>
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  Text
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Analyze text metrics, keyword density, and reading time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="pb-8 sm:pb-12 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {/* Toolbar */}
              <div className="bg-slate-900 border border-slate-700 rounded-lg sm:rounded-xl p-2 sm:p-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button onClick={() => transform('upper')} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs border border-slate-700 hover:bg-slate-800 rounded text-gray-300 transition-colors">
                    UPPER
                  </button>
                  <button onClick={() => transform('lower')} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs border border-slate-700 hover:bg-slate-800 rounded text-gray-300 transition-colors">
                    lower
                  </button>
                  <button onClick={() => transform('title')} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs border border-slate-700 hover:bg-slate-800 rounded text-gray-300 transition-colors">
                    Title
                  </button>
                  <button onClick={() => transform('sentence')} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs border border-slate-700 hover:bg-slate-800 rounded text-gray-300 transition-colors">
                    Sentence
                  </button>
                  <div className="w-px h-5 bg-slate-700 mx-1 hidden sm:block" />
                  <button onClick={clean} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs text-blue-400 hover:text-white transition-colors">
                    Fix Spaces
                  </button>
                  <button onClick={() => setText('')} className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs text-red-400 hover:text-white transition-colors ml-auto">
                    Clear
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] bg-slate-950 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-sm sm:text-base text-gray-300 focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                placeholder="Start typing or paste your text here..."
              />
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Primary Stats - Mobile: 4 columns, Desktop: 2 columns */}
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-4">
                <StatCard label="Words" value={stats.words} color="text-blue-400" />
                <StatCard label="Characters" value={stats.chars} color="text-purple-400" />
                <StatCard label="Sentences" value={stats.sentences} color="text-green-400" />
                <StatCard label="Paragraphs" value={stats.paragraphs} color="text-orange-400" />
              </div>

              {/* Secondary Stats */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4">
                <h3 className="text-white font-semibold text-sm sm:text-base border-b border-slate-800 pb-2">Analysis</h3>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Reading Time</span>
                  <span className="text-white">{stats.readingTime} min</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Speaking Time</span>
                  <span className="text-white">{stats.speakingTime} min</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                   <span className="text-gray-400">Chars (no space)</span>
                   <span className="text-white">{stats.charsNoSpace}</span>
                </div>
              </div>

              {/* Keyword Density */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <h3 className="text-white font-semibold text-sm sm:text-base border-b border-slate-800 pb-2 mb-3 sm:mb-4">Keyword Density</h3>
                {density.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {density.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-300 truncate max-w-[80px] sm:max-w-[100px]">{item.word}</span>
                        <div className="flex items-center gap-2 sm:gap-3">
                           <div className="w-12 sm:w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500" style={{ width: `${Math.min(item.percentage * 2, 100)}%` }} />
                           </div>
                           <span className="text-gray-500 w-6 sm:w-8 text-right">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs sm:text-sm text-center py-4">Start typing to see density</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Real-time Analysis</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Instant word and character counts as you type. No need to click any button.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">SEO Insights</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Keyword density analysis helps optimize your content for search engines.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Reading Time</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Estimate how long it takes to read or speak your content aloud.
              </p>
            </div>
          </div>

          {/* SEO Text Content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Why Use a Word Counter?</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              A word counter is essential for writers, students, and content creators who need to meet specific word count requirements. 
              Whether you&apos;re writing a blog post, academic essay, or social media caption, knowing your exact word count helps you 
              stay within guidelines and optimize your content length for the platform.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Features of This Word Counter</h2>
            <ul className="text-gray-400 space-y-2 text-sm sm:text-base list-disc list-inside">
              <li>Real-time word, character, sentence, and paragraph counting</li>
              <li>Reading time and speaking time estimates</li>
              <li>Keyword density analysis for SEO optimization</li>
              <li>Text transformation tools (uppercase, lowercase, title case)</li>
              <li>Remove extra whitespace with one click</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-slate-900 border border-slate-700 p-2 sm:p-4 rounded-lg sm:rounded-xl text-center">
      <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${color} mb-0.5 sm:mb-1`}>{value}</div>
      <div className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
