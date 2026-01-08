import React from 'react'

export default function Loader({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="flex items-center gap-3 text-slate-700">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  )
}
