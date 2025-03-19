/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
            galindo: ['Galindo', ...defaultTheme.fontFamily.serif],
            monserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            "sladeYellow": {
                light: "#e8c919",
                DEFAULT: "#F9DE3F",
                dark: "#d3b610",
            },
            "sladeGreen": {
                light: "#1A4731",
                DEFAULT: "#6FB545",
                dark: "#078543",
            },
            "sladeOrange": {
                light: "#F8B24F",
                DEFAULT: "#EA7A2A",
                dark: "#F15825",
            },
            "sladeRed": {
                light: "#F8B24F",
                DEFAULT: "#EE3923",
                dark: "#d36c25",
            },
            "sladeBlack": {
                light: "#1A1A1A",
                DEFAULT: "#222831",
                dark: "#000000",
            },
        }
    },
},
plugins: [],
}
