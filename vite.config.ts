import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sitemapPlugin } from './scripts/sitemapPlugin.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
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
