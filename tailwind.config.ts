import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          DEFAULT: '#FF6D4A',
          hover: '#FF5722',
          light: '#FFEAE4',
          dark: '#E05330',
        },
        coral: {
          DEFAULT: '#EA4B71',
          hover: '#D8385E',
          light: '#FDECEF',
        },
        background: {
          light: '#F7F5F2',
          dark: '#171717',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#222222',
          cardDark: '#1E1E1E',
        },
        border: {
          light: '#E5E0DB',
          dark: '#2E2E2E',
        },
        muted: {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(255, 109, 74, 0.25)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        cardDark: '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
