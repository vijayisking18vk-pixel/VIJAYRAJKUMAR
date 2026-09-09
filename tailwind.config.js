/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          dark: '#0A0A0A',
          card: '#FFFFFF',
          border: '#E5E7EB',
          subtle: '#F4F4F5',
          secondary: '#6B6B6B',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        poster: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'card-clean': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 30px -5px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.03)',
        'poster-light': '0 20px 60px -15px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
}
