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
          bg: "#000000",
          panel: "#04110a",
          card: "#06170e",
          border: "#0e2a1c",
          accent: "#2dd4a7",
          accent2: "#5eead4",
          neon: "#00ffa3",
          green: "#10b981",
          text: "#e8fff5",
          muted: "#7a9a8b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(ellipse at 50% 30%, rgba(45,212,167,0.25), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(0,255,163,0.12), transparent 50%)",
        "grid-lines":
          "linear-gradient(rgba(45,212,167,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,167,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(45,212,167,0.45)",
        glowSm: "0 0 24px rgba(45,212,167,0.45)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", filter: "drop-shadow(0 0 12px #2dd4a7)" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 28px #00ffa3)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        spinSlow: "spinSlow 30s linear infinite",
        spinReverse: "spinReverse 45s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        sweep: "sweep 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
