"use client";

import { useState, useRef, useMemo } from "react";

export default function QRCodeTool() {
  const [content, setContent] = useState("https://tools-vault.app");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrLoadedFor, setQrLoadedFor] = useState("");

  // Generate QR code using a simple QR library approach
  // Using Google Charts API as a fallback for simplicity
  const qrCodeUrl = useMemo(() => 
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}&color=${fgColor.slice(1)}&bgcolor=${bgColor.slice(1)}`,
    [content, fgColor, bgColor, size]
  );
  
  const qrLoaded = qrLoadedFor === qrCodeUrl;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(content);
  };

  const presets = [
    { label: "URL", placeholder: "https://example.com" },
    { label: "Text", placeholder: "Your message here..." },
    { label: "Email", placeholder: "mailto:hello@example.com" },
    { label: "Phone", placeholder: "tel:+1234567890" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter URL, text, or other content..."
            className="input h-32 resize-none"
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.length} / 2000 characters
          </p>
        </div>

        {/* Quick Presets */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setContent(preset.placeholder)}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="input flex-1"
                maxLength={7}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="input flex-1"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        {/* Size Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size: {size}x{size} px
          </label>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleDownload} className="btn btn-primary flex-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PNG
          </button>
          <button onClick={handleCopyUrl} className="btn btn-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Content
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="relative">
            {!qrLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              width={size}
              height={size}
              className="rounded-lg"
              onLoad={() => setQrLoadedFor(qrCodeUrl)}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          Scan with your phone camera to test
        </p>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 w-full max-w-sm">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Pro Tip</p>
              <p>Keep high contrast between foreground and background colors for best scanning results.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
