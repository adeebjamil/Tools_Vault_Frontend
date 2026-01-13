"use client";

import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function QRCodePage() {
  const [text, setText] = useState("https://tools-vault.app");
  const [size, setSize] = useState(300);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [format, setFormat] = useState("png");
  const [margin, setMargin] = useState(1);
  const [ecc, setEcc] = useState("L"); // L, M, Q, H

  const cleanHex = (hex: string) => hex.replace('#', '');
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=${cleanHex(bgColor)}&color=${cleanHex(color)}&qzone=${margin}&ecc=${ecc}&format=${format}`;

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      alert("Download failed. Try right-clicking the image.");
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>QR Code Generator - Create Custom QR Codes Free | ToolsVault</title>
        <meta name="description" content="Generate custom QR codes with colors, logos, and various formats. Free online QR code maker for URLs, text, WiFi, and more. Download as PNG, SVG, or EPS." />
        <meta name="keywords" content="QR code generator, QR code maker, free QR code, custom QR code, QR code with logo, colored QR code" />
        <link rel="canonical" href="https://tools-vault.app/tools/qr-code-generator" />
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
            <span className="text-blue-400">QR Code Generator</span>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-2h4v-4H6v4H2v-4h4v-2H2v-6h12v12h4v-4m-2 0h4M4 8l-.01 9M4 8l9 .01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm4 8h2a1 1 0 001-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  QR Code Generator
                </h1>
                <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  Utility
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Create customizable QR codes with colors, margins, and multiple formats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="pb-8 sm:pb-12 md:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Stack vertically, Desktop: Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-2 lg:order-1">
              
              {/* Content Input */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-24 sm:h-32 bg-slate-900 border border-slate-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white resize-none focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter URL, text, or contact info"
                />
              </div>

              {/* Appearance Settings */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-white font-medium text-sm sm:text-base border-b border-slate-700 pb-2">Appearance</h3>
                
                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Foreground</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input 
                        type="color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer bg-transparent border-none" 
                      />
                      <span className="text-xs sm:text-sm font-mono text-gray-300">{color}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Background</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                       <input 
                         type="color" 
                         value={bgColor} 
                         onChange={(e) => setBgColor(e.target.value)} 
                         className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg cursor-pointer bg-transparent border-none" 
                       />
                       <span className="text-xs sm:text-sm font-mono text-gray-300">{bgColor}</span>
                    </div>
                  </div>
                </div>

                {/* Size Slider */}
                <div>
                   <label className="block text-xs text-gray-500 mb-2">Size: {size}px</label>
                   <input 
                     type="range" 
                     min="100" 
                     max="1000" 
                     step="50" 
                     value={size} 
                     onChange={(e) => setSize(Number(e.target.value))} 
                     className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" 
                   />
                   <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mt-1">
                     <span>100px</span>
                     <span>1000px</span>
                   </div>
                </div>

                {/* Margin Slider */}
                <div>
                   <label className="block text-xs text-gray-500 mb-2">Margin: {margin}</label>
                   <input 
                     type="range" 
                     min="0" 
                     max="50" 
                     value={margin} 
                     onChange={(e) => setMargin(Number(e.target.value))} 
                     className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" 
                   />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
                <h3 className="text-white font-medium text-sm sm:text-base border-b border-slate-700 pb-2">Settings</h3>
                
                {/* Error Correction */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Error Correction</label>
                  <select 
                    value={ecc} 
                    onChange={(e) => setEcc(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 sm:p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Format</label>
                  <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                    {['png', 'svg', 'eps'].map(f => (
                       <button
                         key={f}
                         onClick={() => setFormat(f)}
                         className={`flex-1 py-2 text-xs sm:text-sm uppercase rounded-md transition-colors ${format === f ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                       >
                         {f}
                       </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-3 flex flex-col order-1 lg:order-2">
              {/* QR Code Preview */}
              <div className="flex-1 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl flex items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden min-h-[280px] sm:min-h-[350px]">
                <div className="absolute inset-0 bg-grid opacity-20" />
                
                <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl relative z-10 transition-all duration-300">
                  <img 
                    src={qrUrl} 
                    alt="Generated QR Code" 
                    className="max-w-full h-auto" 
                    style={{ width: Math.min(size, 280) + 'px', maxWidth: '100%' }} 
                  />
                </div>
              </div>
              
              {/* Download Button */}
              <button 
                onClick={downloadQR}
                className="mt-4 sm:mt-6 w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm sm:text-lg font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Custom Colors</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Match your brand with custom foreground and background colors for your QR codes.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Multiple Formats</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Download your QR code in PNG, SVG, or EPS format for any use case.
              </p>
            </div>
            
            <div className="p-4 sm:p-6 bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Error Correction</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Choose from 4 levels of error correction to ensure scanability even if damaged.
              </p>
            </div>
          </div>

          {/* SEO Text Content */}
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">What is a QR Code?</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              QR (Quick Response) codes are two-dimensional barcodes that can store various types of information including URLs, 
              text, contact details, WiFi credentials, and more. They can be scanned by smartphone cameras or QR code reader apps, 
              making them perfect for marketing materials, business cards, and product packaging.
            </p>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">How to Use This QR Code Generator</h2>
            <ol className="text-gray-400 space-y-2 text-sm sm:text-base list-decimal list-inside">
              <li>Enter your URL, text, or other content in the input field</li>
              <li>Customize colors to match your brand</li>
              <li>Adjust size and margin as needed</li>
              <li>Select error correction level (higher = more resilient)</li>
              <li>Choose your preferred download format</li>
              <li>Click &quot;Download QR Code&quot; to save</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
