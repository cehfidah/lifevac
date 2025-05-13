const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    screens: {
      "2xsm": "375px",
      xsm: "425px",
      "3xl": "2000px",
      map: "1020px",
      screen: "1500px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
    },
  },
  plugins: [],
};
