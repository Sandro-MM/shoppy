const plugin = require('tailwindcss/plugin');
const {
  sharedOverride,
  sharedExtend,
  sharedPlugins,
} = require('./shared.tailwind.js');


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'text-primary',
    'bg-primary',
    'border-primary',
    'text-on-primary',
    'bg-disabled',
    'text-disabled',
  ],
  theme: {
    ...sharedOverride,
    extend: {
      ...sharedExtend,
      aspectRatio: {
        poster: '471 / 707',
        'episode-poster': '1256 / 707',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1146px',
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), ...sharedPlugins(plugin)],
};
