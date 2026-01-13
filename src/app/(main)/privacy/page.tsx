import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ToolsVault Privacy Policy - Learn how we protect your data and privacy while providing free tools to make life easier.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Last updated: January 10, 2026
        </p>

        <h2>Introduction</h2>
        <p>
          Welcome to ToolsVault. We are committed to protecting your personal information 
          and your right to privacy. This Privacy Policy explains how we collect, use, and 
          safeguard your information when you visit our website and use our services.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information Automatically Collected</h3>
        <p>When you visit our website, we may automatically collect certain information, including:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referring website</li>
          <li>Pages viewed and time spent</li>
          <li>IP address (anonymized)</li>
        </ul>

        <h3>Information You Provide</h3>
        <p>
          Our tools process data entirely in your browser. We do not collect, store, or 
          transmit any data you input into our tools. Your content remains on your device.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We use the automatically collected information to:</p>
        <ul>
          <li>Analyze website traffic and usage patterns</li>
          <li>Improve our tools and user experience</li>
          <li>Maintain website security</li>
          <li>Display relevant advertisements through Google AdSense</li>
        </ul>

        <h2>Cookies and Tracking Technologies</h2>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Remember your preferences</li>
          <li>Analyze website traffic (Google Analytics)</li>
          <li>Serve personalized advertisements (Google AdSense)</li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling cookies may 
          affect some features of our website.
        </p>

        <h2>Third-Party Services</h2>
        <h3>Google Analytics</h3>
        <p>
          We use Google Analytics to understand how visitors interact with our website. 
          Google Analytics uses cookies to collect anonymous traffic data. You can opt-out 
          by installing the Google Analytics opt-out browser add-on.
        </p>

        <h3>Google AdSense</h3>
        <p>
          We display advertisements through Google AdSense. Google may use cookies to 
          serve ads based on your prior visits to our website or other websites. You can 
          opt out of personalized advertising by visiting Google&apos;s Ads Settings.
        </p>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your 
          information. However, no internet transmission is completely secure, and we 
          cannot guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Request data portability</li>
        </ul>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age. We do not 
          knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <ul>
          <li>Email: privacy@tools-vault.app</li>
          <li>Website: <a href="/contact">Contact Page</a></li>
        </ul>
      </div>
    </div>
  );
}
