// Custom hook to fetch product list from dummyjson API
import { useState, useEffect } from 'react'

const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://dummyjson.com/products?limit=30')
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export default useFetchProducts