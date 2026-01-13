"use client";

import { useState, useMemo } from "react";

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
}

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats: TextStats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: "0 min",
        speakingTime: "0 min",
      };
    }

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
    
    // Reading time: ~200 words per minute
    const readingMinutes = Math.ceil(words / 200);
    const readingTime = readingMinutes < 1 ? "< 1 min" : `${readingMinutes} min`;
    
    // Speaking time: ~150 words per minute
    const speakingMinutes = Math.ceil(words / 150);
    const speakingTime = speakingMinutes < 1 ? "< 1 min" : `${speakingMinutes} min`;

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  }, [text]);

  // Calculate keyword density
  const keywordDensity = useMemo(() => {
    if (!text.trim() || stats.words === 0) return [];

    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const wordCount: Record<string, number> = {};
    
    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return Object.entries(wordCount)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / stats.words) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [text, stats.words]);

  const handleClear = () => setText("");

  const handleSample = () => {
    setText(`ToolsVault is your go-to destination for free online tools designed for developers, designers, and content creators. Our mission is to provide fast, secure, and easy-to-use utilities that help you get things done without any hassle.

Whether you need to format JSON, count words, generate QR codes, or create color palettes, we've got you covered. All our tools run entirely in your browser, ensuring your data stays private and secure.

Join thousands of professionals who trust ToolsVault for their daily workflow. No sign-ups, no subscriptions – just powerful tools at your fingertips.`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { label: "Words", value: stats.words, icon: "W" },
          { label: "Characters", value: stats.characters, icon: "C" },
          { label: "No Spaces", value: stats.charactersNoSpaces, icon: "C" },
          { label: "Sentences", value: stats.sentences, icon: "S" },
          { label: "Paragraphs", value: stats.paragraphs, icon: "P" },
          { label: "Reading Time", value: stats.readingTime, icon: "📖" },
          { label: "Speaking Time", value: stats.speakingTime, icon: "🎤" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center"
          >
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <button onClick={handleClear} className="btn btn-secondary text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear
        </button>
        <button onClick={handleSample} className="btn btn-secondary text-sm">
          Load Sample Text
        </button>
        <div className="ml-auto text-sm text-gray-500">
          Tip: Paste your text below for instant statistics
        </div>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter or paste your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-80 p-4 text-base bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          spellCheck={true}
        />
      </div>

      {/* Keyword Density */}
      {keywordDensity.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Keywords
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {keywordDensity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-900 truncate">{item.word}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {item.count} <span className="text-xs">({item.density}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bars for common limits */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Character Limits
        </h3>
        <div className="space-y-4">
          {[
            { label: "Twitter/X Post", limit: 280, current: stats.characters },
            { label: "Meta Description", limit: 160, current: stats.characters },
            { label: "Instagram Caption", limit: 2200, current: stats.characters },
          ].map((item, index) => {
            const percentage = Math.min((item.current / item.limit) * 100, 100);
            const isOver = item.current > item.limit;
            
            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={isOver ? "text-red-600 font-medium" : "text-gray-500"}>
                    {item.current.toLocaleString()} / {item.limit.toLocaleString()}
                    {isOver && " (over limit)"}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isOver ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
