"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "ToolsVault",
    tagline: "Your Digital Toolkit, Always Free",
    email: "hello@tools-vault.app",
    adsenseId: "",
    analyticsId: "",
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-neutral-400">Manage your site configuration</p>
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
              <span className="text-neutral-500 font-normal ml-2">(e.g., ca-pub-xxxxx)</span>
            </label>
            <input
              type="text"
              value={settings.adsenseId}
              onChange={(e) => setSettings({ ...settings, adsenseId: e.target.value })}
              className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="ca-pub-xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Google Analytics ID
              <span className="text-neutral-500 font-normal ml-2">(e.g., G-XXXXXXXX)</span>
            </label>
            <input
              type="text"
              value={settings.analyticsId}
              onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
              className="w-full border border-neutral-700 bg-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="G-XXXXXXXXXX"
            />
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
