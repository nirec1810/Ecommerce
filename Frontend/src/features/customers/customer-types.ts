export type Customer = {
  id: number
  name: string
  email: string
  phone?: string | null
  address?: string | null
  customerCode: string
  taxId: string
  taxIdType: string
  customerType: string
  active: boolean
}
