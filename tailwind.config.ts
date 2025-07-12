import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: "#000000",
        purple: {
          500: "#5C2DD5",
          300: "#7945FF",
        },
        pink: "#FD6687",
        yellow: "#FFCE67",
        white: "#FFFFFF"
      },
      fontSize: {
        'lg': ['56px', '71px'],
        'md': ['24px', '31px'],
        'sm': ['20px', '26px'],
        'xs': ['16px', '21px'],
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"], 
      },
      screens: {
        'max-sm': { 'max': '500px' },
        'max-md': { 'max': '768px' },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} satisfies Config;
