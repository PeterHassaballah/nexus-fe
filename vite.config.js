import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Add the base option here
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/main.jsx',
    },
  },
  plugins: [react()],
});