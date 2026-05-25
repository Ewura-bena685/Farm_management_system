/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
          600: '#059669',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
        },
      }
    },
  },
  plugins: [],
}
