import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // केवल एरर्स दिखाएगा, फालतू की चेतावनियों को छुपाएगा
  plugins: [
    react(), // आपके React कोड को चलाने के लिए मुख्य प्लगइन
  ]
});
