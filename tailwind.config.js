/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  // content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        bouncing: 'bouncing 1s infinite',
      },
      keyframes: {
        bouncing: {
          "0%, 100%": {
            "transform": "translateY(0)",
          },
          "50%": {
            "transform": "translateY(-25%)",
          }
        }
      }
    },
  },
  plugins: [],
}