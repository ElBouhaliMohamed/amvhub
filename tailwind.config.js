const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    colors: {
      ...defaultTheme.colors,
      'background-light': 'var(--background-light)',
      'background': 'var(--background)',
      'background-dark': 'var(--background-dark)',

      'primary-light': 'var(--primary-light)',
      'primary': 'var(--primary)',
      'primary-dark': 'var(--primary-dark)',

      'brand-light': 'var(--brand-light)',
      'brand': 'var(--brand)',
      'brand-dark': 'var(--brand-dark)',

      'cta-light': 'var(--cta-light)',
      'cta': 'var(--cta)',
      'cta-dark': 'var(--cta-dark)',

      'info-light': 'var(--info-light)',
      'info': 'var(--info)',
      'info-dark': 'var(--info-dark)',

      'warning-light': 'var(--warning-light)',
      'warning': 'var(--warning)',
      'warning-dark': 'var(--warning-dark)',

      'success-light': 'var(--success-light)',
      'success': 'var(--success)',
      'success-dark': 'var(--success-dark)',

      'danger-light': 'var(--danger-light)',
      'danger': 'var(--danger)',
      'danger-dark': 'var(--danger-dark)'
    },
    spacing: {
      ...defaultTheme.spacing,
      '7': '1.75rem',
      '28': '7rem',
      '80': '20rem',
      '112': '28rem'
    },
    opacity: {
      ...defaultTheme.opacity,
      '10': '.10'
    },
    screens: {
      ...defaultTheme.screens,
      'xll': '1696px'
    },
    extends: {
      width: {
        '1/8': '12.5%'
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover']
  }
}
