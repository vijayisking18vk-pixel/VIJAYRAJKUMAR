/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          black: '#020005',
          abyss: '#0B011A',
        },
        storm: {
          violet: '#4B009E',
        },
        electric: {
          ultraviolet: '#9D00FF',
        },
        plasma: {
          magenta: '#D147FF',
        },
        halo: {
          white: '#F8ECFF',
        },
        ash: {
          lavender: '#A89BB9',
        },
        warning: {
          crimson: '#FF1E56',
        },
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', '"Syne"', 'serif'],
        syne: ['"Syne"', 'sans-serif'],
        body: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        editorial: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'lightning': 'lightning 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(157, 0, 255, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(209, 71, 255, 0.8))' },
        },
        lightning: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      boxShadow: {
        'plasma-sm': '0 0 15px rgba(157, 0, 255, 0.3)',
        'plasma-md': '0 0 30px rgba(157, 0, 255, 0.5), inset 0 0 15px rgba(209, 71, 255, 0.2)',
        'plasma-lg': '0 0 60px rgba(157, 0, 255, 0.6), inset 0 0 25px rgba(209, 71, 255, 0.3)',
        'halo': '0 0 40px rgba(248, 236, 255, 0.8), 0 0 80px rgba(157, 0, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
