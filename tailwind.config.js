/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'da-bg':      '#0C0C0C',
        'da-surface': '#141414',
        'da-card':    '#181818',
        'da-border':  '#252525',
        'da-text':    '#F0EDE8',
        'da-muted':   '#666666',
        'da-dim':     '#383838',
        'da-accent':  '#C8A96E',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
