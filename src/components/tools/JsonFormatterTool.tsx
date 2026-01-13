"use client";

import { useState, useMemo } from "react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null };
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      return { output: formatted, error: null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, indentSize]);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setInput(formatted);
    } catch {
      // Error will be shown via useMemo
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
    } catch {
      // Error will be shown via useMemo
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleSample = () => {
    const sampleJson = {
      name: "ToolsVault",
      version: "1.0.0",
      description: "Free online tools for developers",
      features: [
        "JSON Formatter",
        "Word Counter",
        "QR Code Generator",
      ],
      pricing: {
        plan: "free",
        cost: 0,
      },
      isAwesome: true,
    };
    setInput(JSON.stringify(sampleJson, null, 2));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handleFormat} className="btn btn-primary text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Format
          </button>
          <button onClick={handleMinify} className="btn btn-secondary text-sm">
            Minify
          </button>
          <button onClick={handleCopy} disabled={!output} className="btn btn-secondary text-sm disabled:opacity-50">
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button onClick={handleClear} className="btn btn-ghost text-sm">
            Clear
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Indent:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="input w-20 py-1.5 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
          <button onClick={handleSample} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Load Sample
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-red-800">Invalid JSON</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Indicator */}
      {output && !error && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium text-green-800">Valid JSON</p>
          </div>
        </div>
      )}

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30\n}'
            className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output Panel */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Formatted Output</label>
          <div className="relative">
            <pre className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-xl overflow-auto">
              {output || (
                <span className="text-gray-500">Formatted JSON will appear here...</span>
              )}
            </pre>
            {output && (
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {output && (
        <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Characters:</span>
            <span className="ml-2 font-semibold text-gray-900">{output.length.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Lines:</span>
            <span className="ml-2 font-semibold text-gray-900">{output.split("\n").length}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Size:</span>
            <span className="ml-2 font-semibold text-gray-900">{(new Blob([output]).size / 1024).toFixed(2)} KB</span>
          </div>
        </div>
      )}
    </div>
  );
}
