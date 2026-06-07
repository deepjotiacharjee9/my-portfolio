import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages at deepjotiacharjee9.github.io/my-portfolio/
  // Change to '/' if you use a custom domain (e.g. deepjoti.in)
  base: '/my-portfolio/',
})
