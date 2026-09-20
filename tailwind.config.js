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
        gta: {
          fill: 'var(--gta-text-fill)',
          'fill-warm': 'var(--gta-text-fill-warm)',
          'fill-light': 'var(--gta-text-fill-light)',
          outline: 'var(--gta-text-outline)',
          shadow: 'var(--gta-text-shadow)',
          'sky-top': 'var(--gta-sky-top)',
          'sky-mid': 'var(--gta-sky-mid)',
          'sky-low': 'var(--gta-sky-low)',
          'sky-horizon': 'var(--gta-sky-horizon)',
          silhouette: 'var(--gta-silhouette)',
        },
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
        sans: ['"Futura LT"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Futura LT"', '"Plus Jakarta Sans"', 'sans-serif'],
        pricedown: ['"Pricedown"', 'Impact', 'sans-serif'],
        display: ['"Pricedown"', 'Impact', 'sans-serif'],
        diploma: ['"Diploma"', 'serif'],
        beckett: ['"Beckett"', 'Georgia', 'serif'],
        heading: ['"Beckett"', 'Georgia', 'serif'],
        bank: ['"Bank Gothic"', 'monospace', 'sans-serif'],
        hud: ['"Bank Gothic"', 'monospace', 'sans-serif'],
        futura: ['"Futura LT"', 'sans-serif'],
        'futura-condensed': ['"Futura LT Condensed"', 'sans-serif'],
        mono: ['"Bank Gothic"', '"JetBrains Mono"', 'monospace'],
        poster: ['"Pricedown"', 'Impact', 'sans-serif']
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
