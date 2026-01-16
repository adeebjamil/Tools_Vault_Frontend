"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

export default function CircularCropperPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#ffffff");

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result as string));
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    borderWidth = 0,
    borderColor = "#ffffff"
  ): Promise<string | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // Set canvas size to match the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // Create a new canvas for the circular crop
    const circleCanvas = document.createElement("canvas");
    const circleCtx = circleCanvas.getContext("2d");
    if (!circleCtx) return null;

    circleCanvas.width = pixelCrop.width;
    circleCanvas.height = pixelCrop.height;

    // Draw circle mask
    circleCtx.beginPath();
    circleCtx.arc(
      pixelCrop.width / 2,
      pixelCrop.height / 2,
      pixelCrop.width / 2,
      0,
      2 * Math.PI
    );
    circleCtx.closePath();
    circleCtx.clip();

    // Draw original image onto circular canvas
    circleCtx.drawImage(canvas, 0, 0);

    // Draw border if needed
    if (borderWidth > 0) {
        circleCtx.beginPath();
        circleCtx.arc(
          pixelCrop.width / 2,
          pixelCrop.height / 2,
          (pixelCrop.width / 2) - (borderWidth / 2),
          0,
          2 * Math.PI
        );
        circleCtx.strokeStyle = borderColor;
        circleCtx.lineWidth = borderWidth;
        circleCtx.stroke();
    }

    return circleCanvas.toDataURL("image/png");
  };

  const handleDownload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, borderWidth, borderColor);
      if (croppedImage) {
        const link = document.createElement("a");
        link.download = "circular-crop.png";
        link.href = croppedImage;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">Tools</Link>
            <span className="text-gray-600">/</span>
            <span className="text-blue-400">Circular Cropper</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="icon-box">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Circular Image Cropper</h1>
              <p className="text-gray-400">Easily crop images into perfect circles for profiles and avatars</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 min-h-[600px] flex flex-col lg:flex-row gap-8">
          
          {/* Main Workspace */}
          <div className="flex-1 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800 min-h-[400px]">
            {imageSrc ? (
              <div className="absolute inset-0">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  classes={{
                      containerClassName: "bg-slate-950",
                      mediaClassName: "",
                      cropAreaClassName: "!border-2 !border-blue-500 !shadow-[0_0_0_9999px_rgba(15,23,42,0.8)]"
                  }}
                />
              </div>
            ) : (
               <div className="text-center p-8">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 text-blue-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Upload Image to Crop</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">Select an image from your device to start cropping it into a circle.</p>
                  <label className="cursor-pointer btn btn-primary inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    Select Image
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
               </div>
            )}
          </div>

          {/* Controls Sidebar */}
          {imageSrc && (
            <div className="w-full lg:w-80 space-y-6">
                
                {/* File Info */}
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Controls</h3>
                        <label className="text-xs text-blue-400 cursor-pointer hover:underline">
                            Change Image
                            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                    </div>

                    {/* Zoom Control */}
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Zoom</span>
                            <span className="text-gray-300">{zoom.toFixed(1)}x</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    {/* Border Controls */}
                    <div className="space-y-4 pt-4 border-t border-slate-700/50">
                        <h4 className="text-sm font-medium text-gray-300">Border Styling</h4>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Width</span>
                                <span className="text-gray-300">{borderWidth}px</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={50}
                                value={borderWidth}
                                onChange={(e) => setBorderWidth(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                         <div className="space-y-2">
                            <span className="text-sm text-gray-400">Color</span>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    className="h-9 w-14 rounded bg-transparent border border-slate-600 cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 text-sm text-gray-300 font-mono uppercase focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleDownload}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download PNG
                    </button>
                    <p className="text-xs text-center text-gray-500">
                        Image processed locally. No data uploaded.
                    </p>
                </div>

            </div>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
