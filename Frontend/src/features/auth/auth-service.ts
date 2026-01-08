import { apiFetchJson } from '../../services/api'
import type { AuthUser } from './auth-context'

type LoginResponse = { token: string; user: any }

export async function loginWithPassword(username: string, password: string): Promise<{ token: string; user: AuthUser }> {
  const data = await apiFetchJson<LoginResponse>('/api/security/loginPrueba', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!data?.token || !data?.user) throw new Error('RESPUESTA_INESPERADA')

  // Validación simple inspirada en el módulo adjunto
  const rolesPorEmpresa = data.user.rolesPorEmpresa || {}
  const appName = (localStorage.getItem('appName') || 'PRUEBAS').toUpperCase()
  if (rolesPorEmpresa && Object.keys(rolesPorEmpresa).length > 0 && !rolesPorEmpresa[appName]) {
    // si viene rolesPorEmpresa pero no tiene acceso
    throw new Error('USUARIO_SIN_ACCESO')
  }

  const user: AuthUser = {
    username: data.user.username ?? username,
    email: data.user.email,
    rolesPorEmpresa,
  }

  return { token: data.token, user }
}
