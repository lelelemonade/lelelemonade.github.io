import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // Honour PORT so several worktrees can run `pnpm dev` side by side.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        stickers: './stickers.html'
      }
    }
  }
})
