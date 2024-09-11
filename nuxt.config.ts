// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Todo',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: '' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: []
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/css/style.css'],
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', 'nuxt-headlessui'],
  googleFonts: {
    // Options
    families: {
      Roboto: [400, 700],
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  headlessui: {
        prefix: 'Headless'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})