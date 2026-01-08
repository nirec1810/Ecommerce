import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth-context'

export default function LoginView() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = useMemo(() => username.trim().length > 0 && password.trim().length > 0, [username, password])

  if (isAuthenticated) navigate('/products', { replace: true })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate('/products', { replace: true })
    } catch (err: any) {
      const msg = String(err?.message || '')
      if (msg.includes('CREDENCIALES') || msg.includes('401')) setError('Credenciales incorrectas.')
      else if (msg.includes('USUARIO_SIN_ACCESO')) setError('Este usuario no tiene acceso a esta aplicación.')
      else setError('Ocurrió un error. Intenta nuevamente.')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl border bg-white shadow-sm md:grid-cols-2">
          <div className="p-8 md:p-10">
            <div className="text-xs font-semibold tracking-wider text-slate-500">FILL COMMERCE</div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-slate-600">Accede para gestionar productos y clientes.</p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block">
                <div className="mb-1 text-sm font-medium text-slate-700">Usuario</div>
                <input
                  className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="tu.usuario"
                />
              </label>

              <label className="block">
                <div className="mb-1 text-sm font-medium text-slate-700">Contraseña</div>
                <input
                  className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  type="password"
                />
              </label>

              {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

              <button
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canSubmit || loading}
                type="submit"
              >
                {loading ? 'Validando…' : 'Entrar'}
              </button>

              <div className="text-xs text-slate-500">
                Tip: si tu backend requiere <b>appName</b>, se usa <code>PRUEBAS</code> por defecto.
              </div>
            </form>
          </div>

          <div className="hidden items-center justify-center bg-slate-900 p-10 text-white md:flex">
            <div>
              <div className="text-xl font-semibold">Cliente</div>
              <div className="mt-2 text-sm text-white/80">
                Arquitectura limpia: <code>/components</code>, <code>/hooks</code>, <code>/services</code>, <code>/views</code>.
              </div>
              <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm text-white/90">
                Incluye Lazy Loading, Loaders y manejo de errores en consumo de API REST.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
