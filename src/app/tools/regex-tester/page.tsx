"use client";

import { useState, useMemo, useCallback } from "react";

interface Match {
  text: string;
  index: number;
  groups: { [key: string]: string } | undefined;
}

const commonPatterns = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&'()*+,;=]+" },
  { name: "Phone", pattern: "\\+?[1-9]\\d{1,14}" },
  { name: "IPv4", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
  { name: "Time (HH:MM)", pattern: "\\d{2}:\\d{2}" },
  { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}\\b" },
  { name: "Credit Card", pattern: "\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}" },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [copied, setCopied] = useState(false);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join("");
  }, [flags]);

  const { matches, error, highlightedText } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [], error: null, highlightedText: testString };
    }

    try {
      const regex = new RegExp(pattern, flagString);
      const foundMatches: Match[] = [];
      let match;

      if (flags.g) {
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.groups,
          });
          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            text: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      }

      // Create highlighted text
      let highlighted = testString;
      let offset = 0;
      const sortedMatches = [...foundMatches].sort((a, b) => a.index - b.index);

      for (const m of sortedMatches) {
        const startTag = '<mark class="bg-emerald-500/40 text-emerald-200 rounded px-0.5">';
        const endTag = "</mark>";
        const insertStart = m.index + offset;
        const insertEnd = insertStart + m.text.length;

        highlighted =
          highlighted.slice(0, insertStart) +
          startTag +
          highlighted.slice(insertStart, insertEnd) +
          endTag +
          highlighted.slice(insertEnd);

        offset += startTag.length + endTag.length;
      }

      return { matches: foundMatches, error: null, highlightedText: highlighted };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlightedText: testString };
    }
  }, [pattern, testString, flagString, flags.g]);

  const applyPattern = useCallback((p: string) => {
    setPattern(p);
  }, []);

  const copyPattern = async () => {
    await navigator.clipboard.writeText(`/${pattern}/${flagString}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPattern("");
    setTestString("");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
            <span className="text-2xl font-mono">.*</span>
            <span className="text-sm font-medium text-amber-300">Developer Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Regex <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tester</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Test and debug regular expressions with real-time matching and highlighting. Learn regex patterns with common examples.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pattern Input */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-400">Regular Expression</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPattern}
                    disabled={!pattern}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-slate-700 text-gray-400 hover:bg-slate-600 disabled:opacity-50"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={clearAll}
                    className="px-3 py-1 rounded text-xs font-medium bg-slate-700 text-gray-400 hover:bg-slate-600"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-2">
                <span className="text-amber-400 font-mono pl-2">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern..."
                  className="flex-1 bg-transparent border-0 text-white font-mono focus:outline-none placeholder-gray-600"
                />
                <span className="text-amber-400 font-mono">/</span>
                <span className="text-amber-300 font-mono pr-2">{flagString}</span>
              </div>

              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </div>
              )}

              {/* Flags */}
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { key: "g" as const, label: "Global", desc: "Find all matches" },
                  { key: "i" as const, label: "Case Insensitive", desc: "Ignore case" },
                  { key: "m" as const, label: "Multiline", desc: "^ and $ match line boundaries" },
                  { key: "s" as const, label: "Dotall", desc: ". matches newlines" },
                ].map((flag) => (
                  <button
                    key={flag.key}
                    onClick={() => toggleFlag(flag.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      flags[flag.key]
                        ? "bg-amber-500 text-white"
                        : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                    }`}
                    title={flag.desc}
                  >
                    {flag.key} - {flag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Test String */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <label className="block text-sm font-medium text-gray-400 mb-4">Test String</label>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against the regex..."
                className="w-full h-48 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none font-mono text-sm"
              />
            </div>

            {/* Highlighted Results */}
            {testString && pattern && !error && (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-400">Highlighted Matches</label>
                  <span className="text-xs text-amber-400 font-medium">
                    {matches.length} match{matches.length !== 1 ? "es" : ""} found
                  </span>
                </div>
                <div
                  className="p-4 bg-slate-800 rounded-xl font-mono text-sm text-gray-300 whitespace-pre-wrap break-all"
                  dangerouslySetInnerHTML={{ __html: highlightedText }}
                />
              </div>
            )}

            {/* Match Details */}
            {matches.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                <label className="block text-sm font-medium text-gray-400 mb-4">Match Details</label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {matches.map((match, index) => (
                    <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-amber-400">Match #{index + 1}</span>
                        <span className="text-xs text-gray-500">Index: {match.index}</span>
                      </div>
                      <code className="text-sm text-emerald-300 font-mono block bg-slate-900/50 p-2 rounded">
                        "{match.text}"
                      </code>
                      {match.groups && Object.keys(match.groups).length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <span className="text-xs text-gray-500">Named Groups:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(match.groups).map(([name, value]) => (
                              <div key={name} className="text-xs">
                                <span className="text-purple-400">{name}:</span>{" "}
                                <span className="text-gray-300">"{value}"</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Common Patterns */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Common Patterns</h3>
              <div className="space-y-2">
                {commonPatterns.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPattern(p.pattern)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                  >
                    <span className="text-sm text-white group-hover:text-amber-400 transition-colors">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Quick Reference</h3>
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">.</code>
                  <span className="text-gray-400">Any character</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">\d</code>
                  <span className="text-gray-400">Digit [0-9]</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">\w</code>
                  <span className="text-gray-400">Word char</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">\s</code>
                  <span className="text-gray-400">Whitespace</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">^</code>
                  <span className="text-gray-400">Start of line</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">$</code>
                  <span className="text-gray-400">End of line</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">*</code>
                  <span className="text-gray-400">0 or more</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">+</code>
                  <span className="text-gray-400">1 or more</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">?</code>
                  <span className="text-gray-400">0 or 1</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">{"{n}"}</code>
                  <span className="text-gray-400">Exactly n</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">[abc]</code>
                  <span className="text-gray-400">Character set</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">()</code>
                  <span className="text-gray-400">Capture group</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <code className="text-amber-400 bg-slate-800 px-2 py-1 rounded">|</code>
                  <span className="text-gray-400">Alternation</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-amber-300 mb-3">💡 Tips</h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Use <code className="text-amber-400 bg-slate-800 px-1 rounded">\</code> to escape special characters</li>
                <li>• Named groups: <code className="text-amber-400 bg-slate-800 px-1 rounded">{"(?<name>...)"}</code></li>
                <li>• Non-capturing: <code className="text-amber-400 bg-slate-800 px-1 rounded">(?:...)</code></li>
                <li>• Lookahead: <code className="text-amber-400 bg-slate-800 px-1 rounded">(?=...)</code></li>
                <li>• Lookbehind: <code className="text-amber-400 bg-slate-800 px-1 rounded">{"(?<=...)"}</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
