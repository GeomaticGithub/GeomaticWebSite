/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Figtree loaded by next/font (src/styles/fonts.ts), system fonts as fallback.
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: { content: "1200px" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        menuIn: {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "menu-in": "menuIn 160ms ease-out",
      },
    },
  },
  plugins: [],
};
