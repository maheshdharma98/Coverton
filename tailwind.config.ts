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
        blue: {
          DEFAULT: "#1247D6",
          2: "#1E5AFF",
          tint: "#EEF3FF",
          mid: "#D4E0FF",
        },
        gold: {
          DEFAULT: "#F5B800",
          2: "#FFCA28",
          tint: "#FFFAE8",
          dark: "#9A7000",
        },
        ink: {
          DEFAULT: "#0A0F1E",
          2: "#3D4460",
          3: "#8892A4",
        },
        surface: "#FAFBFF",
        line: "#E8EBF5",
      },
      borderRadius: {
        card: "14px",
        pill: "50px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
