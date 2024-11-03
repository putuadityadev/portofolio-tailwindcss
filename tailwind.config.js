/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#64748b',
        dark: '#0f172a',
      },
      screens: {
        '2xl': '1320px'
      },
      animation: {
        'loop-scroll' : 'loop-scroll 20s linear infinite',
        'loop-scroll2' : 'loop-scroll2 10s linear infinite'
      },
      keyframes: {
        'loop-scroll' : {
          from : {transform: 'translateX(0)'},
          to : {transform: 'translateX(-100%)'}
        },
        'loop-scroll2' : {
          from : {transform: 'translateX(-100%)'},
          to : {transform: 'translateX(0)'}
        }
      }
    },
  },
  plugins: [],
}

