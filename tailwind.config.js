/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#F5EDE4',
          200: '#D4C4B5',
          300: '#C2AB96',
          400: '#A08B76',
          500: '#8D7559',
          600: '#6D5A45',
          700: '#4E4132',
          800: '#2F271E',
          900: '#1A1611',
        },
      },
    },
  },
  plugins: [],
};