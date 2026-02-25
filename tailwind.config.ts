/// <reference types="tailwindcss" />
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                accent: {
                    primary: "#3b82f6",
                    secondary: "#8b5cf6",
                    tertiary: "#ec4899",
                },
                compliance: {
                    secure: "#10b981",
                    warning: "#f59e0b",
                    critical: "#ef4444",
                    info: "#3b82f6",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            },
        },
    },
    plugins: [],
};
export default config;
