"use client";

import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-xl shadow-red-500/5">
          <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Access Denied</h1>
        <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
          You do not have the necessary permissions to view this page. This area is restricted to administrators only.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
          >
            Return Home
          </Link>
          <Link 
            href="/admin/login"
            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
