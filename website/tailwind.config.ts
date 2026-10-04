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
        google: {
          blue: "#1a73e8",
          red: "#ea4335",
          yellow: "#fbbc04",
          green: "#34a853",
        },
      },
      fontFamily: {
        sans: ['Google Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Google Sans Mono', 'Fira Code', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
