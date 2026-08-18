import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Recharts pushes the bundle slightly over 500kB.
    // For a single-page landing page this is acceptable —
    // the entire app loads in one request with no routing overhead.
    chunkSizeWarningLimit: 600,
  },
})
