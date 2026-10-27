import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' permite publicar en GitHub Pages bajo /SQL_Intermedio/ (o cualquier ruta).
export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
})
