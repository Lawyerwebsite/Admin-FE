/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3200px',
      },
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
            poppins: ['Poppins', 'sans-serif'],
          },
    },
    
  },
  plugins: [],
};
