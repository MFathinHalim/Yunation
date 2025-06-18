// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        varela: ['"Varela Round"', "sans-serif"],
        dancing: ['"Shadows Into Light"', "cursive"],
        caveat: ['"Caveat"', "cursive"],
      },
    },
  },
  plugins: [],
};
