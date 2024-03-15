/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.5rem',
      },
      colors: {
        primary: 'hsla(var(--primary))',
        secondary: 'hsla(var(--secondary))',
        blue: {
          light: 'hsla(var(--blue-light))',
          medium: 'hsla(var(--blue-medium))',
          dark: 'hsla(var(--blue-dark))',
        },
        gray_light: 'hsla(var(--gray-light))',
        white: 'hsla(var(--white))',
      },
    },
  },
  plugins: [],
};
