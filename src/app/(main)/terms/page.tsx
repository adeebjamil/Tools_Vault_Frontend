import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ToolsVault Terms of Service - Guidelines for using our free online tools that help make life easier.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Last updated: January 10, 2026
        </p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using ToolsVault, you agree to be bound by these Terms of Service 
          and all applicable laws and regulations. If you do not agree with any of these 
          terms, you are prohibited from using this website.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily use the tools and materials on ToolsVault 
          for personal, non-commercial use. This is the grant of a license, not a transfer 
          of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials except for personal use</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software</li>
          <li>Remove any copyright or proprietary notations</li>
          <li>Transfer the materials to another person or mirror on another server</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          The tools and materials on ToolsVault are provided on an &quot;as is&quot; basis. 
          ToolsVault makes no warranties, expressed or implied, and hereby disclaims all 
          warranties including, without limitation:
        </p>
        <ul>
          <li>Implied warranties of merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement of intellectual property</li>
        </ul>
        <p>
          ToolsVault does not warrant that the tools will be uninterrupted, error-free, 
          or that defects will be corrected.
        </p>

        <h2>Limitations</h2>
        <p>
          In no event shall ToolsVault or its suppliers be liable for any damages 
          (including, without limitation, damages for loss of data or profit, or due to 
          business interruption) arising out of the use or inability to use our tools.
        </p>

        <h2>Accuracy of Materials</h2>
        <p>
          The materials appearing on ToolsVault could include technical, typographical, 
          or photographic errors. ToolsVault does not warrant that any of the materials 
          are accurate, complete, or current. We may make changes to the materials at 
          any time without notice.
        </p>

        <h2>User Responsibilities</h2>
        <p>When using our tools, you agree to:</p>
        <ul>
          <li>Use the tools only for lawful purposes</li>
          <li>Not attempt to disrupt or compromise website security</li>
          <li>Not use automated systems to access the website excessively</li>
          <li>Not use the tools to process illegal or harmful content</li>
          <li>Take responsibility for the content you process using our tools</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          All content, features, and functionality of ToolsVault, including but not 
          limited to text, graphics, logos, and software, are the exclusive property 
          of ToolsVault and are protected by copyright, trademark, and other intellectual 
          property laws.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          ToolsVault may contain links to third-party websites. We have no control over 
          the content, privacy policies, or practices of any third-party sites and assume 
          no responsibility for them.
        </p>

        <h2>Advertising</h2>
        <p>
          ToolsVault displays advertisements through Google AdSense to support our free 
          services. These advertisements are clearly marked and are subject to Google&apos;s 
          advertising policies.
        </p>

        <h2>Modifications</h2>
        <p>
          ToolsVault may revise these Terms of Service at any time without notice. By 
          using this website, you agree to be bound by the current version of these terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with applicable laws, 
          without regard to conflict of law provisions.
        </p>

        <h2>Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us at:
        </p>
        <ul>
          <li>Email: legal@tools-vault.app</li>
          <li>Website: <a href="/contact">Contact Page</a></li>
        </ul>
      </div>
    </div>
  );
}
