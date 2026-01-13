export const existingTools = [
    {
        id: "json-formatter",
        title: "JSON Formatter & Validator",
        description: "Beautify, minify, and validate JSON data with syntax highlighting. Detect errors instantly and explore nested structures with our tree view.",
        icon: "{ }",
        href: "/tools/json-formatter",
        category: "Developer",
    },
    {
        id: "word-counter",
        title: "Word & Character Counter",
        description: "Count words, characters, sentences, and paragraphs. Get reading time estimates and analyze keyword density for SEO optimization.",
        icon: "Aa",
        href: "/tools/word-counter",
        category: "Text",
    },
    {
        id: "qr-code-generator",
        title: "QR Code Generator",
        description: "Create customizable QR codes for URLs, text, WiFi networks, vCards, and more. Download in PNG, SVG, or PDF formats.",
        icon: "⊞",
        href: "/tools/qr-code-generator",
        category: "Utility",
    },
    {
        id: "color-palette",
        title: "Color Palette Generator",
        description: "Generate harmonious color palettes using complementary, analogous, triadic, and split-complementary color theory schemes.",
        icon: "◐",
        href: "/tools/color-palette",
        category: "Design",
    },
    {
        id: "base64",
        title: "Base64 Encoder/Decoder",
        description: "Encode text or files to Base64 and decode Base64 strings back to original content. Perfect for data URIs and API debugging.",
        icon: "⇄",
        href: "/tools/base64",
        category: "Developer",
    },
    {
        id: "markdown-preview",
        title: "Markdown Live Preview",
        description: "Write and preview Markdown in real-time. Export to HTML or copy formatted content for blogs, documentation, and README files.",
        icon: "M↓",
        href: "/tools/markdown-preview",
        category: "Developer",
    },
    {
        id: "jwt-generator",
        title: "JWT Token Generator",
        description: "Generate and decode JSON Web Tokens for authentication. Inspect headers, payloads, and verify signatures easily.",
        icon: "🔐",
        href: "/tools/jwt-generator",
        category: "Developer",
    },
    {
        id: "lorem-ipsum",
        title: "Lorem Ipsum Generator",
        description: "Generate placeholder text for your designs and mockups. Choose between paragraphs, sentences, or words.",
        icon: "¶",
        href: "/tools/lorem-ipsum",
        category: "Text",
    },
];

export const existingToolsNew = [
    {
        id: "image-compressor",
        title: "Image Compressor",
        description: "Compress JPEG, PNG, and WebP images without losing quality. Adjust quality, resize, and convert formats.",
        icon: "📷",
        href: "/tools/image-compressor",
        category: "Utility",
    },
    {
        id: "uuid-generator",
        title: "UUID Generator",
        description: "Generate unique UUIDs (v1, v4) for databases, APIs, and applications. Bulk generate up to 1000 at once.",
        icon: "🔑",
        href: "/tools/uuid-generator",
        category: "Developer",
    },
    {
        id: "hash-generator",
        title: "Hash Generator",
        description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or files securely.",
        icon: "#",
        href: "/tools/hash-generator",
        category: "Security",
    },
    {
        id: "regex-tester",
        title: "Regex Tester",
        description: "Test and debug regular expressions with real-time matching, highlighting, and a quick reference guide.",
        icon: ".*",
        href: "/tools/regex-tester",
        category: "Developer",
    },
];

export const allTools = [...existingTools, ...existingToolsNew];

export const upcomingTools = [
    {
        title: "Diff Checker",
        description: "Compare two pieces of text and highlight the differences. Perfect for code reviews.",
        icon: "≠",
        status: "In Development",
    },
    {
        title: "Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and vice versa with timezone support.",
        icon: "🕐",
        status: "Coming Soon",
    },
    {
        title: "CSS Minifier",
        description: "Minify and optimize your CSS code for faster page loading times.",
        icon: "{ }",
        status: "Planned",
    },
    {
        title: "JSON to CSV",
        description: "Convert JSON data to CSV format and vice versa for easy data manipulation.",
        icon: "📊",
        status: "Planned",
    },
];

export const testimonials = [
    {
        name: "Alex Chen",
        role: "Frontend Developer at Stripe",
        text: "ToolsVault's JSON formatter is incredibly fast. I use it daily for debugging API responses. The syntax highlighting makes it easy to spot issues.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Sarah Miller",
        role: "Product Designer at Figma",
        text: "The color palette generator is my go-to for every project. Being able to export directly to CSS variables saves me so much time.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "James Wilson",
        role: "DevOps Engineer at Netflix",
        text: "Finally, developer tools that don't phone home. As someone who works with sensitive data, knowing everything stays local is crucial.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Emma Davis",
        role: "Technical Writer at Vercel",
        text: "The word counter with reading time estimation helps me ensure my documentation is the right length. Simple but incredibly useful.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Michael Brown",
        role: "Startup Founder",
        text: "I recommend ToolsVault to every developer I mentor. Free, fast, and privacy-respecting - exactly what developer tools should be.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Lisa Park",
        role: "Full Stack Developer",
        text: "The QR code generator with custom styling options is perfect for creating branded codes for our clients. Export to SVG is a game-changer.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
];

export const faqs = [
    {
        question: "Are these tools really free?",
        answer: "Yes, all tools are completely free to use with no hidden costs, subscriptions, or premium tiers. We believe essential developer tools should be accessible to everyone."
    },
    {
        question: "Do you collect or store my data?",
        answer: "No. All processing happens locally in your browser. Your data never leaves your device. We don't use analytics, tracking cookies, or any form of data collection."
    },
    {
        question: "Do I need to create an account?",
        answer: "No account required. Just open any tool and start using it immediately. No sign-ups, no email verification, no friction."
    },
    {
        question: "Can I use these tools offline?",
        answer: "Most tools work offline once the page is loaded. We're working on a full PWA version that you can install on your device for complete offline access."
    },
    {
        question: "Are the tools open source?",
        answer: "Yes! All our tools are open source. You can view the code, contribute improvements, or even host your own instance."
    },
    {
        question: "How do you keep the tools running without ads or subscriptions?",
        answer: "We're supported by donations and sponsorships from the developer community. If you find our tools useful, consider supporting us."
    },
];
