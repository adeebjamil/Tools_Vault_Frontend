"use client";

import { useState, useEffect, useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User>({ id: "", name: "", email: "", avatar: "" });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const [settings, setSettings] = useState({
    siteName: "ToolsVault",
    tagline: "Your Digital Toolkit, Always Free",
    email: "hello@tools-vault.app",
    adsenseId: "ca-pub-xxxxxxxxxx",
    analyticsId: "G-XXXXXXXXXX",
  });

  useEffect(() => {
    // Load user from local storage or API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large (max 5MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    
    // Add token for admin verification
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        headers: { "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_SECRET || "", "Authorization": `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        // Update user avatar in state temporarily until manually saved, OR save immediately?
        // User request: "add profile page with profile image upload function"
        // Let's update state immediately so they see the preview, and it will be saved when they click "Save Settings" or separate button.
        // Actually, let's treat Profile Save separate or unified?
        // Let's unified save or immediate update. Immediate file upload + save is better for UX usually.
        // Let's update the avatar URL in our local user state
        setUser(prev => ({ ...prev, avatar: data.data.url }));
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    }
    setIsUploading(false);
  };

  const handleSave = async () => {
    // 1. Save Settings (Local/Mock)
    // 2. Save Profile (Backend)
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/auth/updatedetails`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        // Update local storage
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        // Force Sidebar Update
        window.dispatchEvent(new Event("userUpdated"));
        
        alert("Settings and Profile saved successfully!");
      } else {
        alert("Failed to update profile: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-neutral-400">Manage your site configuration</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Profile</h3>
          <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded border border-yellow-500/20">Admin</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
             <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-800 border-2 border-dashed border-neutral-700 group hover:border-yellow-500 transition-colors">
               {user.avatar ? (
                 <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-neutral-500">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                 </div>
               )}
               
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
             </div>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
             <button onClick={() => fileInputRef.current?.click()} className="text-xs text-yellow-500 hover:text-yellow-400 font-bold">
               {isUploading ? "Uploading..." : "Change Photo"}
             </button>
          </div>

          {/* User Details */}
          <div className="flex-1 w-full space-y-4">
             <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
               <input
                 type="text"
                 value={user.name}
                 onChange={(e) => setUser({ ...user, name: e.target.value })}
                 className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
               <input
                 type="email"
                 value={user.email}
                 disabled
                 className="w-full border border-neutral-700 bg-neutral-900 rounded-xl px-4 py-2.5 text-neutral-500 cursor-not-allowed focus:outline-none"
                 title="Email cannot be changed"
               />
             </div>
          </div>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h3 className="text-lg font-bold text-white mb-6">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Contact Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h3 className="text-lg font-bold text-white mb-6">Integrations</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Google AdSense ID
              <span className="text-xs text-green-500 font-bold ml-2 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Active</span>
            </label>
            <input
              type="text"
              value={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""}
              disabled
              className="w-full border border-neutral-700 bg-neutral-950 rounded-xl px-4 py-2.5 text-gray-400 font-mono text-sm cursor-not-allowed focus:outline-none"
            />
             <p className="text-xs text-neutral-600 mt-1">Configured via environment variables.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Google Analytics ID
               <span className="text-xs text-green-500 font-bold ml-2 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Active</span>
            </label>
            <input
              type="text"
              value="G-RB21BDLF23"
              disabled
              className="w-full border border-neutral-700 bg-neutral-950 rounded-xl px-4 py-2.5 text-gray-400 font-mono text-sm cursor-not-allowed focus:outline-none"
            />
            <p className="text-xs text-neutral-600 mt-1">Configured via layout.tsx.</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-neutral-900 rounded-xl border border-red-900/50 p-6">
        <h3 className="text-lg font-bold text-red-500 mb-4">Danger Zone</h3>
        <p className="text-sm text-neutral-500 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <button className="px-4 py-2 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 text-sm font-bold transition-colors">
          Reset All Data
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave} 
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
