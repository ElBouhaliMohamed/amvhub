const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  theme: {
    colors: {
      ...defaultTheme.colors,
      primary: defaultTheme.colors["blue"],
      "primary-25": "var(--primary-25)",
      "primary-50": "var(--primary-50)",
      "primary-100": "var(--primary-100)",

      "secondary-25": "var(--secondary-25)",
      "secondary-50": "var(--secondary-50)",
      "secondary-100": "var(--secondary-100)",

      "background-25": "var(--background-25)",
      "background-50": "var(--background-50)",
      "background-100": "var(--background-100)"
    },
    spacing: {
      ...defaultTheme.spacing,
      '7': '1.75rem',
      '80': '20rem',
      '112': '28rem',
    },
    opacity: {
      ...defaultTheme.opacity,
      '10': '.10'
    }
  },
  variants: {
    opacity: ["responsive", "hover"]
  }
};
