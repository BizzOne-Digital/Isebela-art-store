import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6B21A8", // Purple
          dark: "#581C87",
          soft: "#F3E8FF",
        },
        secondary: {
          DEFAULT: "#F97316", // Orange
          dark: "#EA580C",
          soft: "#FFF7ED",
        },
        accent: {
          DEFAULT: "#38BDF8", // Light Blue
          dark: "#0284C7",
          soft: "#E0F2FE",
        },
        neutral: {
          50: "#FAFAF9", // Warm White
          100: "#F5F5F4", // Light Surface
          200: "#E7E5E4", // Border
          400: "#A8A29E", // Muted text
          700: "#78716C", // Muted Text
          900: "#1C1917", // Primary Text
        },
        surface: "#FFFFFF",
        surfaceDark: "#18181B",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
