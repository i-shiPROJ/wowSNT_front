export interface AuthResponse {
  token: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface TokenPayload {
  exp: number
  // другие поля JWT токена
} 