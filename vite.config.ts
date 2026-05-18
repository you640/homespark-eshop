import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'offline.html'],
      manifest: {
        name: 'Homespark',
        short_name: 'Homespark',
        description: 'Smart home zariadenia, dizajnové osvetlenie a moderné bytové doplnky.',
        lang: 'sk',
        theme_color: '#f5920a',
        background_color: '#faf8f5',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['shopping', 'lifestyle'],
        shortcuts: [
          {
            name: 'Prehľadávať kategórie',
            short_name: 'Kategórie',
            description: 'Prehľadávať všetky produktové kategórie',
            url: '/kategoria/vsetko',
            icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
          },
          {
            name: 'Môj košík',
            short_name: 'Košík',
            description: 'Zobraziť nákupný košík',
            url: '/kosik',
            icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [
          /^\/wp-admin/,
          /^\/wp-includes/,
          /^\/wp-content/,
          /^\/wp-json/,
          /^\/wp-login\.php/
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/bcaupbilfpjrvintlhfo\.supabase\.co\/storage\/v1\/object\/public\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-ui';
            if (id.includes('recharts')) return 'vendor-ui';
            if (id.includes('@tanstack/react-query')) return 'vendor-query';
            // Keep React and related in the main vendor chunk to avoid splitting issues
          }
        }
      }
    }
  }
}));
