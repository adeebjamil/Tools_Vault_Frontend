/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Blue
                primary: {
                    50: '#EEF4FF',
                    100: '#D8E6FF',
                    200: '#B8D1FF',
                    300: '#8BB5FF',
                    400: '#6B8AFF',
                    500: '#0A21C0',
                    600: '#050A44',
                    700: '#030728',
                    800: '#020518',
                    900: '#01030C',
                    950: '#000206',
                },
                // Slate (main dark theme)
                slate: {
                    800: '#2C2E3A',
                    850: '#1F2128',
                    900: '#141619',
                    950: '#0A0B0D',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'shimmer': 'shimmer 3s infinite',
                'spotlight': 'spotlight 2s ease .75s 1 forwards',
                'meteor-effect': 'meteor 5s linear infinite',
                // Magic UI animations
                'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
                'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'marquee': 'marquee var(--duration) infinite linear',
                'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
                'shimmer-text': 'shimmer-text 8s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(10, 33, 192, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(10, 33, 192, 0.6)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                spotlight: {
                    "0%": {
                        opacity: 0,
                        transform: "translate(-72%, -62%) scale(0.5)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translate(-50%,-40%) scale(1)",
                    },
                },
                meteor: {
                    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
                    "70%": { opacity: "1" },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: "0",
                    },
                },
                // Magic UI keyframes
                'shimmer-slide': {
                    to: { transform: 'translate(calc(100cqw - 100%), 0)' },
                },
                'spin-around': {
                    '0%': { transform: 'translateZ(0) rotate(0)' },
                    '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
                    '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
                    '100%': { transform: 'translateZ(0) rotate(360deg)' },
                },
                'border-beam': {
                    '100%': { 'offset-distance': '100%' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
                'marquee-vertical': {
                    from: { transform: 'translateY(0)' },
                    to: { transform: 'translateY(calc(-100% - var(--gap)))' },
                },
                'shimmer-text': {
                    '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shimmer-width)) 0' },
                    '30%, 60%': { 'background-position': 'calc(100% + var(--shimmer-width)) 0' },
                },
            },
            boxShadow: {
                'glow': '0 0 40px rgba(10, 33, 192, 0.3)',
                'glow-lg': '0 0 60px rgba(10, 33, 192, 0.4)',
                'glow-xl': '0 0 80px rgba(10, 33, 192, 0.5)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};
