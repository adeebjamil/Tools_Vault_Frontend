/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.qrserver.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    // Security headers for Cloudflare integration
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // Prevent clickjacking
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // Prevent MIME type sniffing
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // XSS Protection
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Referrer Policy
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Permissions Policy
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://vercel.live https://*.vercel.live https://www.googletagmanager.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https: http: https://www.googletagmanager.com",
                            "connect-src 'self' https://api.qrserver.com https://tools-vault-backend.onrender.com http://localhost:5000 https://vercel.live https://*.vercel.live https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
                            "frame-src 'self' https://challenges.cloudflare.com https://vercel.live https://*.vercel.live",
                        ].join('; '),
                    },
                    // Strict Transport Security (HSTS) - Cloudflare will also add this
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
