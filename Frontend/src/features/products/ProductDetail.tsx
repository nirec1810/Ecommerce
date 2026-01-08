import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../common/Loader'
import ErrorState from '../common/ErrorState'
import { getProduct } from './product-service'
import type { Product } from './product-types'

export default function ProductDetail() {
  const { id } = useParams()
  const [item, setItem] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await getProduct(id)
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

  if (loading) return <Loader label="Cargando detalle..." />
  if (error) return <ErrorState title="No se pudo cargar el producto" message={error} onRetry={load} />
  if (!item) return <ErrorState title="Producto no encontrado" />

  const price = typeof item.price === 'number' ? item.price : Number(item.price)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/products" className="text-sm font-medium text-slate-700 hover:underline">
          ← Volver al catálogo
        </Link>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">ID: {item.id}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded-3xl border bg-white">
          <div className="h-56 bg-slate-100">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-xs text-slate-500">Sin imagen</div>
            )}
          </div>
          <div className="p-4">
            <div className="text-lg font-semibold text-slate-900">{item.name}</div>
            <div className="mt-1 text-sm text-slate-600">{item.sku} • {item.category}</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">${price.toFixed(2)}</div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className={'rounded-full px-2 py-1 ' + (item.active ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800')}>
                {item.active ? 'Activo' : 'Inactivo'}
              </span>
              <span className="rounded-full bg-slate-50 px-2 py-1 text-slate-700">{item.status}</span>
              <span className="rounded-full bg-slate-50 px-2 py-1 text-slate-700">Stock: {item.stock}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Detalle técnico</div>
          <div className="mt-2 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            <div><div className="text-xs text-slate-500">SKU</div><div className="font-medium">{item.sku}</div></div>
            <div><div className="text-xs text-slate-500">Categoría</div><div className="font-medium">{item.category}</div></div>
            <div><div className="text-xs text-slate-500">Estado</div><div className="font-medium">{item.status}</div></div>
            <div><div className="text-xs text-slate-500">Activo</div><div className="font-medium">{item.active ? 'Sí' : 'No'}</div></div>
            <div><div className="text-xs text-slate-500">Stock</div><div className="font-medium">{item.stock}</div></div>
            <div><div className="text-xs text-slate-500">Precio</div><div className="font-medium">${price.toFixed(2)}</div></div>
          </div>

          <div className="mt-5 text-xs font-semibold text-slate-900">Descripción</div>
          <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">{item.description || '—'}</p>
        </div>
      </div>
    </div>
  )
}
