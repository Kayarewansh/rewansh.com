module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./404.html",
    "./blog/*.html",
    "./legal/*.html",
    "./seo-search-growth/*.html",
    "./paid-media-ppc/*.html",
    "./wikipedia-entity-hub/*.html",
    "./content-marketing/*.html",
    "./social-media-marketing/*.html",
    "./marketing-automation/*.html",
    "./conversion-rate-optimization/*.html",
    "./us/*.html",
    "./uk/*.html",
    "./uae/*.html",
    "./germany/*.html",
    "./mumbai/*.html",
    "./bangalore/*.html",
    "./delhi/*.html",
    "./pune/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e6c364",
        "on-primary": "#131411",
        secondary: "#1A1F45",
        "on-secondary": "#ffffff",
        background: "#F9FAFB",
        surface: "#ffffff",
        "on-surface": "#1A1F45",
        "on-surface-variant": "#4B5563",
        outline: "#E5E7EB",
        "accent-gold": "#C5A04D",
        "primary-ink": "#7d5f26"
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px"
      },
      spacing: {
        "margin-mobile": "20px",
        "stack-lg": "40px",
        "stack-sm": "12px",
        "container-max": "1240px",
        "stack-md": "24px",
        gutter: "32px"
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
}
