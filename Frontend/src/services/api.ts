import axios from 'axios'
import { getApiBase, getAuthToken } from './storage'

export const api = axios.create({
  baseURL: getApiBase(),
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export async function apiFetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBase()
  const url = `${base}${path}`
  const token = getAuthToken()
  const headers = new Headers(init?.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(url, { ...init, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP_${res.status}:${text}`)
  }
  return (await res.json()) as T
}
