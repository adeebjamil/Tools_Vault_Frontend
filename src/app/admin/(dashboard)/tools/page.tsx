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
          <h1 className="text-2xl font-bold text-gray-900">Tools Management</h1>
          <p className="text-gray-500">Manage your online tools ({tools.length} total)</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Tools are pre-configured</p>
            <p className="text-sm text-blue-600">All tools are statically built into the frontend. Future versions will support dynamic tool management via API.</p>
          </div>
        </div>
      </div>

      {/* Tools Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tool Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Slug</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTools.map((tool) => (
              <tr key={tool.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{tool.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{tool.slug}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {tool.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      tool.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {tool.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a 
                    href={`/tools/${tool.slug}`}
                    target="_blank"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tools match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
