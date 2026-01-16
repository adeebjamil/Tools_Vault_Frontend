"use client";

import { useState } from "react";
import Link from "next/link";

const MAPS = {
  smallCaps: {
    name: "Small Caps",
    map: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ"
  },
  superscript: {
    name: "Superscript (Tiny)",
    map: "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ"
  },
  bubble: {
    name: "Bubble Text",
    map: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"
  },
  inverted: {
    name: "Inverted",
    map: "ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz"
  }
};

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function SmallTextPage() {
  const [input, setInput] = useState("ToolsVault");

  const transform = (text: string, type: keyof typeof MAPS) => {
    return text.split('').map(char => {
      const lower = char.toLowerCase();
      const index = ALPHABET.indexOf(lower);
      if (index === -1) return char;
      return MAPS[type].map[index] || char; // Fallback if map incomplete
    }).join('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Small Text Generator</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Small Text Generator</h1>
              <p className="text-gray-400">Convert text into cool unicode styles for social media</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Enter text to convert</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xl text-white focus:border-blue-500 focus:outline-none placeholder-gray-600"
                    placeholder="Type something..."
                />
            </div>

            <div className="space-y-4">
                {Object.keys(MAPS).map((key) => {
                    const result = transform(input, key as keyof typeof MAPS);
                    return (
                        <div key={key} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between group hover:bg-slate-800 transition-colors">
                            <div>
                                <h3 className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{MAPS[key as keyof typeof MAPS].name}</h3>
                                <p className="text-lg text-white font-medium">{result}</p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(result)}
                                className="px-4 py-2 bg-slate-700 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transform duration-200"
                            >
                                Copy
                            </button>
                        </div>
                    );
                })}
            </div>

        </div>
      </section>
    </>
  );
}
