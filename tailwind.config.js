/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#faf7ee",
          100: "#f3eed8",
          200: "#e7dcb1",
          300: "#d9c585",
          400: "#c8a858", // Official Emblem Matte Gold
          500: "#b89543",
          600: "#9e7a33",
          700: "#7c5c29",
          800: "#654926",
          900: "#543c22",
          950: "#301f10",
        },
        surface: {
          DEFAULT: "#070709",
          50: "#18181c",
          100: "#121216",
          200: "#0c0c0f",
          300: "#070709",
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Syne'", "'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        widest: "0.25em",
      }
    },
  },
  plugins: [],
};
