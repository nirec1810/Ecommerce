import React from 'react'

export default function ErrorState({
  title = 'Ocurrió un error',
  message,
  onRetry,
}: {
  title?: string
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900">
      <div className="font-semibold">{title}</div>
      {message && <div className="mt-1 text-sm opacity-90">{message}</div>}
      {onRetry && (
        <button
          className="mt-3 rounded-xl bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={onRetry}
          type="button"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
