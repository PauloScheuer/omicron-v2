module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2B6AFF',
        primaryDark: '#0F40B3',
        primaryLight: '#457DFF',
        secundary: '#FFB912',
        secundaryDark: '#B37F06',
        secundaryLight: '#FFC02B',
        good: '#28A745',
        bad: '#DC3545',
        light: '#e5e5e5',
        dark: '#272727',
        grey: '#808080'
      },
      boxShadow:{
        'primary':'4px 4px 5px 2px #2B6AFF',
        'secundary':'4px 4px 5px 2px #FFB912',
      },
      spacing:{
        '128':'32rem'
      },
      maxWidth:{
        'icon': '12rem'
      },
      minWidth:{
        '32':'8rem'
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
