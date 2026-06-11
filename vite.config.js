import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/NKG-MATH/', // यह आपके गिटहब प्रोजेक्ट का नाम है
})
