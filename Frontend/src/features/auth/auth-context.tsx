import React, { createContext, useContext, useMemo, useState } from 'react'
import { loginWithPassword } from './auth-service'
import { clearAuthStorage, getAuthToken, getAuthUser, setAuthStorage } from '../../services/storage'

export type AuthUser = {
  username: string
  email?: string
  rolesPorEmpresa?: Record<string, string[]>
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthCtx = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAuthToken())
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser())

  const logout = () => {
    clearAuthStorage()
    setToken(null)
    setUser(null)
  }

  const login = async (username: string, password: string) => {
    const { token: t, user: u } = await loginWithPassword(username, password)
    setAuthStorage(t, u)
    setToken(t)
    setUser(u)
  }

  const value = useMemo<AuthState>(
    () => ({ user, token, isAuthenticated: !!token, login, logout }),
    [user, token],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
