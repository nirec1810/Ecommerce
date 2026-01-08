import { apiFetchJson } from '../../services/api'
import type { Customer } from './customer-types'

export async function getCustomer(id: string | number): Promise<Customer> {
  return apiFetchJson<Customer>(`/api/v1/customers/${id}`)
}

export async function updateCustomer(id: string | number, payload: Partial<Customer>): Promise<Customer> {
  return apiFetchJson<Customer>(`/api/v1/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
