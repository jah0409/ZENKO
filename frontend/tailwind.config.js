/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zenko: {
          bg: "#05070d",
          panel: "#0b0f1a",
          card: "#101524",
          border: "#1c2336",
          accent: "#7c5cff",
          accent2: "#22d3ee",
          green: "#34d399",
          text: "#e6e8ef",
          muted: "#8b90a3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 50% 0%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(circle at 80% 30%, rgba(34,211,238,0.18), transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,92,255,0.35)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
