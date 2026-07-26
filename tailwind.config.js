module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./404.html",
    "./about/*.html",
    "./contact/*.html",
    "./blog/*.html",
    "./legal/*.html",
    "./seo-search-growth/*.html",
    "./paid-media-ppc/*.html",
    "./it-infrastructure-growth/*.html",
    "./wikipedia-page-creation/*.html",
    "./content-marketing/*.html",
    "./social-media-marketing/*.html",
    "./marketing-automation/*.html",
    "./conversion-rate-optimization/*.html",
    "./us/*.html",
    "./uk/*.html",
    "./uae/*.html",
    "./dubai/*.html",
    "./germany/*.html",
    "./mumbai/*.html",
    "./bangalore/*.html",
    "./delhi/*.html",
    "./pune/*.html",
    "./pricing/*.html",
    "./faqs/*.html",
    "./growth-marketing/*.html",
    "./email-marketing/*.html",
    "./fractional-cmo/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8B84B",
        "on-primary": "#0A0A0C",
        secondary: "#EDEBE6",
        "on-secondary": "#0A0A0C",
        background: "#0A0A0C",
        surface: "#131318",
        "on-surface": "#EDEBE6",
        "on-surface-variant": "#8E8B84",
        outline: "#26262F",
        "accent-gold": "#F6DA92",
        "primary-ink": "#A67C1F",
        panel: "#131318",
        panel2: "#181820",
        ink: "#0A0A0C"
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
        body: ["Space Grotesk", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
}
