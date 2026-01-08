import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'
import clsx from 'clsx'

const navItem = (isActive: boolean) =>
  clsx(
    'rounded-xl px-3 py-2 text-sm font-medium',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
  )

export default function Shell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/products" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white font-semibold">E</div>
            <div>
              <div className="text-sm font-semibold leading-4 text-slate-900">Ecommerce</div>
              <div className="text-xs text-slate-500">Products & Customers</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden text-right md:block">
              <div className="text-xs font-medium text-slate-900">{user?.username ?? 'Usuario'}</div>
              <div className="text-[11px] text-slate-500">{user?.email ?? ''}</div>
            </div>
            <button
              className="rounded-xl border bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
              type="button"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border bg-white p-3">
          <nav className="flex flex-col gap-1">
            <NavLink to="/products" className={({ isActive }) => navItem(isActive)}>
              Productos
            </NavLink>
            <NavLink to="/customers/1" className={({ isActive }) => navItem(isActive)}>
              Cliente (demo id=1)
            </NavLink>
          </nav>
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
            Cambia el ID del cliente en la URL: <code>/customers/2</code>
          </div>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
