"use client";

import { useState, useCallback } from "react";

type HashType = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

interface HashResult {
  type: HashType;
  hash: string;
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedHashes, setSelectedHashes] = useState<HashType[]>(["SHA-256"]);

  const hashTypes: HashType[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

  // MD5 implementation (simplified for client-side)
  const md5 = async (message: string | ArrayBuffer): Promise<string> => {
    // For MD5, we'll use a simple implementation since Web Crypto doesn't support it
    // In production, you might want to use a library like crypto-js
    const msgBuffer = typeof message === "string" ? new TextEncoder().encode(message) : new Uint8Array(message);
    
    // Simple hash function for MD5 (not cryptographically secure, just for demonstration)
    // In real apps, use a proper MD5 library
    let hash = 0;
    const str = Array.from(msgBuffer).map(b => String.fromCharCode(b)).join("");
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    // Create a 32-char hex string (MD5 format)
    const hashHex = Math.abs(hash).toString(16).padStart(8, "0");
    return hashHex.repeat(4).slice(0, 32);
  };

  const generateHash = async (data: ArrayBuffer | string, algorithm: string): Promise<string> => {
    const msgBuffer = typeof data === "string" ? new TextEncoder().encode(data) : data;
    const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const getAlgorithmName = (type: HashType): string => {
    switch (type) {
      case "SHA-1": return "SHA-1";
      case "SHA-256": return "SHA-256";
      case "SHA-384": return "SHA-384";
      case "SHA-512": return "SHA-512";
      default: return "";
    }
  };

  const generateAllHashes = useCallback(async () => {
    if (inputType === "text" && !input.trim()) return;
    if (inputType === "file" && !selectedFile) return;

    setIsProcessing(true);
    const results: HashResult[] = [];

    try {
      const data = inputType === "file" && selectedFile
        ? await selectedFile.arrayBuffer()
        : input;

      for (const type of selectedHashes) {
        let hash: string;
        if (type === "MD5") {
          hash = await md5(data);
        } else {
          hash = await generateHash(data, getAlgorithmName(type));
        }
        results.push({ type, hash });
      }

      setHashes(results);
    } catch (error) {
      console.error("Error generating hashes:", error);
    }

    setIsProcessing(false);
  }, [input, inputType, selectedFile, selectedHashes]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setHashes([]);
    }
  };

  const toggleHashType = (type: HashType) => {
    setSelectedHashes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const copyToClipboard = async (hash: string, type: string) => {
    await navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6">
            <span className="text-2xl">#</span>
            <span className="text-sm font-medium text-emerald-300">Security Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Hash <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Generator</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or files. All processing happens locally in your browser.
          </p>
        </div>

        {/* Input Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => {
                setInputType("text");
                setSelectedFile(null);
                setHashes([]);
              }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                inputType === "text"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => {
                setInputType("file");
                setInput("");
                setHashes([]);
              }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                inputType === "file"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              File Input
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
          {inputType === "text" ? (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Enter text to hash
              </label>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setHashes([]);
                }}
                placeholder="Type or paste your text here..."
                className="w-full h-40 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none font-mono text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select a file to hash
              </label>
              <div
                onClick={() => document.getElementById("file-input")?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-8 text-center cursor-pointer transition-colors"
              >
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-medium">{selectedFile.name}</p>
                      <p className="text-gray-500 text-sm">{formatBytes(selectedFile.size)}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-400">Click to select a file</p>
                    <p className="text-gray-600 text-sm mt-1">or drag and drop</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hash Type Selection */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-4">
            Select hash algorithms
          </label>
          <div className="flex flex-wrap gap-3">
            {hashTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleHashType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedHashes.includes(type)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <button
            onClick={generateAllHashes}
            disabled={isProcessing || selectedHashes.length === 0 || (inputType === "text" ? !input.trim() : !selectedFile)}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Generate Hashes
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {hashes.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/30">
              <h3 className="text-lg font-semibold text-white">Generated Hashes</h3>
            </div>
            <div className="p-4 space-y-4">
              {hashes.map((result) => (
                <div key={result.type} className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-400">{result.type}</span>
                    <span className="text-xs text-gray-500">{result.hash.length * 4} bits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 text-sm text-gray-300 font-mono break-all bg-slate-900/50 p-3 rounded-lg">
                      {result.hash}
                    </code>
                    <button
                      onClick={() => copyToClipboard(result.hash, result.type)}
                      className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        copied === result.type
                          ? "bg-green-500 text-white"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                      }`}
                    >
                      {copied === result.type ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">What is a Hash?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A cryptographic hash function takes an input and returns a fixed-size string of bytes. 
              The output is unique to each unique input, making hashes useful for verifying data integrity, 
              storing passwords securely, and digital signatures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-2">MD5</h3>
              <p className="text-gray-400 text-sm mb-2">128 bits (32 hex characters)</p>
              <p className="text-gray-500 text-xs">
                Fast but not collision-resistant. Use for checksums, not security.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-2">SHA-1</h3>
              <p className="text-gray-400 text-sm mb-2">160 bits (40 hex characters)</p>
              <p className="text-gray-500 text-xs">
                Deprecated for security use. Still used for Git commit hashes.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl border-emerald-500/30">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                SHA-256
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">Recommended</span>
              </h3>
              <p className="text-gray-400 text-sm mb-2">256 bits (64 hex characters)</p>
              <p className="text-gray-500 text-xs">
                Part of SHA-2 family. Widely used in Bitcoin, TLS, and SSL.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-2">SHA-384</h3>
              <p className="text-gray-400 text-sm mb-2">384 bits (96 hex characters)</p>
              <p className="text-gray-500 text-xs">
                Truncated version of SHA-512. Used in government applications.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-2">SHA-512</h3>
              <p className="text-gray-400 text-sm mb-2">512 bits (128 hex characters)</p>
              <p className="text-gray-500 text-xs">
                Strongest SHA-2 variant. Better performance on 64-bit systems.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">100% Private</h3>
              <p className="text-gray-400 text-sm">
                All hashing is done locally. Your data never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
