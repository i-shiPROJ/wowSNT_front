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
    '@/assets/less/global.less'
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



})
