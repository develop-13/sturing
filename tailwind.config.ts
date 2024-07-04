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
				mainColor: "#4171FF",
				borderColor1: "#E3E3E3",
				textColor1: "#676767",
				"custom-blue-bright": "rgba(217, 227, 255, 0.3)",
				"custom-pink-bright": "rgba(255, 228, 224, 0.3)",
				"mainColor-700": "#1544D0",
				"main-100": "#ECF1FF",
				"main-200": "#D9E3FF",
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
