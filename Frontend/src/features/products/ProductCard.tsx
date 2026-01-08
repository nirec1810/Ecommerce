import React from 'react'
import type { Product } from './product-types'

export default function ProductCard({
  product,
  onOpen,
}: {
  product: Product
  onOpen: (id: number) => void
}) {
  const price = typeof product.price === 'number' ? product.price : Number(product.price)
  return (
    <button
      type="button"
      onClick={() => onOpen(product.id)}
      className="group flex w-full flex-col overflow-hidden rounded-3xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-36 bg-slate-100">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-xs text-slate-500">Sin imagen</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</div>
        <div className="mt-1 text-xs text-slate-500">{product.sku} • {product.category}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">${price.toFixed(2)}</div>
          <div className="rounded-xl bg-slate-100 px-2 py-1 text-xs text-slate-700">
            Stock: {product.stock}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-600 line-clamp-2">{product.description || '—'}</div>

        <div className="mt-4 flex items-center gap-2 text-[11px]">
          <span className={'rounded-full px-2 py-1 ' + (product.active ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800')}>
            {product.active ? 'Activo' : 'Inactivo'}
          </span>
          <span className="rounded-full bg-slate-50 px-2 py-1 text-slate-700">{product.status}</span>
        </div>
      </div>
    </button>
  )
}
