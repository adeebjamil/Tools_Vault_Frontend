"use client";

import { useState } from "react";
import Link from "next/link";

const LOREM_TYPES = {
  standard: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  hipster: "I'm baby kale chips twee vape, knausgaard humblebrag actually kitch leggings palo santo. 90s fam organic banh mi.",
  pirate: "Ahoy matey! Shiver me timbers, walk the plank ye scurvy dog. Dead men tell no tales, yo ho ho and a bottle of rum.",
  tech: "Blockchain AI machine learning big data cloud computing quantum cryptography neural networks glitch aesthetic cybernetic interface."
};

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'standard' | 'hipster' | 'pirate' | 'tech'>('standard');
  const [format, setFormat] = useState<'paragraphs' | 'sentences' | 'words' | 'list'>('paragraphs');
  const [htmlWrap, setHtmlWrap] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    let result = [];
    const seed = LOREM_TYPES[type].split(' ');
    
    // Very simple generation logic for demo purposes
    for (let i = 0; i < count; i++) {
       let chunk = "";
       // Random length
       const len = format === 'words' ? 1 : (format === 'sentences' ? 15 : 50);
       
       for(let j=0; j<len; j++) {
         chunk += seed[Math.floor(Math.random() * seed.length)] + " ";
       }
       
       chunk = chunk.trim();
       if (format !== 'words') chunk += ".";
       if (i === 0 && type === 'standard') chunk = "Lorem ipsum dolor sit amet, " + chunk.toLowerCase(); // Maintain classic start

       if (htmlWrap) {
           if (format === 'list') chunk = `<li>${chunk}</li>`;
           else chunk = `<p>${chunk}</p>`;
       }
       result.push(chunk);
    }
    
    if (htmlWrap && format === 'list') {
       setOutput(`<ul>\n${result.join('\n')}\n</ul>`);
    } else {
       setOutput(result.join('\n\n'));
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
            <span className="text-blue-400">Lorem Ipsum</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Advanced Lorem Ipsum</h1>
              <p className="text-gray-400">Generate placeholder text in various themes and formats</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Controls */}
           <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8 group hover:border-blue-500/50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Count</label>
                    <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="input w-full" />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Format</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="input w-full">
                       <option value="paragraphs">Paragraphs</option>
                       <option value="sentences">Sentences</option>
                       <option value="words">Words</option>
                       <option value="list">List Items</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                    <select value={type} onChange={(e) => setType(e.target.value as any)} className="input w-full">
                       <option value="standard">Classic Latin</option>
                       <option value="tech">Tech Startup</option>
                       <option value="hipster">Hipster</option>
                       <option value="pirate">Pirate</option>
                    </select>
                 </div>

                 <div className="flex items-end">
                    <button onClick={generate} className="btn btn-primary w-full h-11">Generate</button>
                 </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                 <input type="checkbox" checked={htmlWrap} onChange={(e) => setHtmlWrap(e.target.checked)} id="htmlWrap" className="rounded bg-slate-800 border-slate-600" />
                 <label htmlFor="htmlWrap" className="text-sm text-gray-400 cursor-pointer select-none">Wrap in HTML tags</label>
              </div>
           </div>

           {/* Output */}
           <div className="relative">
             <div className="absolute top-4 right-4">
               <button onClick={() => navigator.clipboard.writeText(output)} className="btn-xs btn-secondary">Copy</button>
             </div>
             <textarea
               readOnly
               value={output}
               className="w-full h-96 bg-slate-950 border border-slate-700 rounded-xl p-6 text-gray-300 resize-none focus:outline-none leading-relaxed"
               placeholder="Click Generate..."
             />
           </div>

        </div>
      </section>
    </>
  );
}
