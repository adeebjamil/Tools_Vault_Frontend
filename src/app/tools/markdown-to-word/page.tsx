"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { asBlob } from "html-docx-js-typescript";
import { renderToStaticMarkup } from "react-dom/server";

export default function MarkdownToWordPage() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is a sample markdown document.\n\n- Item 1\n- Item 2\n\n## Subheader\n\nBold text and *italic* text.");

  const handleDownload = async () => {
    // Convert Markdown to HTML String
    const htmlString = renderToStaticMarkup(
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    );

    // Create full HTML document structure
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          ${htmlString}
        </body>
      </html>
    `;

    try {
      const blob = await asBlob(fullHtml);
      
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `document.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Conversion failed", error);
      alert("Failed to generate Word document.");
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
            <span className="text-blue-400">Markdown to Word</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l5.414 5.414a1 1 0 01.586 1.414V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Markdown to Word</h1>
              <p className="text-gray-400">Convert Markdown content to .docx documents</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                
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
                        <label className="text-sm font-medium text-gray-300">Live Preview</label>
                        <button 
                            onClick={handleDownload}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download DOCX
                        </button>
                    </div>
                    
                    <div className="flex-1 bg-white rounded-xl p-8 overflow-y-auto text-slate-900 prose prose-sm max-w-none">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </>
  );
}
