/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald': {
          '400': '#34d399',
        },
        'pink': {
          '500': '#ec4899',
          '400': '#f472b6',
        },
        'gray': {
          '900': '#111827',
          '800': '#1f2937',
          '700': '#374151',
          '600': '#4b5563',
          '400': '#9ca3af',
          '100': '#f3f4f6',
        },
      },
      spacing: {
        '8': '2rem',
      },
    },
  },
  plugins: [],
}
