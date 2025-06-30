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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Elegant Muted Palette
        black: {
          DEFAULT: "#0A0A0A",
          50: "#1a1a1a",
          100: "#141414",
          500: "#0A0A0A",
          600: "#080808",
          700: "#060606",
          800: "#040404",
          900: "#020202",
        },
        charcoal: {
          DEFAULT: "#1A1A1D",
          50: "#2a2a2d",
          100: "#242427",
          500: "#1A1A1D",
          600: "#17171a",
          700: "#141417",
          800: "#111114",
          900: "#0e0e11",
        },
        graphite: {
          DEFAULT: "#2C2C2E",
          50: "#3c3c3e",
          100: "#363638",
          500: "#2C2C2E",
          600: "#292929",
          700: "#262626",
          800: "#232323",
          900: "#202020",
        },
        beige: {
          DEFAULT: "#E6B17E",
          50: "#faf6f0",
          100: "#f5ede1",
          200: "#ebd8c2",
          300: "#e1c4a4",
          400: "#d7af85",
          500: "#E6B17E",
          600: "#d19e71",
          700: "#bc8b64",
          800: "#a77857",
          900: "#92654a",
        },
        clay: {
          DEFAULT: "#D1A97A",
          50: "#f8f5f1",
          100: "#f1ebe3",
          200: "#e3d7c7",
          300: "#d5c3ab",
          400: "#c7af8f",
          500: "#D1A97A",
          600: "#bc986d",
          700: "#a78760",
          800: "#927653",
          900: "#7d6546",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px #00FFB2, 0 0 10px #00FFB2, 0 0 15px #00FFB2",
          },
          "50%": {
            boxShadow: "0 0 10px #00FFB2, 0 0 20px #00FFB2, 0 0 30px #00FFB2",
          },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mint-glow": "linear-gradient(135deg, #00FFB2, #00e6a0)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
