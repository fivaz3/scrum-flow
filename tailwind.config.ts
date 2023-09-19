import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // for ScheduleForm, tailwind ui Checkout Forms
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
