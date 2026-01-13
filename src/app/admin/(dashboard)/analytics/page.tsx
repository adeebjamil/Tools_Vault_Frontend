export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500">Track your website performance</p>
      </div>

      {/* Setup Required Banner */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">Analytics Not Configured</h3>
            <p className="text-sm text-yellow-700 mb-4">
              To view real analytics data, you need to connect Google Analytics 4 to your website.
            </p>
            <div className="flex gap-3">
              <a 
                href="/admin/settings" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configure in Settings
              </a>
              <a 
                href="https://analytics.google.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
              >
                Open Google Analytics
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Page Views</h3>
            <span className="text-xs text-gray-400 px-2 py-1 rounded-full bg-gray-100">--</span>
          </div>
          <p className="text-3xl font-bold text-gray-300">---</p>
          <p className="text-sm text-gray-400 mt-1">Connect GA4 to see data</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Unique Visitors</h3>
            <span className="text-xs text-gray-400 px-2 py-1 rounded-full bg-gray-100">--</span>
          </div>
          <p className="text-3xl font-bold text-gray-300">---</p>
          <p className="text-sm text-gray-400 mt-1">Connect GA4 to see data</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Avg. Session</h3>
            <span className="text-xs text-gray-400 px-2 py-1 rounded-full bg-gray-100">--</span>
          </div>
          <p className="text-3xl font-bold text-gray-300">---</p>
          <p className="text-sm text-gray-400 mt-1">Connect GA4 to see data</p>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Set Up Analytics</h3>
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
            <div>
              <p className="font-medium text-gray-900">Create a Google Analytics 4 property</p>
              <p className="text-sm text-gray-500">Visit analytics.google.com and set up a new GA4 property for your website.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
            <div>
              <p className="font-medium text-gray-900">Copy your Measurement ID</p>
              <p className="text-sm text-gray-500">It starts with &quot;G-&quot; followed by alphanumeric characters (e.g., G-XXXXXXXXXX).</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
            <div>
              <p className="font-medium text-gray-900">Add it to Settings</p>
              <p className="text-sm text-gray-500">Go to Settings → Integrations and paste your Google Analytics ID.</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
