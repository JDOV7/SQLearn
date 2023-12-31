/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // "!./src/**/TeoriaFormPage.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/**/LandingPage.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      principal: "#4A55A2",
      secundario: "#7895CB",
      terciario: "#A0BFE0",
      cuarto: "#C5DFF8",
      quinto: "#FFF5E4",
      black: "#191825",
      red: "#FF6969",
      green: "#A7D397",
      white: "white",
    },
  },
  plugins: [],
};
