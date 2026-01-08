import type { AuthUser } from '../features/auth/auth-context'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'auth_user'
const APP_KEY = 'appName'

export function getApiBase(): string {
  return (import.meta as any).env?.VITE_API_BASE_URL || ''
}

export function ensureAppName() {
  if (!localStorage.getItem(APP_KEY)) localStorage.setItem(APP_KEY, 'PRUEBAS')
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function setAuthStorage(token: string, user: AuthUser) {
  ensureAppName()
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthStorage() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem('rolesAppActual')
}
