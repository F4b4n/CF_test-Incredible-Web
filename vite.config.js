import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
  },
  resolve: {
    alias : {
      '@store' : path.resolve(__dirname, './src/store')
    }
  }
})
