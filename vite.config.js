import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TodMusic - NewGen',
        short_name: 'TodMusic',
        description: 'Your music streaming application',
        theme_color: '#1DB954',
        background_color: '#ffffff',
        icons: [
          {
            src: '/src/assets/FaviconTM.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/FaviconTM.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  base: '/TodMusic-NewGen/',
  server: {
    host: 'localhost',
  },
})
