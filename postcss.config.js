// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- FIX IS HERE: Changed from 'tailwindcss' to '@tailwindcss/postcss'
    autoprefixer: {},
  },
};