"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccessDenied from "@/components/admin/AccessDenied";

export default function AdminPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        // Not logged in -> Redirect to login
        router.push("/admin/login");
        return;
      }

      try {
        const user = JSON.parse(userData);
        if (user.role === "admin") {
          // Is admin -> Redirect to dashboard
          router.push("/admin/dashboard");
        } else {
          // Logged in but not admin -> Show Access Denied
          setStatus("unauthorized");
        }
      } catch (e) {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (status === "unauthorized") {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
    </div>
  );
}
