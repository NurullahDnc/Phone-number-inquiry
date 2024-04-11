module.exports = {
  content: [
    "./src/**/*",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      'text-main': '#080f6d',
      textMain: '#080f6d',

      'mavi-1': '#0047ab',
      'mavi-2': '#3366cc',
      'mavi-3': '#6699ff',
      'mavi-4': '#99ccff',
      'mavi-5': '#cceeff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'], 
        'poppins': ['Poppins', 'sans-serif'], 

      
      } 
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
