"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Get current user from localStorage as the only user
      const userData = localStorage.getItem("user");
      if (userData) {
        const currentUser = JSON.parse(userData);
        setUsers([{
          id: currentUser.id || "1",
          name: currentUser.name || "Admin",
          email: currentUser.email || "admin@gmail.com",
          role: currentUser.role || "admin",
          createdAt: new Date().toISOString().split("T")[0],
        }]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-neutral-400">Manage user accounts ({users.length} total)</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-yellow-500 font-bold mb-1">Single admin mode</p>
            <p className="text-sm text-yellow-500/80">Currently only one admin account is supported. User registration is disabled.</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-800/50 border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">User</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Created</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-neutral-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/30">
                      <span className="font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    user.role === "admin" 
                      ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                      : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-400">{user.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
