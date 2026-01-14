import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ToolsVault Privacy Policy - Learn how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-300">
      {/* Header */}
      <div className="bg-black border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-yellow-500 uppercase bg-yellow-500/10 rounded-full border border-yellow-500/20">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            We value your trust. This policy explains how we handle your data with transparency and care.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800 p-8 mb-12">
            <h3 className="text-white mt-0">Key Takeaways</h3>
            <ul className="grid sm:grid-cols-2 gap-4 mt-4 mb-0 pl-0 list-none">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Processing happens in your browser</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>No personal data stored on our servers</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Transparent cookie usage</span>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>AdSense & Analytics compliant</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-500 mb-12">
            Last updated: January 10, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to ToolsVault ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website <a href="https://tools-vault.app" className="text-yellow-500 no-underline hover:text-yellow-400">tools-vault.app</a>.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <div className="space-y-6">
              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                <h3 className="text-lg font-bold text-white mb-2 mt-0">Local Processing</h3>
                <p className="mb-0 text-sm">
                  Most of our tools (like JSON Formatter, Image Compressor, etc.) run entirely <strong>client-side</strong> in your browser. This means the data you paste or upload is processed locally on your device and is <strong>never transmitted</strong> to our servers.
                </p>
              </div>

              <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
                <h3 className="text-lg font-bold text-white mb-2 mt-0">Automatically Collected Data</h3>
                <p className="mb-0 text-sm">
                  We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Site, and other technical information.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
            <p>We use trusted third-party services to keep our site running and free:</p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0 font-bold">GA</div>
                <div>
                  <h4 className="font-bold text-white m-0">Google Analytics</h4>
                  <p className="text-sm m-0 text-neutral-400">We use Google Analytics to understand how our website is being used in order to improve user experience.</p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 font-bold">Ads</div>
                <div>
                  <h4 className="font-bold text-white m-0">Google AdSense</h4>
                  <p className="text-sm m-0 text-neutral-400">We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-12">
             <h2 className="text-2xl font-bold text-white mb-4">4. Cookie Policy</h2>
             <p>
               We use cookies to enhance your experience. A cookie is a small text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer.
             </p>
             <p>
               You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
             </p>
          </section>

          <section className="border-t border-neutral-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 inline-flex gap-4 items-center">
               <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-black">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
               </div>
               <div>
                 <div className="text-sm text-neutral-400">Email us at</div>
                 <div className="font-bold text-white text-lg">privacy.toolsvault@gmail.com</div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
