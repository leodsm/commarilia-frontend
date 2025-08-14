import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2563eb',
        brandOrange: '#f97316',
      }
    },
  },
  plugins: [typography, lineClamp],
}
