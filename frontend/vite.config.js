import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pwaPlugin = VitePWA({
  config: require('./pwa.config.js'),
})

export default defineConfig({
  plugins: [react(), pwaPlugin]
})