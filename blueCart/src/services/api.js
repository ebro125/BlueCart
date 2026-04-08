const BASE_URL = 'http://localhost:5000/api'

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  const data = await res.json()
  return data.products
}

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  const data = await res.json()
  return data
}

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`)
  const data = await res.json()
  return data.categories
}

export const searchProducts = async (query) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`)
  const data = await res.json()
  return data.products
}

export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`)
  const data = await res.json()
  return data.products
}

export const placeOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  const data = await res.json()
  return data
}