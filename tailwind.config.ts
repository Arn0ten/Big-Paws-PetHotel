import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pet-walk": {
          "0%": { transform: "translateX(0%) translateY(0px)" },
          "25%": { transform: "translateX(25%) translateY(-5px)" },
          "50%": { transform: "translateX(50%) translateY(0px)" },
          "75%": { transform: "translateX(75%) translateY(-5px)" },
          "100%": { transform: "translateX(100%) translateY(0px)" },
        },
        "sign-wave": {
          "0%": { transform: "translateX(-50%) rotate(12deg)" },
          "25%": { transform: "translateX(-50%) rotate(8deg)" },
          "50%": { transform: "translateX(-50%) rotate(12deg)" },
          "75%": { transform: "translateX(-50%) rotate(16deg)" },
          "100%": { transform: "translateX(-50%) rotate(12deg)" },
        },
        "sign-stick": {
          "0%": { transform: "translateX(-50%) rotate(12deg)" },
          "25%": { transform: "translateX(-50%) rotate(8deg)" },
          "50%": { transform: "translateX(-50%) rotate(12deg)" },
          "75%": { transform: "translateX(-50%) rotate(16deg)" },
          "100%": { transform: "translateX(-50%) rotate(12deg)" },
        },
        "cat-breathe": {
          "0%": { transform: "translateX(-50%) scale(1)" },
          "50%": { transform: "translateX(-50%) scale(1.02)" },
          "100%": { transform: "translateX(-50%) scale(1)" },
        },
        "cat-blink": {
          "0%": { height: "6px" },
          "2%": { height: "1px" },
          "4%": { height: "6px" },
          "100%": { height: "6px" },
        },
        "cat-blink-delayed": {
          "0%": { height: "6px" },
          "1%": { height: "6px" },
          "3%": { height: "1px" },
          "5%": { height: "6px" },
          "100%": { height: "6px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 10s linear infinite",
        "pet-walk": "pet-walk 10s linear infinite",
        "sign-wave": "sign-wave 3s ease-in-out infinite",
        "sign-stick": "sign-stick 3s ease-in-out infinite",
        "cat-breathe": "cat-breathe 4s ease-in-out infinite",
        "cat-blink": "cat-blink 5s ease-in-out infinite",
        "cat-blink-delayed": "cat-blink-delayed 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
