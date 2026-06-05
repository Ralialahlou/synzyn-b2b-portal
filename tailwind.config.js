/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#3F3132',
          taupe: '#A28B83',
          beige: '#D0B9AB',
          rose: '#C27279',
          pink: '#D9A9B1',
          lavender: '#B8ABD0',
          cream: '#FAF8F5',
          'cream-dark': '#F2EDE8',
          'muted': '#745E5C',
        },
      },
      fontFamily: {
        courier: ['"Courier New"', 'Courier', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        brand: '0.06em',
        'brand-wide': '0.12em',
        'brand-wider': '0.18em',
      },
    },
  },
  plugins: [],
};
