
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        ghost: {
          white: "#FFFFFF",
          black: "#000000",
          gray: "#333333",
          accent: "#660000",
        },
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-5px, 3px)" },
          "66%": { transform: "translate(5px, -3px)" },
        },
        flash: {
          "0%, 100%": { backgroundColor: "#000000" },
          "50%": { backgroundColor: "#FFFFFF" },
        },
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        flash: "flash 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
