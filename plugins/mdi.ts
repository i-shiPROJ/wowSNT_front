// Правильный импорт для Nuxt 3
import * as mdi from '@mdi/js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      mdi: mdi
    }
  }
})