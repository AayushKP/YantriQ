/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hyperlegible: ["Atkinson Hyperlegible", "sans-serif"],
        work: ['"Work Sans"', "sans-serif"],
        staatliches: ["Staatliches", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(212, 212, 212, 0.2) 0%, rgba(72, 70, 70, 1) 49%, rgba(185, 185, 185, 0.14) 67%, rgba(185, 185, 185, 0.14) 86%, rgba(185, 185, 185, 0.4) 100%)",
      },
    },
  },
  plugins: [],
};
