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
          50: "#fdfbf3",
          100: "#fbf6e3",
          200: "#f6ebc4",
          300: "#edd99a",
          400: "#e2c069",
          500: "#d4af37", // Primary Label Gold
          600: "#c8a858", // Emblem Match
          700: "#aa802c",
          800: "#8b6427",
          900: "#745224",
          950: "#432c10",
        },
        obsidian: {
          950: "#060608",
          900: "#0b0b0f",
          800: "#13131a",
          700: "#1c1c24",
          600: "#272733",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Cinzel", "Playfair Display", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
};
