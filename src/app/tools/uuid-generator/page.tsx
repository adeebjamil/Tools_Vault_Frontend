"use client";

import { useState, useCallback } from "react";

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(10);
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [uppercase, setUppercase] = useState(false);
  const [withBraces, setWithBraces] = useState(false);
  const [copied, setCopied] = useState<number | "all" | null>(null);

  // Generate UUID v4 (random)
  const generateUUIDv4 = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Generate UUID v1 (time-based - simplified version)
  const generateUUIDv1 = (): string => {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, "0");
    const randomPart = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 65536).toString(16).padStart(4, "0")
    ).join("");
    
    return `${timeHex.slice(0, 8)}-${timeHex.slice(8, 12)}-1${randomPart.slice(0, 3)}-${
      ["8", "9", "a", "b"][Math.floor(Math.random() * 4)]
    }${randomPart.slice(3, 6)}-${randomPart.slice(6)}${Math.floor(Math.random() * 65536).toString(16).padStart(4, "0")}`;
  };

  const formatUUID = (uuid: string): string => {
    let formatted = uppercase ? uuid.toUpperCase() : uuid;
    if (withBraces) formatted = `{${formatted}}`;
    return formatted;
  };

  const generateUUIDs = useCallback(() => {
    const generator = version === "v4" ? generateUUIDv4 : generateUUIDv1;
    const newUuids = Array.from({ length: quantity }, () => formatUUID(generator()));
    setUuids(newUuids);
  }, [quantity, version, uppercase, withBraces]);

  const copyToClipboard = async (text: string, index: number | "all") => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    copyToClipboard(uuids.join("\n"), "all");
  };

  const downloadAsText = () => {
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids_${version}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsJSON = () => {
    const blob = new Blob([JSON.stringify(uuids, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids_${version}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
            <span className="text-2xl">🔑</span>
            <span className="text-sm font-medium text-violet-300">Generator Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            UUID <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Generator</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Generate unique UUIDs (Universally Unique Identifiers) for your databases, APIs, and applications. Supports v1 and v4 formats.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(1000, Math.max(1, Number(e.target.value))))}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Version */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Version
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setVersion("v4")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    version === "v4"
                      ? "bg-violet-500 text-white"
                      : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                  }`}
                >
                  v4 (Random)
                </button>
                <button
                  onClick={() => setVersion("v1")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    version === "v1"
                      ? "bg-violet-500 text-white"
                      : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                  }`}
                >
                  v1 (Time)
                </button>
              </div>
            </div>

            {/* Uppercase */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Case
              </label>
              <button
                onClick={() => setUppercase(!uppercase)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  uppercase
                    ? "bg-violet-500 text-white"
                    : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                }`}
              >
                {uppercase ? "UPPERCASE" : "lowercase"}
              </button>
            </div>

            {/* Braces */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Format
              </label>
              <button
                onClick={() => setWithBraces(!withBraces)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  withBraces
                    ? "bg-violet-500 text-white"
                    : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                }`}
              >
                {withBraces ? "{with-braces}" : "without-braces"}
              </button>
            </div>
          </div>

          <button
            onClick={generateUUIDs}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate {quantity} UUID{quantity > 1 ? "s" : ""}
          </button>
        </div>

        {/* Results */}
        {uuids.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-700/50 bg-slate-800/30">
              <span className="text-sm text-gray-400">
                Generated {uuids.length} UUID{uuids.length > 1 ? "s" : ""}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copyAll}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    copied === "all"
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {copied === "all" ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
                <button
                  onClick={downloadAsText}
                  className="px-4 py-2 bg-slate-700 text-gray-300 hover:bg-slate-600 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  .txt
                </button>
                <button
                  onClick={downloadAsJSON}
                  className="px-4 py-2 bg-slate-700 text-gray-300 hover:bg-slate-600 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  .json
                </button>
              </div>
            </div>

            {/* UUID List */}
            <div className="max-h-[500px] overflow-y-auto p-4">
              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors group"
                  >
                    <code className="text-sm text-violet-300 font-mono">{uuid}</code>
                    <button
                      onClick={() => copyToClipboard(uuid, index)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                        copied === index
                          ? "bg-green-500 text-white"
                          : "bg-slate-700 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-slate-600"
                      }`}
                    >
                      {copied === index ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">What is a UUID?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. 
              UUIDs are commonly used in databases, distributed systems, and APIs to generate unique identifiers without a central authority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-violet-400">v4</span> - Random UUID
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Version 4 UUIDs are generated using random or pseudo-random numbers. They&apos;re the most commonly used type.
              </p>
              <code className="text-xs text-violet-300 bg-slate-800 px-3 py-2 rounded block font-mono">
                xxxxxxxx-xxxx-<span className="text-green-400">4</span>xxx-<span className="text-yellow-400">y</span>xxx-xxxxxxxxxxxx
              </code>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-violet-400">v1</span> - Time-based UUID
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Version 1 UUIDs are generated using the current timestamp and the MAC address of the computer.
              </p>
              <code className="text-xs text-violet-300 bg-slate-800 px-3 py-2 rounded block font-mono">
                &lt;time_low&gt;-&lt;time_mid&gt;-<span className="text-green-400">1</span>&lt;time_hi&gt;-&lt;clock&gt;-&lt;node&gt;
              </code>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Guaranteed Unique</h3>
              <p className="text-gray-400 text-sm">
                The probability of generating a duplicate UUID is astronomically low (1 in 2^128).
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Generation</h3>
              <p className="text-gray-400 text-sm">
                Generate hundreds of UUIDs instantly with no server latency.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Export Options</h3>
              <p className="text-gray-400 text-sm">
                Download your UUIDs as TXT or JSON files for easy integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
