import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ToolsVault Terms of Service - Guidelines for using our site.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-neutral-300">
      {/* Header */}
      <div className="bg-black border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-yellow-500 uppercase bg-yellow-500/10 rounded-full border border-yellow-500/20">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-sm text-neutral-500 mb-12">
            Last updated: January 10, 2026
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                <p className="mb-0">
                By accessing or using <strong>ToolsVault</strong>, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any of these terms, you are prohibited from using this site.
                </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use the tools on ToolsVault for personal, non-commercial transitory viewing only. Under this license, you may not:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
               {[
                   "Modify or copy the materials",
                   "Use for commercial purposes",
                   "Reverse engineer any software",
                   "Remove copyright notations"
               ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                       <div className="w-2 h-2 rounded-full bg-red-500" />
                       <span className="text-sm font-medium">{item}</span>
                   </div>
               ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
            <p>
              The materials on ToolsVault are provided on an 'as is' basis. ToolsVault makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
            <p>
              In no event shall ToolsVault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ToolsVault.
            </p>
          </section>

           <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. User Guidelines</h2>
            <p className="mb-4">When using our tools, you agree to:</p>
             <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 flex-shrink-0 font-bold">✓</div>
                <div>
                  <h4 className="font-bold text-white m-0">Lawful Use</h4>
                  <p className="text-sm m-0 text-neutral-400">Use the tools only for legal purposes and in compliance with all regulations.</p>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 flex-shrink-0 font-bold">✓</div>
                <div>
                  <h4 className="font-bold text-white m-0">Security</h4>
                  <p className="text-sm m-0 text-neutral-400">Not attempt to breach, test, or disrupt the security of the website.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="border-t border-neutral-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Questions?</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 inline-flex gap-4 items-center cursor-pointer hover:border-yellow-500/50 transition-colors">
               <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center text-white">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
               </div>
               <div>
                 <div className="text-sm text-neutral-400">Legal Inquiries</div>
                 <div className="font-bold text-white text-lg">privacy.toolsvault@gmail.com</div>
               </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
