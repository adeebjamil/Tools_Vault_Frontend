"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tools-vault-backend.onrender.com";
      console.log("Attempting login to:", `${API_URL}/api/auth/login`);
      
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server connection failed. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black opacity-80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-5 animate-float pointer-events-none">
        <div className="w-full h-full rounded-2xl bg-yellow-500 rotate-12 blur-3xl" />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-5 animate-float stagger-2 pointer-events-none">
        <div className="w-full h-full rounded-xl bg-yellow-500 -rotate-12 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/logo1.png" 
              alt="ToolsVault Logo" 
              width={240} 
              height={80}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-neutral-500 mt-2">Sign in to access the dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-neutral-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="admin@gmail.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-neutral-400 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl border border-neutral-800 text-center">
             <p className="text-xs text-neutral-500">
               Use valid admin credentials to continue.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
