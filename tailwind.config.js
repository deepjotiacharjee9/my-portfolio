/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'da-bg':      '#03080F',
        'da-surface': '#060E1A',
        'da-card':    '#071020',
        'da-border':  'rgba(96,165,250,0.12)',
        'da-text':    '#F8FAFC',
        'da-muted':   'rgba(148,163,184,0.68)',
        'da-dim':     'rgba(148,163,184,0.55)',
        'da-accent':  '#60A5FA',
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
