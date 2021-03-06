// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  purge: {
    content: ['./src/**/*.vue']
  },
  plugins: [
    require('tailwindcss-aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
  theme: {
    aspectRatio: { // defaults to {}
      'none': 0,
      'square': [1, 1],
      '16/9': [16, 9],
      '4/3': [4, 3],
      '21/9': [21, 9],
      '53/9': [53, 9]
    },
    extend: {
      spacing: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '1/4.5': '22%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '2/6': '33.33333%',
        '3/6': '50%',
        '4/6': '66.66667%',
        '5/6': '83.33333%',
        '1/8': '12.5%',
        '1/12': '8.33333%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
        full: '100%',
        '18': '4.5rem',
        '19': '4.8rem',
        // '7': '1.75rem',
        // '28': '7rem',
        // '80': '20rem',
        // '112': '28rem'
        '128': '32rem'
      },
      opacity: {
        '10': '.10'
      },
      screens: {
        'xll': '1696px'
      },
      maxHeight: {
        'screen-xl': '720px',
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem'
      }
    }
  },
  variants: {
    cursor: ['disabled'],
    opacity: ['responsive', 'hover', 'group-hover', 'disabled'],
    aspectRatio: ['responsive']
  }
}
