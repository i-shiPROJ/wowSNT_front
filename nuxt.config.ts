// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt'
  ],
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css', // для дополнительных утилит
    '@/assets/less/global.less',
    '@/assets/less/flexclasses.less',
    '@/assets/less/padding.less',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  },
  elementPlus: {
    importStyle: 'css',
    //themes: ['dark'] // если нужны темы
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  runtimeConfig: {
    public: {
      baseURL: 'http://185.42.14.187:8080'
      //baseURL: process.env.API_BASE_URL || 'http://localhost:3000'
    }
  },
  routeRules: {
    '/admin/**': { ssr: false },
    '/user/**': { ssr: false }
    /*  'admin/1/solution': { ssr: true } */
  }
})
