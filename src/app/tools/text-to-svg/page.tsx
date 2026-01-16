"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const FONTS = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Slabo 27px",
  "Raleway",
  "PT Sans",
  "Merriweather",
  "Nunito",
  "Playfair Display",
  "Rubik",
  "Poppins",
  "Inter",
  "Dancing Script",
  "Pacifico",
  "Lobster",
  "Orbitron",
  "Press Start 2P"
];

export default function TextToSvgPage() {
  const [text, setText] = useState("ToolsVault");
  const [font, setFont] = useState("Inter");
  const [fontSize, setFontSize] = useState(60);
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(300);
  const [letterSpacing, setLetterSpacing] = useState(0);
  
  const svgRef = useRef<SVGSVGElement>(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${FONTS.map(f => f.replace(/ /g, "+")).join("&family=")}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const downloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `text-${text.substring(0, 10)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Text to SVG</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Text to SVG Generator</h1>
              <p className="text-gray-400">Convert text into scalable vector graphics instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Controls */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 space-y-6">
                  {/* Text Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Text Content</label>
                    <textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                        rows={3}
                    />
                  </div>

                  {/* Font Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Font Family</label>
                    <select 
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                    >
                        {FONTS.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                  </div>

                   {/* Dimensions */}
                   <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Font Size</label>
                            <input 
                                type="number" 
                                value={fontSize} 
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-medium text-gray-400">Tracking</label>
                            <input 
                                type="number" 
                                value={letterSpacing} 
                                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                            />
                        </div>
                   </div>

                   {/* Colors */}
                   <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Fill Color</label>
                            <div className="flex gap-2">
                                <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="h-8 w-12 rounded bg-transparent border border-slice-600" />
                                <input type="text" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 text-xs text-white mobile-input" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-xs font-medium text-gray-400">Stroke</label>
                                <span className="text-xs text-gray-500">{strokeWidth}px</span>
                            </div>
                            <input type="range" min="0" max="10" step="0.5" value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                            
                            {strokeWidth > 0 && (
                                <div className="flex gap-2 mt-2">
                                     <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="h-6 w-10 rounded bg-transparent border border-slice-600" />
                                     <input type="text" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 text-xs text-white" />
                                </div>
                            )}
                        </div>
                   </div>

                   <button
                    onClick={downloadSvg}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                   >
                       Download SVG
                   </button>
               </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 flex items-center justify-center min-h-[500px] overflow-hidden relative checkerboard-bg">
                    <svg
                        ref={svgRef}
                        width={width}
                        height={height}
                        viewBox={`0 0 ${width} ${height}`}
                        xmlns="http://www.w3.org/2000/svg"
                        className="max-w-full h-auto shadow-2xl"
                    >
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontFamily={font}
                            fontSize={fontSize}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            letterSpacing={letterSpacing}
                            style={{ fontFamily: `'${font}', sans-serif` }}
                        >
                            {text}
                        </text>
                    </svg>
                    
                    <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-gray-400 border border-slate-700">
                        Preview Size: {width}x{height}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                     <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                        <label className="text-xs text-gray-500 block mb-2">Canvas Width</label>
                        <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
                     </div>
                     <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                        <label className="text-xs text-gray-500 block mb-2">Canvas Height</label>
                        <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white" />
                     </div>
                </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
