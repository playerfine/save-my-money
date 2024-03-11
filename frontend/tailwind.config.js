/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsla(var(--primary))',
        secondary: 'hsla(var(--secondary))',
        blue_light: 'hsla(var(--blue-light))',
        black: 'hsla(var(--black))',
        white: 'hsla(var(--white))',
      },
    },
  },
  plugins: [],
};
