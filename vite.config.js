import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Forward /api/* to vercel dev (port 3000) during local development
      // Run: vercel dev  (instead of npm run dev) to use the full stack locally
      // OR: the chatbot will work correctly on Vercel after deployment
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})