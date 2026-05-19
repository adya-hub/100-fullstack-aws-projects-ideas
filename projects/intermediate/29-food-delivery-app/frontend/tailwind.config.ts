import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(222 47% 6%)",
        foreground: "hsl(210 40% 98%)",
        primary: "hsl(217 91% 60%)",
        muted: "hsl(217 33% 14%)",
      },
    },
  },
  plugins: [],
};
export default config;
