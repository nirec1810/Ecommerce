import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../common/Loader'
import ErrorState from '../common/ErrorState'
import type { Customer } from './customer-types'
import { getCustomer } from './customer-service'

export default function CustomerProfile() {
  const { id } = useParams()
  const [item, setItem] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await getCustomer(id)
      setItem(data)
    } catch (e: any) {
      setError(String(e?.message || 'Error'))
      setItem(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [id])

  if (loading) return <Loader label="Cargando perfil..." />
  if (error) return <ErrorState title="No se pudo cargar el cliente" message={error} onRetry={load} />
  if (!item) return <ErrorState title="Cliente no encontrado" />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Perfil del cliente</h2>
          <p className="mt-1 text-sm text-slate-600">GET: <code>/api/v1/customers/{item.id}</code></p>
        </div>
        <Link
          to={`/customers/${item.id}/edit`}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Editar
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Datos personales</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <Row label="Nombre" value={item.name} />
            <Row label="Email" value={item.email} />
            <Row label="Teléfono" value={item.phone || '—'} />
            <Row label="Dirección" value={item.address || '—'} />
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Datos tributarios / cliente</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <Row label="Customer Code" value={item.customerCode} />
            <Row label="Tax ID" value={item.taxId} />
            <Row label="Tax ID Type" value={item.taxIdType} />
            <Row label="Customer Type" value={item.customerType} />
            <Row label="Activo" value={item.active ? 'Sí' : 'No'} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b pb-2 last:border-b-0 last:pb-0">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-right font-medium text-slate-900">{value}</div>
    </div>
  )
}
