module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'white': '#FFF',
      'primary': {
        100: '#F8FFD6',
        200: '#EFFFAD',
        300: '#CCFF33',
        400: '#9EF01A',
        500: '#64D600',
        600: '#38B000',
        700: '#007200',
        800: '#004B23',
        900: '#003D23',
      },
      'secondary': {
        100: '#FBFAF9',
        200: '#EEEBE7',
        300: '#DBD7D1',
        400: '#BDBAB2',
        500: '#9D9B95',
        600: '#7F7B76',
        700: '#5F5C58',
        800: '#403D3B',
        900: '#2A2827',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
