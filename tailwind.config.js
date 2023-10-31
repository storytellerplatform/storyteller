/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  // content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
    },
  },
  plugins: [],
}