"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function MarkdownToPdfPage() {
  const [markdown, setMarkdown] = useState("# Project Proposal\n\n**Date:** October 2023\n\n## Overview\nThis document outlines the proposed strategy for the new marketing campaign.\n\n### Objectives\n1. Increase brand awareness\n2. Drive user engagement\n\n### Timeline\n- Phase 1: Planning\n- Phase 2: Execution\n");
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import("html2pdf.js")).default;
      
      const element = previewRef.current;
      const opt = {
        margin:       1,
        filename:     'document.pdf',
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (e) {
      console.error("PDF Generation failed", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Markdown to PDF</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Markdown to PDF</h1>
              <p className="text-gray-400">Convert Markdown content to professionally formatted PDF documents</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
                
                {/* Editor */}
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-gray-300">Markdown Input</label>
                    </div>
                    <textarea 
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-gray-300 font-mono text-sm resize-none focus:border-blue-500 focus:outline-none leading-relaxed"
                        placeholder="Type your markdown here..."
                    />
                </div>

                {/* Preview & Action */}
                <div className="flex flex-col space-y-2">
                     <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-gray-300">Preview (PDF Output)</label>
                        <button 
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>Generating...</>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download PDF
                                </>
                            )}
                        </button>
                    </div>
                    
                    <div className="flex-1 bg-slate-200/50 rounded-xl p-4 overflow-y-auto flex justify-center">
                        <div className="bg-white shadow-xl min-h-full w-full max-w-[210mm] p-[10mm] text-slate-900 prose prose-sm max-w-none">
                             <div ref={previewRef}>
                                <ReactMarkdown>{markdown}</ReactMarkdown>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}
