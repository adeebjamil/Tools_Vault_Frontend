"use client";

import { useState } from "react";

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
        setError(null);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
        setError(null);
      }
    } catch {
      setError(mode === "encode" 
        ? "Failed to encode. Please check your input."
        : "Invalid Base64 string. Please check your input."
      );
      setOutput("");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setOutput("");
    setError(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setOutput("");
    }
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setMode("encode")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === "encode"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === "decode"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      {/* Converter Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {mode === "encode" ? "Plain Text" : "Base64 String"}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === "encode" 
              ? "Enter text to encode..." 
              : "Enter Base64 to decode..."
            }
            className="w-full h-64 p-4 font-mono text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {mode === "encode" ? "Base64 Output" : "Decoded Text"}
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-200 rounded-xl resize-none"
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={handleConvert} className="btn btn-primary px-8">
          {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
        </button>
        <button onClick={handleSwap} className="btn btn-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Swap
        </button>
        <button onClick={handleClear} className="btn btn-ghost">
          Clear
        </button>
      </div>

      {/* Stats */}
      {(input || output) && (
        <div className="flex flex-wrap justify-center gap-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-center">
            <span className="text-sm text-gray-500">Input Length:</span>
            <span className="ml-2 font-semibold text-gray-900">{input.length}</span>
          </div>
          <div className="text-center">
            <span className="text-sm text-gray-500">Output Length:</span>
            <span className="ml-2 font-semibold text-gray-900">{output.length}</span>
          </div>
          {mode === "encode" && output && (
            <div className="text-center">
              <span className="text-sm text-gray-500">Size Increase:</span>
              <span className="ml-2 font-semibold text-gray-900">
                {((output.length / input.length - 1) * 100).toFixed(0)}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
