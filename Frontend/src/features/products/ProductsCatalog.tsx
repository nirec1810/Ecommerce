import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../common/Loader'
import ErrorState from '../common/ErrorState'
import ProductCard from './ProductCard'
import type { Product } from './product-types'
import { listProducts } from './product-service'

export default function ProductsCatalog() {
  const navigate = useNavigate()
  const [items, setItems] = useState<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!items) return []
    if (!query) return items
    return items.filter((p) => (p.name || '').toLowerCase().includes(query) || (p.sku || '').toLowerCase().includes(query))
  }, [items, q])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listProducts()
      setItems(data)
    } catch (e: any) {
      setError(String(e?.message || 'Error'))
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  if (loading) return <Loader label="Cargando catálogo..." />
  if (error) return <ErrorState title="No se pudo cargar productos" message={error} onRetry={load} />

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Catálogo de productos</h2>
          <p className="mt-1 text-sm text-slate-600">Consume: <code>/api/v1/products</code> con header JWT.</p>
        </div>
        <div className="w-full md:w-80">
          <input
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
            placeholder="Buscar por nombre o SKU…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border bg-white p-6 text-sm text-slate-600">No hay productos para mostrar.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={(id) => navigate(`/products/${id}`)} />
          ))}
        </div>
      )}
    </div>
  )
}
