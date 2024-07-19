import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        iconSize: "24px",
      },

      backgroundColor: {
        mainColor: "#4171FF",
        "mainColor-700": "#1544D0",
      },

      colors: {
        borderColor1: "#E3E3E3",
        textColor1: "#676767",
        "custom-blue-30": "rgba(217, 227, 255, 0.3)",
        "custom-pink-30": "rgba(255, 228, 224, 0.3)",
        "custom-blue-70": "rgba(217, 227, 255, 0.7)",
        "custom-pink-70": "rgba(255, 228, 224, 0.7)",
        "gray-1000": "#010101",
        "gray-900": "#313131",
        "gray-800": "#4D4D4D",
        "gray-700": "#676767",
        "gray-600": "#909090",
        "gray-500": "#B5B5B5",
        "gray-400": "#D0D0D0",
        "gray-300": "#E3E3E3",
        "gray-200": "#F3F3F3",
        "gray-100": "#F9F9F9",
        "mainColor-700": "#1544D0",
        mainColor: "#4171FF",
        subColor: "#6284E8",
        "main-400": "#A0B8FF",
        "main-300": "#A0B8FF",
        "main-200": "#D9E3FF",
        "main-100": "#ECF1FF",
        yellow: "#FFE810",
        error: "FF0000",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
