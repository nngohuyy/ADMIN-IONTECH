import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      fontSize: {
        'xs': '0.5rem',     // 08px
        'sm': '0.75rem',    // 12px
        'smid': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.375rem',   // 22px
        '2xl': '1.875rem',  // 30px
        '3xl': '2.625rem',  // 42px
        '4xl': '3.5rem',    // 56px
      }
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        xs: '0.5rem',     // 08px
        sm: '0.75rem',    // 12px
        smid: '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.375rem',   // 22px
        '2xl': '1.875rem',  // 30px
        '3xl': '2.625rem',  // 42px
        '4xl': '3.5rem',    // 56px
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
} satisfies Config;
