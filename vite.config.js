import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      injectRegister: 'auto',
      includeAssets: ['src/assets/FaviconTM.png'],
      manifest: {
        name: 'TodMusic - NewGen',
        short_name: 'TodMusic',
        description: 'Your music streaming application',
        start_url: '/TodMusic-NewGen/',
        scope: '/TodMusic-NewGen/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '192x192 512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        categories: ['music', 'entertainment'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5000000,
      },
    }),
  ],
  base: '/TodMusic-NewGen/',
  server: {
    host: 'localhost',
  },
})
