/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'text-muted': 'var(--color-text-muted)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        brand: {
          bg: 'var(--color-background)',
          dark: 'var(--color-text-primary)',
          card: 'var(--color-background)',
          surface: 'var(--color-surface)',
          border: 'var(--color-border)',
          subtle: 'rgba(201, 214, 211, 0.25)',
          accent: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          muted: 'var(--color-text-muted)',
        },
        sky: {
          1700: '#0d2238',
          1900: '#06101e',
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
