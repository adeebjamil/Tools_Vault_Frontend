"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Advanced Markdown Parser
function parseMarkdown(md: string): string {
  let html = md
    // Escape HTML (basic)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    // Code Blocks (fenced)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<div class="relative group my-4"><div class="absolute right-2 top-2 text-xs text-gray-500 font-mono opacity-50">$1</div><pre class="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto font-mono text-sm text-blue-300"><code>$2</code></pre></div>')

    // Inline Code
    .replace(/`([^`]+)`/g, '<code class="bg-slate-800/50 border border-slate-700/50 px-1.5 py-0.5 rounded text-sm text-blue-300 font-mono">$1</code>')

    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-6"><img src="$2" alt="$1" class="rounded-lg shadow-lg border border-slate-800 max-w-full h-auto" /><p class="text-sm text-gray-500 mt-2 text-center">$1</p></div>')

    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">$1</a>')

    // Task Lists
    .replace(/^(\s*)-\s\[x\]\s(.*)/gim, '<li class="flex items-start gap-3 my-1 text-gray-400 line-through decoration-slate-600"><input type="checkbox" checked readonly class="mt-1.5 w-4 h-4 rounded border-slate-600 bg-slate-800/50 accent-blue-500" /> <span>$2</span></li>')
    .replace(/^(\s*)-\s\[ \]\s(.*)/gim, '<li class="flex items-start gap-3 my-1 text-gray-300"><input type="checkbox" readonly class="mt-1.5 w-4 h-4 rounded border-slate-600 bg-slate-800/50" /> <span>$2</span></li>')

    // Blockquotes
    .replace(/^\>\s(.*)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-slate-800/20 rounded-r text-gray-400 italic">$1</blockquote>')

    // Horizontal Rule
    .replace(/^-{3,}$/gim, '<hr class="border-slate-800 my-8" />')

    // Tables (Basic)
    .replace(/^\|(.+)\|$/gim, (match) => {
      const cells = match.split('|').filter(c => c.trim()).map(c => `
        <td class="border border-slate-700 px-4 py-2 text-sm text-gray-300">${c.trim()}</td>
      `).join('');
      return `<tr class="hover:bg-slate-800/30 transition-colors">${cells}</tr>`;
    })

    // Headers
    .replace(/^# (.*)/gim, '<h1 class="text-3xl font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2">$1</h1>')
    .replace(/^## (.*)/gim, '<h2 class="text-2xl font-semibold text-white mt-6 mb-3">$1</h2>')
    .replace(/^### (.*)/gim, '<h3 class="text-xl font-medium text-white mt-5 mb-2">$1</h3>')

    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-white"><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-gray-300">$1</em>')
    .replace(/~~(.*?)~~/g, '<span class="line-through text-gray-500">$1</span>')

    // Lists
    .replace(/^\s*[\-\*]\s(.*)/gim, '<li class="ml-4 text-gray-300 list-disc list-outside my-1">$1</li>')
    .replace(/^\s*\d+\.\s(.*)/gim, '<li class="ml-4 text-gray-300 list-decimal list-outside my-1">$1</li>')

    // Newlines
    .replace(/\n/g, '<br />');

  // Wrap tables if parsed
  if (html.includes('<td')) {
    html = `<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse border border-slate-700 rounded-lg overflow-hidden">${html}</table></div>`;
  }

  return html;
}

