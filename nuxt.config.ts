export default defineNuxtConfig({
  ssr:false,

  app: {
    head: {
      title: 'Погода онлайн',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },

  css: ['@/assets/style/reset.css', '@/assets/style/vars/index.css'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/style/animations" as *;
          @use "@/assets/style/fonts" as *;
          @use "@/assets/style/mixins" as *;
          @use "@/assets/style/other" as *;
        `,
        },
      },
    },
  },


  modules: [
    '@pinia/nuxt',
    'nuxt3-notifications',
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      baseUrl: 'https://api.open-meteo.com/',
      geoCodingUrl: 'https://geocoding-api.open-meteo.com/',
    },
  },
  compatibilityDate: '2024-11-18',
})