import { ref } from 'vue'
import type { AuthResponse, LoginCredentials } from '~/types/auth'

export const useAuth = () => {
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isAuthenticated = ref(false)

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await $fetch<AuthResponse>(`${useRuntimeConfig().public.baseURL}/auth`, {
        method: 'POST',
        body: credentials
      })
      
      setTokens(response.token, response.refreshToken)
      isAuthenticated.value = true
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await $fetch<AuthResponse>(`${useRuntimeConfig().public.baseURL}/auth/refresh-token`, {
        method: 'POST',
        body: { refreshToken: refreshToken.value }
      })
      
      setTokens(response.token, response.refreshToken)
      return response
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      throw error
    }
  }

  const setTokens = (accessToken: string, refresh: string) => {
    token.value = accessToken
    refreshToken.value = refresh
    sessionStorage.setItem('authToken', accessToken)
    sessionStorage.setItem('refreshToken', refresh)
  }

  const logout = () => {
    token.value = null;
    refreshToken.value = null;
    isAuthenticated.value = false;
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('refreshToken');
  }

  return {
    token,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken
  }
} 