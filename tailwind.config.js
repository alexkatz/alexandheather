const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        sm: '0 0 4px var(--tw-shadow-color)',
        DEFAULT: '0 0px 8px var(--tw-shadow-color)',
        lg: '0 0px 10px var(--tw-shadow-color)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      boxShadow: {
        even: '0 0 8px 0 rgb(0 0 0 / 0.2)',
        'even-heavy': '0 0 8px 0 rgb(0 0 0 / 0.4)',
      },
      screens: {
        short: { raw: '(max-height: 660px)' },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
