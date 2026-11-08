/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        primary: '#1A1B1F',
      },
    },
  },
  plugins: [],
}
