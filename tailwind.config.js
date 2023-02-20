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
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6.5ch' },
          '65%, 70%': { width: '8.5ch' },
          '75%, 80%': { width: '12ch' },
          '85%, 90%': { width: '12ch' },
          '95%': { width: '12ch' },
        },
      },
       
    },
  },
  plugins: [],
}