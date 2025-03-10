import { useAuth } from '~/composables/useAuth'

interface FetchError {
  response?: { status: number }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const originalFetch = globalThis.$fetch

    let isRefreshing = false; // флаг для отслеживания процесса обновления токена

    const fetchWithAuth = async (request: string, options: any) => {
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
        console.log('fuck');
        if ((error as FetchError).response?.status === 401 && !isRefreshing) {
          const auth = useAuth()
          try {
            isRefreshing = true; // устанавливаем флаг
            await auth.refreshAccessToken()
            
            // Повторяем оригинальный запрос с новым токеном
            const result = await originalFetch(request, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
              }
            })
            
            isRefreshing = false; // сбрасываем флаг после успешного обновления
            return result
          } catch (refreshError) {
            isRefreshing = false; // сбрасываем флаг в случае ошибки
            auth.logout()
            navigateTo('/auth/SignIn')
            throw refreshError
          }
        }
        throw error
      }
    }

    // Добавляем недостающие методы
    fetchWithAuth.raw = originalFetch.raw
    fetchWithAuth.create = originalFetch.create

    globalThis.$fetch = fetchWithAuth as typeof originalFetch
  })
}) 