const sampleMarkdown = `# 🚀 Advanced Markdown Preview

Welcome to your new **power tool**! 

## ✨ Features
- **Live Preview**: See changes instantly
- **GitHub Flavored**: Supports task lists, tables, and more
- **Export**: Download as HTML or Markdown file

### 📝 Styled Components
> "Design is behavior, not just form."

### 💻 Code Snippets
\`\`\`javascript
function hello() {
  console.log("Hello ToolsVault!");
}
\`\`\`

### ✅ Task List
- [x] Create amazing content
- [x] Use Markdown Preview
- [ ] Share with friends

### 📊 Tables support
| Feature | Status |
| :--- | :--- |
| Dark Mode | ✅ Ready |
| Exports | ✅ Ready |
| Offline | ✅ Ready |

Happy writing! ✍️`;

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(sampleMarkdown);
  const [activeView, setActiveView] = useState<'split' | 'edit' | 'preview'>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert text at cursor position
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = input.substring(start, end);
    const newText = input.substring(0, start) + before + selectedText + after + input.substring(end);
    
    setInput(newText);
    
    // Restore focus and cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const downloadFile = (type: 'md' | 'html') => {
    const content = type === 'md' ? input : `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>body { background-color: #0f172a; color: #e2e8f0; padding: 2rem; max-width: 800px; margin: 0 auto; }</style>
</head>
<body class="prose prose-invert">
    ${parseMarkdown(input)}
</body>
</html>`;

    const blob = new Blob([content], { type: type === 'md' ? 'text/markdown' : 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />
        
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Markdown Editor</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="icon-box flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Advanced Markdown Editor
                </h1>
                <p className="text-gray-400 text-lg">
                  Real-time preview editor with support for tables, tasks, and code
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-lg border border-slate-700 mb-2 md:mb-0">
              <button
                onClick={() => setActiveView('edit')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeView === 'edit'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveView('split')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeView === 'split'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setActiveView('preview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeView === 'preview'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8 h-[calc(100vh-280px)] min-h-[600px] relative">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          {/* Toolbar */}
          <div className="bg-slate-900 border border-slate-700 rounded-t-xl p-2 flex flex-wrap items-center gap-2 sticky top-0 z-20">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r border-slate-700 pr-2 mr-1">
              <ToolbarButton icon="bold" tooltip="Bold" onClick={() => insertText("**", "**")} />
              <ToolbarButton icon="italic" tooltip="Italic" onClick={() => insertText("*", "*")} />
              <ToolbarButton icon="strikethrough" tooltip="Strike" onClick={() => insertText("~~", "~~")} />
            </div>

            {/* Headers */}
            <div className="flex items-center gap-1 border-r border-slate-700 pr-2 mr-1">
              <ToolbarButton icon="h1"Label="H1" tooltip="Header 1" onClick={() => insertText("# ")} />
              <ToolbarButton icon="h2"Label="H2" tooltip="Header 2" onClick={() => insertText("## ")} />
            </div>

            {/* Structural */}
            <div className="flex items-center gap-1 border-r border-slate-700 pr-2 mr-1">
              <ToolbarButton icon="code" tooltip="Code Block" onClick={() => insertText("\n```\n", "\n```\n")} />
              <ToolbarButton icon="quote" tooltip="Quote" onClick={() => insertText("> ")} />
              <ToolbarButton icon="link" tooltip="Link" onClick={() => insertText("[", "](url)")} />
              <ToolbarButton icon="image" tooltip="Image" onClick={() => insertText("![alt]", "(url)")} />
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1">
              <ToolbarButton icon="list-ul" tooltip="Bullet List" onClick={() => insertText("- ")} />
              <ToolbarButton icon="list-ol" tooltip="Numbered List" onClick={() => insertText("1. ")} />
              <ToolbarButton icon="check-square" tooltip="Task List" onClick={() => insertText("- [ ] ")} />
            </div>

            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => downloadFile('md')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                title="Download Markdown"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span className="hidden sm:inline">.MD</span>
              </button>
              <button 
                onClick={() => downloadFile('html')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                title="Download HTML"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <span className="hidden sm:inline">.HTML</span>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 min-h-0 flex border border-t-0 border-slate-700 bg-slate-900 rounded-b-xl overflow-hidden relative">
            
            {/* Input (Editor) */}
            <div className={`
              ${activeView === 'preview' ? 'hidden' : 'flex'} 
              ${activeView === 'split' ? 'w-1/2 border-r border-slate-700' : 'w-full'}
              flex-col
            `}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-950 p-6 text-sm font-mono text-gray-300 resize-none focus:outline-none leading-relaxed selection:bg-blue-500/30"
                spellCheck={false}
                placeholder="Start typing markdown..."
              />
              <div className="bg-slate-900 border-t border-slate-800 px-4 py-1.5 text-xs text-gray-500 font-mono flex justify-between">
                <span>Markdown</span>
                <span>{input.length} chars</span>
              </div>
            </div>

            {/* Output (Preview) */}
            <div className={`
              ${activeView === 'edit' ? 'hidden' : 'flex'}
              ${activeView === 'split' ? 'w-1/2' : 'w-full'}
              flex-col bg-slate-900
            `}>
              <div 
                className="flex-1 overflow-auto p-6 prose prose-invert max-w-none scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(input) }}
              />
               <div className="bg-slate-900 border-t border-slate-800 px-4 py-1.5 text-xs text-gray-500 font-mono flex justify-between">
                <span>Preview</span>
                <span>HTML Output</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function ToolbarButton({ icon, Label, tooltip, onClick }: { icon: string, Label?: string, tooltip: string, onClick: () => void }) {
  const getIcon = (name: string) => {
    switch(name) {
      case 'bold': return <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6V4zm0 8h8a4 4 0 014 4 4 4 0 01-4 4H6v-8z" />;
      case 'italic': return <path d="M10 5l-2 14M16 5l-2 14" />;
      case 'strikethrough': return <path d="M5 12h14M4 12h16" />;
      case 'code': return <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
      case 'quote': return <path d="M10 11h2a2 2 0 012 2v2a2 2 0 01-2 2h-2v2a2 2 0 002 2h2v-2a2 2 0 00-2-2h-2v-4h2a2 2 0 002-2V9a2 2 0 00-2-2h-2v4z" />;
      case 'link': return <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" />;
      case 'image': return <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'list-ul': return <path d="M4 6h16M4 12h16M4 18h16" />;
      case 'list-ol': return <path d="M7 6h14M7 12h14M7 18h14M3 18v-2h2M3 6h1v2H3zm1 6v2H3v-2h1z" />;
      case 'check-square': return <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      default: return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors group relative"
      title={tooltip}
    >
      {Label ? (
        <span className="font-bold text-xs w-4 h-4 flex items-center justify-center">{Label}</span>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {getIcon(icon)}
        </svg>
      )}
    </button>
  );
}
