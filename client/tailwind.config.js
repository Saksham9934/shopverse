/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9f6",
          100: "#d9f0e7",
          500: "#0f9d6e",
          600: "#0c7f59",
          700: "#0a6549",
        },
      },
    },
  },
  plugins: [],
};