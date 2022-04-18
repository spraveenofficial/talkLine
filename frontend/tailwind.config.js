module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { min: "768px", max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      desktop: { min: "1024px", max: "1279px" },

      mobile: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "small-mobile": { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    // ...defaultTheme.screens,
    extend: {},
  },
  plugins: [],
};
