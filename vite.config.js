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
      includeAssets: [
        'src/assets/FaviconTM.png',
        'public/apple-touch-icon.png',
        'public/icon-maskable.svg'
      ],
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
            src: '/TodMusic-NewGen/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/TodMusic-NewGen/icon-maskable.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
        categories: ['music', 'entertainment'],
        screenshots: [
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '540x720',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/TodMusic-NewGen/assets/FaviconTM.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
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
