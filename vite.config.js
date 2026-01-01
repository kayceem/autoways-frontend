import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vike from 'vike/plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    vike({
      prerender: true  // Enable SSG (Static Site Generation)
    }),
  ],
  resolve: {
    alias: {
      // Alias react-router-dom to our compatibility layer
      'react-router-dom': path.resolve(__dirname, 'src/router.js'),
    },
  },
  build: {
    modulePreload: false,
    chunkSizeWarningLimit: 500,
  },
})
