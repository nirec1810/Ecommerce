import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../common/Loader'
import ErrorState from '../common/ErrorState'
import type { Customer } from './customer-types'
import { getCustomer, updateCustomer } from './customer-service'

export default function CustomerEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState<Customer | null>(null)
  const [form, setForm] = useState<Partial<Customer>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const load = async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await getCustomer(id)
      setItem(data)
      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        taxId: data.taxId,
        taxIdType: data.taxIdType,
        customerType: data.customerType,
        active: data.active,
      })
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

  const canSave = useMemo(() => {
    return !!form.name && !!form.email && !!form.taxId && !!form.taxIdType && !saving
  }, [form, saving])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    setSaved(null)
    setSaving(true)
    setError(null)
    try {
      await updateCustomer(id, form)
      setSaved('Datos actualizados correctamente.')
      setTimeout(() => navigate(`/customers/${id}`), 650)
    } catch (e: any) {
      setError(String(e?.message || 'Error'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader label="Cargando formulario..." />
  if (error && !item) return <ErrorState title="No se pudo cargar el cliente" message={error} onRetry={load} />
  if (!item) return <ErrorState title="Cliente no encontrado" />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Actualizar cliente</h2>
          <p className="mt-1 text-sm text-slate-600">PUT: <code>/api/v1/customers/{item.id}</code></p>
        </div>
        <Link to={`/customers/${item.id}`} className="text-sm font-medium text-slate-700 hover:underline">
          ← Volver
        </Link>
      </div>

      <form onSubmit={onSubmit} className="rounded-3xl border bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nombre">
            <input className={inputCls} value={form.name ?? ''} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          </Field>

          <Field label="Email">
            <input className={inputCls} value={form.email ?? ''} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
          </Field>

          <Field label="Teléfono">
            <input className={inputCls} value={form.phone ?? ''} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
          </Field>

          <Field label="Dirección">
            <input className={inputCls} value={form.address ?? ''} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
          </Field>

          <Field label="Tax ID">
            <input className={inputCls} value={form.taxId ?? ''} onChange={(e) => setForm((s) => ({ ...s, taxId: e.target.value }))} />
          </Field>

          <Field label="Tax ID Type">
            <select className={inputCls} value={form.taxIdType ?? ''} onChange={(e) => setForm((s) => ({ ...s, taxIdType: e.target.value }))}>
              <option value="">Selecciona…</option>
              <option value="CEDULA">CEDULA</option>
              <option value="RUC">RUC</option>
              <option value="PASSPORT">PASSPORT</option>
            </select>
          </Field>

          <Field label="Customer Type">
            <select className={inputCls} value={form.customerType ?? ''} onChange={(e) => setForm((s) => ({ ...s, customerType: e.target.value }))}>
              <option value="REGULAR">REGULAR</option>
              <option value="VIP">VIP</option>
              <option value="WHOLESALE">WHOLESALE</option>
            </select>
          </Field>

          <Field label="Activo">
            <select className={inputCls} value={String(form.active ?? true)} onChange={(e) => setForm((s) => ({ ...s, active: e.target.value === 'true' }))}>
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </Field>
        </div>

        {error && <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
        {saved && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{saved}</div>}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

const inputCls =
  'w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/10'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </label>
  )
}
