import { useAuth } from '~/composables/useAuth'

interface FetchError {
  response?: { status: number }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const originalFetch = globalThis.$fetch

    const customFetch = async (request: any, options: any = {}) => {
      const token = sessionStorage.getItem('authToken')
      
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }

      try {
        return await originalFetch(request, options)
      } catch (error: unknown) {
        if ((error as FetchError).response?.status === 401) {
          const auth = useAuth()
          try {
            await auth.refreshAccessToken()
            return await originalFetch(request, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
              }
            })
          } catch (refreshError) {
            auth.logout()
            navigateTo('/auth/SignIn')
            throw refreshError
          }
        }
        throw error
      }
    }

    // Добавляем недостающие методы
    customFetch.raw = originalFetch.raw
    customFetch.create = originalFetch.create

    globalThis.$fetch = customFetch as typeof originalFetch
  })
}) 