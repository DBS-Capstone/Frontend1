/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-sage": "#5B8266", // Hijau utama yang tenang
        "brand-forest": "#1E403C", // Hijau gelap untuk teks/elemen penting
        "brand-lime-accent": "#A3E635", // Aksen cerah untuk hover/CTA
        "ui-bg": "#F8F9FA", // Latar belakang utama (off-white)
        "ui-surface": "#FFFFFF", // Permukaan kartu/panel
        "ui-border": "#E5E7EB", // Warna border
        "text-primary": "#1F2937", // Teks paling gelap
        "text-secondary": "#6B7281", // Teks deskripsi/sub-judul

        // Keep existing colors for backward compatibility
        "brand-primary": "#5B8266",
        "brand-secondary": "#1E403C",
        "brand-accent": "#A3E635",
        "brand-light": "#F8F9FA",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-left": "fadeInLeft 0.8s ease-out",
        "fade-in-right": "fadeInRight 0.8s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        wave: "wave 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(163, 230, 53, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(163, 230, 53, 0.6)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
