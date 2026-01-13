"use client";

import { useState, useCallback, useRef } from "react";
import type { Metadata } from "next";

interface CompressedImage {
  original: File;
  compressed: Blob;
  originalSize: number;
  compressedSize: number;
  preview: string;
  savings: number;
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">("webp");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(async (file: File): Promise<CompressedImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize if larger than maxWidth
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Could not compress image"));
                return;
              }

              const savings = ((file.size - blob.size) / file.size) * 100;

              resolve({
                original: file,
                compressed: blob,
                originalSize: file.size,
                compressedSize: blob.size,
                preview: canvas.toDataURL(`image/${outputFormat}`, quality / 100),
                savings: Math.max(0, savings),
              });
            },
            `image/${outputFormat}`,
            quality / 100
          );
        };
        img.onerror = () => reject(new Error("Could not load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
  }, [quality, maxWidth, outputFormat]);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newImages: CompressedImage[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const compressed = await compressImage(file);
        newImages.push(compressed);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }

    setImages((prev) => [...prev, ...newImages]);
    setIsProcessing(false);
  }, [compressImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const downloadImage = (image: CompressedImage) => {
    const url = URL.createObjectURL(image.compressed);
    const a = document.createElement("a");
    a.href = url;
    const originalName = image.original.name.replace(/\.[^/.]+$/, "");
    a.download = `${originalName}_compressed.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    images.forEach((image) => downloadImage(image));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const totalSavings = images.reduce((acc, img) => acc + (img.originalSize - img.compressedSize), 0);

  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6" aria-label="Breadcrumb">
          <a href="/tools" className="text-gray-500 hover:text-white transition-colors">
            Tools
          </a>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-pink-400">Image Compressor</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 mb-4 sm:mb-6">
            <span className="text-lg sm:text-2xl">📷</span>
            <span className="text-xs sm:text-sm font-medium text-pink-300">Image Tool</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-4 tracking-tight">
            Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Compressor</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Compress JPEG, PNG, and WebP images without losing quality. All processing happens locally in your browser.
          </p>
        </div>

        {/* Settings */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Compression Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
                <span>Smaller</span>
                <span>Better Quality</span>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                Max Width: {maxWidth}px
              </label>
              <input
                type="range"
                min="480"
                max="3840"
                step="120"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-1">
                <span>480px</span>
                <span>4K</span>
              </div>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                Output Format
              </label>
              <div className="flex gap-2">
                {(["webp", "jpeg", "png"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setOutputFormat(format)}
                    className={`flex-1 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      outputFormat === format
                        ? "bg-pink-500 text-white"
                        : "bg-slate-700 text-gray-400 hover:bg-slate-600"
                    }`}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            isProcessing
              ? "border-pink-500/50 bg-pink-500/5"
              : "border-slate-700 hover:border-pink-500/50 hover:bg-slate-900/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-400">Compressing images...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">Drop images here</p>
              <p className="text-xs sm:text-sm text-gray-500">or click to browse • Supports JPEG, PNG, WebP, GIF</p>
            </>
          )}
        </div>

        {/* Results */}
        {images.length > 0 && (
          <div className="mt-8">
            {/* Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {images.length} image{images.length > 1 ? "s" : ""} compressed
                  </p>
                  <p className="text-green-400 text-sm">
                    Total saved: {formatBytes(totalSavings)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={downloadAll}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download All
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden group"
                >
                  <div className="aspect-video relative bg-slate-800">
                    <img
                      src={image.preview}
                      alt={image.original.name}
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-medium text-sm truncate mb-2">
                      {image.original.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>{formatBytes(image.originalSize)}</span>
                      <span>→</span>
                      <span className="text-green-400">{formatBytes(image.compressedSize)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                        -{image.savings.toFixed(1)}%
                      </span>
                      <button
                        onClick={() => downloadImage(image)}
                        className="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">100% Private</h3>
            <p className="text-gray-400 text-sm">
              All compression happens in your browser. Your images never leave your device.
            </p>
          </div>
          
          <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Results</h3>
            <p className="text-gray-400 text-sm">
              No upload wait times. Compress multiple images simultaneously with client-side processing.
            </p>
          </div>
          
          <div className="p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Compression</h3>
            <p className="text-gray-400 text-sm">
              Adjustable quality settings and modern WebP format support for optimal file sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
