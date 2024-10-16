/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hyperlegible: ["Atkinson Hyperlegible", "sans-serif"],
        work: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
