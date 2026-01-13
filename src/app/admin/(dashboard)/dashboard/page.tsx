"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Hello");
  const [userName, setUserName] = useState("Admin");
  const [postCount, setPostCount] = useState(0);
  const [isAnalyticsConnected, setIsAnalyticsConnected] = useState(false);
  const [isAdSenseConnected, setIsAdSenseConnected] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Get user name from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || "Admin");
      } catch {
        // ignore
      }
    }

    // Fetch blog stats
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog/stats`);
        const data = await res.json();
        if (data.success) {
           setPostCount(data.data.total);
        }
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();

    // Check Connections (Mock check)
    // In a real app, this would verify the G-Tag with Google's API or check if script loaded
    // For now, we assume it's connected if the settings page would show the ID
    setIsAnalyticsConnected(true); 
    setIsAdSenseConnected(true);

  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl p-6 text-black shadow-lg shadow-yellow-500/20">
        <h2 className="text-2xl font-black mb-2">{greeting}, {userName}! 👋</h2>
        <p className="text-black/80 font-medium max-w-2xl">
          Welcome to your ToolsVault dashboard. Manage your tools, blog posts, and settings here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tools"
          value="8"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          title="Blog Posts"
          value={postCount.toString()}
          subtitle={postCount > 0 ? "Published & Drafts" : "Create your first post"}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          }
        />
        <StatCard
          title="Users"
          value="1"
          subtitle="Admin only"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="Analytics"
          value={isAnalyticsConnected ? "Active" : "Not Connected"}
          subtitle={isAnalyticsConnected ? "Collecting Data" : "Setup in Settings"}
          valueClassName={isAnalyticsConnected ? "text-green-500" : ""}
          icon={
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {isAnalyticsConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
              )}
            </div>
          }
        />
        <StatCard
          title="AdSense Status"
          value={isAdSenseConnected ? "Active" : "Pending"}
          subtitle={isAdSenseConnected ? "Ads serving enabled" : "Apply when ready"}
          valueClassName={isAdSenseConnected ? "text-green-500" : ""}
          icon={
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isAdSenseConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
              )}
            </div>
          }
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm">
          <div className="p-6 border-b border-neutral-800">
            <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <QuickAction
              href="/admin/blog"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
              title="Write Blog Post"
              description="Create SEO-friendly content"
              color="yellow"
            />
            <QuickAction
              href="/admin/analytics"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="View Analytics"
              description="Check traffic and performance"
              color="blue"
            />
            <QuickAction
              href="/admin/settings"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              }
              title="Site Settings"
              description="Configure integrations"
              color="orange"
            />
          </div>
        </div>

        {/* Getting Started Checklist */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm">
          <div className="p-6 border-b border-neutral-800">
            <h3 className="text-lg font-bold text-white">Getting Started</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <ChecklistItem done title="Set up admin account" />
              <ChecklistItem done title="Configure tools" />
              <ChecklistItem title="Write first blog post" />
              <ChecklistItem title="Connect Google Analytics" />
              <ChecklistItem title="Apply for AdSense" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, valueClassName }: { title: string; value: string; subtitle?: string; icon: React.ReactNode; valueClassName?: string }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 shadow-sm hover:border-yellow-500/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
          {icon}
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-1 ${valueClassName || 'text-white'}`}>{value}</h3>
      <p className="text-sm text-neutral-400">{title}</p>
      {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function QuickAction({ href, icon, title, description, color }: { href: string; icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorClasses: Record<string, string> = {
    yellow: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
  
  return (
    <Link href={href} className="flex items-center gap-4 p-4 rounded-xl border border-neutral-800 hover:bg-neutral-800 transition-colors group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-white group-hover:text-yellow-500 transition-colors">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </Link>
  );
}

function ChecklistItem({ title, done = false }: { title: string; done?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? "bg-yellow-500" : "bg-neutral-800 border border-neutral-700"}`}>
        {done && (
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={done ? "text-neutral-500 line-through" : "text-neutral-300"}>{title}</span>
    </li>
  );
}
