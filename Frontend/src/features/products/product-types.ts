export type Product = {
  id: number
  sku: string
  name: string
  description?: string
  price: number
  stock: number
  category: string
  status: string
  imageUrl?: string
  active: boolean
}
