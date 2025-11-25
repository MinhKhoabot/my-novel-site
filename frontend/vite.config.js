import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠ TẮT rolldown: không dùng "builder: 'rolldown'"
export default defineConfig({
  plugins: [react()],
})
