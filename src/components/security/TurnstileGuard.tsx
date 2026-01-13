"use client";

import { useState, useEffect } from "react";
import Turnstile from "react-turnstile";

export default function TurnstileGuard({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const verified = sessionStorage.getItem("isHuman");
    if (verified === "true") {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem("isHuman", "true");
    setIsVerified(true);
  };

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Security Check</h2>
          <p className="text-gray-400 text-sm">
            Please complete the security check to access our free tools. This helps us prevent abuse and keep the service free for everyone.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || "1x00000000000000000000AA"}
            onVerify={handleVerify}
            theme="dark"
          />
        </div>

        <p className="text-xs text-slate-600">
          Protected by Cloudflare Turnstile
        </p>
      </div>
    </div>
  );
}
