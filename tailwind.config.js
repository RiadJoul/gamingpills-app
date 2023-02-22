module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02A5CA',
        'primary-focus': '#015365',
        'dark': '#15171F',
      },
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .3s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 0s infinite alternate-reverse both',
      },
       fontFamily: {
        primary: ['Rajdhani', "sans-serif"],
       },
       keyframes: {
        type: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '4ch' },
          '35%, 40%': { width: '8ch' },
          '45%, 50%': { width: '16ch' },
          '55%, 60%': { width: '18ch' },
          '65%, 70%': { width: '20ch' },
          '75%, 80%': { width: '20ch' },
          '85%, 90%': { width: '20ch' },
          '95%': { width: '20ch' },
        },
      },
       
    },
  },
  plugins: [],
}