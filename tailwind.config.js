/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#037C6E", 
        textPrimary: "#2d2d2d",
        textSecondary: "#6b7280",
        background: "#f7f9fc",
        highlight: "#ff5722",
      },
      fontFamily: {
        Dream: ["Dream", "sans-serif"],
        DreamBold: ["DreamBold", "sans-serif"],
        Caveat: ["Caveat", "sans-serif"],
   
      },
    },
  },
  plugins: [],
}