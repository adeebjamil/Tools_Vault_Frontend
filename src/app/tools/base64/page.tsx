"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Add Image import to fix error

export default function Base64Page() {
  const [tab, setTab] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const process = (str: string, mode: 'encode' | 'decode' = tab) => {
    try {
      if (mode === 'encode') {
        let res = btoa(unescape(encodeURIComponent(str))); // Handle UTF-8
        if (isUrlSafe) res = res.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        setOutput(res);
      } else {
        let strToDecode = str;
        if (isUrlSafe) strToDecode = str.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if missing
        while (strToDecode.length % 4) strToDecode += '=';
        
        const res = decodeURIComponent(escape(window.atob(strToDecode)));
        setOutput(res);

        // Check if image
        if (str.startsWith('data:image')) {
            setFilePreview(str);
        } else {
            setFilePreview(null);
        }
      }
    } catch (e) {
      setOutput("Error: Invalid input");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTab('encode');
      const reader = new FileReader();
      reader.onload = (evt) => {
        const res = evt.target?.result as string;
        setInput(res); // Full Data URI
        setOutput(res.split(',')[1]); // Just Base64
        if (file.type.startsWith('image/')) setFilePreview(res);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Base64 Converter</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Advanced Base64 Tool</h1>
              <p className="text-gray-400">Encode/Decode text, images, and files securely</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
             {/* Tabs */}
             <div className="flex gap-4 mb-6 border-b border-slate-800 pb-4">
               <button onClick={() => { setTab('encode'); process(input, 'encode'); }} className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${tab === 'encode' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                 Encode
               </button>
               <button onClick={() => { setTab('decode'); process(input, 'decode'); }} className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${tab === 'decode' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                 Decode
               </button>
               
               <div className="ml-auto flex items-center gap-3">
                 <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                   <input type="checkbox" checked={isUrlSafe} onChange={(e) => setIsUrlSafe(e.target.checked)} className="rounded border-slate-700 bg-slate-800" />
                   URL Safe Mode
                 </label>
               </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-300">Input {tab === 'encode' ? '(Text or File)' : '(Base64 String)'}</label>
                    {tab === 'encode' && (
                        <label className="text-xs text-blue-400 cursor-pointer hover:underline">
                           Upload File <input type="file" className="hidden" onChange={handleFile} />
                        </label>
                    )}
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => { setInput(e.target.value); process(e.target.value); }}
                    className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                    placeholder={tab === 'encode' ? 'Type text here...' : 'Paste Base64 here...'}
                  />
                </div>

                {/* Output */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                     <label className="text-sm font-medium text-gray-300">Output</label>
                     <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-blue-400 hover:underline">Copy Result</button>
                  </div>
                  <textarea
                    readOnly
                    value={output}
                    className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl p-4 text-green-400 font-mono text-sm resize-none focus:outline-none"
                    placeholder="Result will appear here..."
                  />
                </div>
             </div>
             
             {/* Preview Area */}
             {filePreview && (
                <div className="mt-8 border-t border-slate-800 pt-6">
                   <h3 className="text-white font-medium mb-4">Preview</h3>
                   <div className="bg-slate-800/50 p-4 rounded-xl inline-block">
                     <Image src={filePreview} alt="Preview" width={300} height={300} className="rounded-lg max-h-64 object-contain" unoptimized />
                   </div>
                </div>
             )}
           </div>
        </div>
      </section>
    </>
  );
}
