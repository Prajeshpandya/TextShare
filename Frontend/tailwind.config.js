/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Playwrite CU", "cursive"],
      },
      screens: {
        'mobile': { 'raw': '(max-width: 500px)' },
        // => @media (min-height: 800px) { ... }
      }
    },
  },
  plugins: [],
};
