"use client";

import { useState, useCallback } from "react";

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  locked: boolean;
}

function hslToColor(h: number, s: number, l: number): Color {
  const sNorm = s / 100;
  const lNorm = l / 100;
  
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNorm - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  
  const rFinal = Math.round((r + m) * 255);
  const gFinal = Math.round((g + m) * 255);
  const bFinal = Math.round((b + m) * 255);
  
  return {
    hex: `#${rFinal.toString(16).padStart(2, '0')}${gFinal.toString(16).padStart(2, '0')}${bFinal.toString(16).padStart(2, '0')}`.toUpperCase(),
    rgb: { r: rFinal, g: gFinal, b: bFinal },
    hsl: { h, s, l },
    locked: false,
  };
}

function generateHarmoniousPalette(): Color[] {
  const baseHue = Math.floor(Math.random() * 360);
  const schemes = [
    // Analogous
    [0, 30, 60, 90, 120],
    // Complementary
    [0, 180, 30, 210, 60],
    // Triadic
    [0, 120, 240, 30, 150],
    // Split-Complementary
    [0, 150, 210, 30, 180],
  ];
  
  const scheme = schemes[Math.floor(Math.random() * schemes.length)];
  
  return scheme.map((offset, index) => {
    const h = (baseHue + offset) % 360;
    const s = 60 + Math.random() * 25;
    const l = 35 + index * 10;
    return hslToColor(h, s, l);
  });
}

export default function ColorPaletteTool() {
  const [colors, setColors] = useState<Color[]>(() => generateHarmoniousPalette());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNewPalette = useCallback(() => {
    setColors(prev => {
      const newColors = generateHarmoniousPalette();
      return prev.map((color, i) => color.locked ? color : newColors[i]);
    });
  }, []);

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((color, i) => 
      i === index ? { ...color, locked: !color.locked } : color
    ));
  };

  const copyColor = async (hex: string, index: number) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const exportPalette = () => {
    const css = colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join('\n');
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={generateNewPalette} className="btn btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate (Spacebar)
          </button>
          <button onClick={exportPalette} className="btn btn-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Export CSS
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Press <kbd className="px-2 py-0.5 bg-gray-200 rounded text-xs font-mono">Space</kbd> to generate new colors
        </p>
      </div>

      {/* Color Palette Display */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '400px' }}>
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-end p-6 transition-all group cursor-pointer"
            style={{ backgroundColor: color.hex, minHeight: '300px' }}
            onClick={() => copyColor(color.hex, index)}
          >
            {/* Lock Button */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleLock(index); }}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${color.locked 
                  ? 'bg-white/90 text-gray-900' 
                  : 'bg-black/20 text-white opacity-0 group-hover:opacity-100'
                }`}
            >
              {color.locked ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              )}
            </button>

            {/* Color Info */}
            <div className={`text-center p-3 rounded-lg transition-all ${
              color.hsl.l > 50 ? 'text-gray-900' : 'text-white'
            }`}>
              <div className="font-mono text-lg font-bold mb-1">
                {copiedIndex === index ? 'Copied!' : color.hex}
              </div>
              <div className="text-xs opacity-75 font-mono">
                rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="text-2xl mb-2">🖱️</div>
          <p className="text-sm text-gray-600">Click a color to copy HEX</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-sm text-gray-600">Lock colors to keep them</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="text-2xl mb-2">⌨️</div>
          <p className="text-sm text-gray-600">Press Space to regenerate</p>
        </div>
      </div>

      {/* Color Details Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HEX</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RGB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HSL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {colors.map((color, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg shadow-sm" style={{ backgroundColor: color.hex }} />
                </td>
                <td className="px-6 py-4 font-mono text-sm">{color.hex}</td>
                <td className="px-6 py-4 font-mono text-sm text-gray-500">
                  rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-500">
                  hsl({color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
