/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#030507',
          900: '#070C12',
          800: '#0D1520',
          700: '#131E2D',
          600: '#1A2840',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 40px rgba(6,182,212,0.3)',
        'glow-violet': '0 0 40px rgba(139,92,246,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
