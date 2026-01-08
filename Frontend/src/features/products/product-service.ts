import { api, apiFetchJson } from '../../services/api'
import type { Product } from './product-types'

export async function listProducts(): Promise<Product[]> {
  // axios para listas
  const res = await api.get<Product[]>('/api/v1/products')
  return res.data
}

export async function getProduct(id: string | number): Promise<Product> {
  return apiFetchJson<Product>(`/api/v1/products/${id}`)
}
