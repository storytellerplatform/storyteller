/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  // content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'home-image': "url('./assets/bg.jpg')",
        'navbar-image': "url('./assets/navbar.jpg')",
        'book-image': "url('./assets/book.jpg')",
        'full-book-image': "url('./assets/fullbook.jpg')",
        'read-book-image': "url('./assets/readbook.jpg')",
        'read-book2-image': "url('./assets/readbook2.jpg')",
        'read-book3-image': "url('./assets/readbook3.jpg')",
        'star-image': "url('./assets/star.jpg')",
        'notes-image': "url('./assets/notes.jpg')",
      },
      backgroundPosition: {
        bottom: 'bottom',
        'bottom-4': 'center top 1rem',
        'bottom-8': 'center top 2rem',
        center: 'center',
        left: 'left',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        right: 'right',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
        top: 'top',
        'top-1': 'center bottom 4px',
        'top-4': 'center bottom 1rem',
        'top-8': 'center bottom 2rem',
      },
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