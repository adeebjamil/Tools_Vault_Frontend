"use client";

import { useState } from "react";

// Static tools list (in a real app, this would come from API)
const initialTools = [
  { id: 1, name: "JSON Formatter", slug: "json-formatter", status: "Active", category: "Developer" },
  { id: 2, name: "Word Counter", slug: "word-counter", status: "Active", category: "Text" },
  { id: 3, name: "QR Code Generator", slug: "qr-code-generator", status: "Active", category: "Utility" },
  { id: 4, name: "Color Palette", slug: "color-palette", status: "Active", category: "Design" },
  { id: 5, name: "Base64 Encoder", slug: "base64", status: "Active", category: "Developer" },
  { id: 6, name: "Lorem Ipsum", slug: "lorem-ipsum", status: "Active", category: "Text" },
  { id: 7, name: "Markdown Preview", slug: "markdown-preview", status: "Active", category: "Developer" },
  { id: 8, name: "JWT Token Generator", slug: "jwt-generator", status: "Active", category: "Developer" },
];

export default function ToolsPage() {
  const [tools] = useState(initialTools);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tools Management</h1>
          <p className="text-neutral-400">Manage your online tools ({tools.length} total)</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-yellow-500 placeholder-neutral-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-yellow-500 font-bold mb-1">Tools are pre-configured</p>
            <p className="text-sm text-yellow-500/80">All tools are statically built into the frontend. Future versions will support dynamic tool management via API.</p>
          </div>
        </div>
      </div>

      {/* Tools Table */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800/50 border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Tool Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-neutral-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredTools.map((tool) => (
              <tr key={tool.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{tool.name}</td>
                <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{tool.slug}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {tool.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tool.status === "Active"
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                    }`}
                  >
                    {tool.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a 
                    href={`/tools/${tool.slug}`}
                    target="_blank"
                    className="text-yellow-500 hover:text-yellow-400 text-sm font-medium flex items-center justify-end gap-1"
                  >
                    View 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No tools match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
