/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b7d5ff',
          300: '#8bb9ff',
          400: '#5a97ff',
          500: '#2f6fff',
          600: '#1f55db',
          700: '#1a43ad',
          800: '#1a3a89',
          900: '#1a336f',
        }
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}
