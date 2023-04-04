/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--outfit-font)", "sans-serif"],
    },
    extend: {
      letterSpacing: {
        "very-wide": "0.2em",
      },
      colors: {
        "blue-gray": "#98A7CC",
      },
    },
  },
  plugins: [],
};
