"use client";

import { useEffect, useState } from "react";
import { Copy, Trash2, Mail, User, MessageSquare, Calendar } from "lucide-react";

interface Connection {
  _id: string;
  type: "contact" | "newsletter";
  email: string;
  name?: string;
  message?: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "contact" | "newsletter">("all");

  const fetchConnections = async () => {
    try {
      const res = await fetch(`${API_URL}/api/connections`, {
        headers: { "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_SECRET || "" },
      });
      const data = await res.json();
      if (data.success) {
        setConnections(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch connections", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this connection?")) return;
    try {
      const res = await fetch(`${API_URL}/api/connections/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_SECRET || "" },
      });
      if (res.ok) {
        setConnections(connections.filter((c) => c._id !== id));
      }
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const filteredConnections = connections.filter(
    (c) => filter === "all" || c.type === filter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Connections</h1>
          <p className="text-neutral-400">View user submissions and subscriptions</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2">
           {(["all", "contact", "newsletter"] as const).map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f)}
               className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${
                 filter === f 
                   ? "bg-yellow-500 text-black" 
                   : "bg-neutral-800 text-neutral-400 hover:text-white"
               }`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredConnections.length === 0 ? (
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-12 text-center">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-600">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No connections yet</h3>
          <p className="text-neutral-400">Wait for users to contact you or subscribe.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredConnections.map((item) => (
            <div 
              key={item._id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-yellow-500/30 transition-colors group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon & Type */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    item.type === 'newsletter' 
                      ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' 
                      : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {item.type === 'newsletter' ? <Mail /> : <MessageSquare />}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      item.type === 'newsletter' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-neutral-500 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{item.name || "Anonymous User"}</h3>
                    {item.email && (
                      <span className="text-neutral-500 text-sm">({item.email})</span>
                    )}
                  </div>

                  {item.message && (
                    <div className="bg-neutral-800/50 rounded-lg p-4 mb-3 border border-neutral-800">
                      <p className="text-neutral-300 text-sm whitespace-pre-wrap">{item.message}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    <button 
                      onClick={() => copyToClipboard(item.email)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                    >
                      <Copy className="w-3 h-3" /> Copy Email
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
