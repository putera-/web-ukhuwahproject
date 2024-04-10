// import { _meta, meta } from "./meta"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiUri: "",
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-lucide-icons'],
  imports: {
    dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts']
  },
  typescript: {
    strict: true
  },
  // ssr: false,
  // app: {
  //   head: {
  //     title: _meta.title,
  //     meta: meta,
  //     charset: 'utf-8',
  //     viewport: 'width=device-width, initial-scale=1',
  //     link: [
  //       {
  //         rel: 'icon',
  //         type: 'image/x-icon',
  //         href: '/favicon.ico'
  //       }
  //     ]
  //   }
  // }
})
