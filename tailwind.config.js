/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue-100": "#00152F",
        "brand-blue-200": "#3D92EC",
        "brand-blue-300": "#778FAB",
        "brand-blue-400": "#000E28",
        "brand-blue-500": "#0C67A0",
      },
    },
  },
  plugins: [],
};
