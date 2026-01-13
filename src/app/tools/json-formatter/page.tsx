"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

// Simple recursive Tree Viewer component
const JsonTree = ({ data, level = 0 }: { data: any, level?: number }) => {
  const [expanded, setExpanded] = useState(true);

  if (data === null) return <span className="text-red-400">null</span>;
  if (data === undefined) return <span className="text-gray-500">undefined</span>;
  if (typeof data === 'boolean') return <span className="text-purple-400">{data.toString()}</span>;
  if (typeof data === 'number') return <span className="text-orange-400">{data}</span>;
  if (typeof data === 'string') return <span className="text-green-400">"{data}"</span>;

  const isArray = Array.isArray(data);
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  if (isEmpty) return <span className="text-gray-400">{isArray ? '[]' : '{}'}</span>;

  return (
    <div className="font-mono text-xs sm:text-sm leading-5 sm:leading-6">
      <span 
        onClick={() => setExpanded(!expanded)} 
        className="cursor-pointer hover:text-white text-blue-400 inline-flex items-center"
      >
        <span className={`mr-1 transform transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
        {isArray ? `Array(${data.length})` : 'Object'}
      </span>
      
      {expanded && (
        <div className="ml-3 sm:ml-4 border-l border-slate-800 pl-2">
          {keys.map((key, index) => (
            <div key={key} className="flex items-start flex-wrap">
              <span className="text-cyan-300 mr-2">{key}:</span>
              <JsonTree data={data[key]} level={level + 1} />
              {index < keys.length - 1 && <span className="text-gray-500">,</span>}
            </div>
          ))}
        </div>
      )}
      {!expanded && <span className="text-gray-500 ml-2">...</span>}
    </div>
  );
};

export default function JsonFormatterPage() {
  const [input, setInput] = useState('{\n  "project": "ToolsVault",\n  "version": 1.0,\n  "features": ["Dev Tools", "SEO Friendly", "Dark Mode"],\n  "active": true\n}');
  const [viewMode, setViewMode] = useState<'code' | 'tree'>('code');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ size: string, items: number } | null>(null);
  const [copied, setCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    validate(input);
  }, [input]);

  const validate = (json: string) => {
    try {
      if (!json.trim()) {
        setStats(null);
        setError(null);
        return;
      }
      const parsed = JSON.parse(json);
      setError(null);
      const str = JSON.stringify(parsed);
      setStats({
        size: new Blob([str]).size + ' bytes',
        items: Object.keys(parsed).length
      });
    } catch (e: any) {
      setError(e.message);
      setStats(null);
    }
  };

  const format = (space: number) => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, space));
    } catch (e) {
      // ignore
    }
  };

  const minify = () => format(0);
  const prettify = () => format(2);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setInput(event.target.result as string);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* SEO Meta Tags - Dynamic */}
      <Head>
        <title>JSON Formatter & Validator - Free Online Tool | ToolsVault</title>
        <meta name="description" content="Format, validate, beautify and minify JSON data online for free. Instant syntax highlighting, error detection, and tree view. 100% client-side processing." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON beautifier, JSON minifier, online JSON tool, format JSON online, validate JSON" />
        <link rel="canonical" href="https://tools-vault.app/tools/json-formatter" />
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
            <span className="text-blue-400">JSON Formatter</span>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  JSON Formatter & Validator
                </h1>
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  Developer
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Validate, beautify, minify, and inspect JSON data with syntax highlighting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="pb-8 sm:pb-12 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar */}
          <div className="bg-slate-900 border border-slate-700 border-b-0 rounded-t-xl p-2 sm:p-3">
            {/* Mobile: Two rows */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={prettify} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  Beautify
                </button>
                <button onClick={minify} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-700 text-gray-300 hover:bg-slate-600 transition-colors">
                  Minify
                </button>
                <div className="w-px h-5 bg-slate-700 hidden sm:block" />
                <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button 
                    onClick={() => setViewMode('code')}
                    className={`px-2 sm:px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'code' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                    Code
                  </button>
                  <button 
                    onClick={() => setViewMode('tree')}
                    className={`px-2 sm:px-3 py-1 text-xs rounded-md transition-all ${viewMode === 'tree' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  >
                    Tree
                  </button>
                </div>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex items-center gap-3 sm:ml-auto">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".json" 
                  className="hidden" 
                />
                <button onClick={() => fileInputRef.current?.click()} className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Upload</span>
                </button>
                <button onClick={copyToClipboard} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] border border-slate-700 bg-slate-950 rounded-b-xl overflow-hidden flex flex-col">
            {viewMode === 'code' ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 w-full p-4 sm:p-6 font-mono text-xs sm:text-sm bg-transparent text-gray-300 resize-none focus:outline-none"
                spellCheck={false}
                placeholder="Paste your JSON here..."
              />
            ) : (
              <div className="flex-1 w-full p-4 sm:p-6 overflow-auto">
                 {!error && input.trim() ? (
                   <JsonTree data={JSON.parse(input)} />
                 ) : (
                   <div className="text-center text-gray-500 mt-12 sm:mt-20">
                     Valid JSON required for tree view
                   </div>
                 )}
              </div>
            )}
            
            {/* Status Bar */}
            <div className="bg-slate-900 border-t border-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs font-mono">
              <div className={`${error ? 'text-red-400' : 'text-green-400'} flex items-center gap-1.5 sm:gap-2 truncate`}>
                 <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
                 <span className="truncate">{error ? `Error: ${error}` : 'Valid JSON'}</span>
              </div>
              {stats && <div className="text-gray-500 shrink-0">{stats.items} items • {stats.size}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Instant Validation</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Real-time JSON validation with detailed error messages showing exactly where syntax issues occur.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Tree View</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Explore complex JSON structures with an interactive tree view. Expand and collapse nested objects easily.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">100% Private</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Your JSON never leaves your browser. All processing happens locally for complete data privacy.
              </p>
            </div>
          </div>

          {/* SEO Text Content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">What is JSON?</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format that&apos;s easy for humans to read and write, 
              and easy for machines to parse and generate. It&apos;s the most common data format used in web APIs, configuration files, 
              and data storage.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">How to use this JSON Formatter</h2>
            <ol className="text-gray-400 space-y-2 text-sm sm:text-base list-decimal list-inside">
              <li>Paste your JSON data into the editor above</li>
              <li>Click &quot;Beautify&quot; to format with proper indentation</li>
              <li>Click &quot;Minify&quot; to compress JSON for production use</li>
              <li>Switch to &quot;Tree View&quot; to explore nested structures</li>
              <li>Copy the formatted result with one click</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
