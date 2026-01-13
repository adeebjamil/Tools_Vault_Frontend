"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Utility functions
const hslToHex = (h: number, s: number, l: number) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const hexToHsl = (hex: string) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

type Color = { hex: string; locked: boolean };

export default function ColorPalettePage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [mode, setMode] = useState<'random' | 'analogous' | 'monochromatic' | 'triadic' | 'complementary'>('random');
  const [baseColor, setBaseColor] = useState('#3b82f6');

  useEffect(() => {
    generatePalette();
  }, []);

  const generatePalette = () => {
    if (mode === 'random') {
      const newColors = Array(5).fill(0).map((_, i) => {
        if (colors[i]?.locked) return colors[i];
        return { hex: hslToHex(Math.random() * 360, 70 + Math.random() * 30, 40 + Math.random() * 20), locked: false };
      });
      setColors(newColors);
    } else {
      // Logic for harmony rules
      const { h, s, l } = hexToHsl(baseColor);
      const newColors: Color[] = [];
      
      for (let i = 0; i < 5; i++) {
        // Simple harmony logic
        let newH = h;
        let newS = s;
        let newL = l;

        if (mode === 'analogous') newH = (h + (i * 30)) % 360;
        if (mode === 'monochromatic') newL = Math.max(10, Math.min(90, l + (i - 2) * 15));
        if (mode === 'triadic') newH = (h + (i * 120)) % 360;
        if (mode === 'complementary') newH = (h + (i * 180)) % 360; // Just alternates
        
        newColors.push({ hex: hslToHex(newH, newS, newL), locked: false });
      }
      setColors(newColors);
    }
  };

  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index].locked = !newColors[index].locked;
    setColors(newColors);
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  const copyCSS = () => {
    const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    alert("CSS variables copied!");
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Color Palette</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="icon-box">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Professional Color Palette</h1>
              <p className="text-gray-400">Generate harmonious color schemes for your projects</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Harmony:</span>
              <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="input py-1 text-sm w-36">
                <option value="random">Random</option>
                <option value="analogous">Analogous</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="triadic">Triadic</option>
                <option value="complementary">Complementary</option>
              </select>
            </div>

            {mode !== 'random' && (
              <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-400">Base:</span>
                 <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-8 h-8 bg-transparent border-none cursor-pointer" />
              </div>
            )}

            <button onClick={generatePalette} className="btn-sm btn-primary ml-auto">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Generate
            </button>
            <button onClick={copyCSS} className="btn-sm btn-secondary">
               Export CSS
            </button>
          </div>

          {/* Palette Display */}
          <div className="h-[500px] flex rounded-2xl overflow-hidden shadow-2xl">
            {colors.map((color, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col justify-end p-6 group relative transition-all duration-300 hover:flex-[1.5]"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => copyColor(color.hex)}
                     className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-white/30"
                   >
                     Copy
                   </button>
                </div>

                <div className="bg-black/20 backdrop-blur-sm p-4 rounded-xl text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                   <h3 className="font-mono text-xl font-bold mb-1 uppercase">{color.hex}</h3>
                   <div className="flex justify-between items-center">
                     <span className="text-xs opacity-70">Color {index + 1}</span>
                     {mode === 'random' && (
                       <button onClick={(e) => { e.stopPropagation(); toggleLock(index); }} className="text-white hover:text-blue-300">
                         {color.locked ? (
                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                         ) : (
                           <svg className="w-4 h-4 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" /></svg>
                         )}
                       </button>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
