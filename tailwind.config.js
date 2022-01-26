module.exports = {
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#A1CD43',
      },
      fontSize: {
        '4.5xl': ['2.75rem', '3.25rem'],
        '2.5xl': '1.75rem',
      },
      transitionProperty: {
        height: 'height',
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
      backgroundImage: {
        'green-gradient': "url('/images/bg_green-gradient.png')",
      },
      gridTemplateColumns: {
        leftSidebar: '300px 1fr',
      },
      gap: {
        11: '2.75rem',
        13: '3.25rem',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      borderWidth: ['last'],
      display: ['hover', 'group-hover'],
    },
  },
  plugins: [],
}
