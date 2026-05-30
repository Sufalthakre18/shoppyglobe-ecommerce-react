// Shows detailed info about a single product using route params
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems } from '../store/cartSlice'
import LazyImage from '../components/LazyImage'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const inCart = cartItems.some(item => item.id === product?.id)

  // Fetch product details when component mounts or id changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) {
          throw new Error(`Product not found (status ${response.status})`)
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] flex-col gap-4">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500">Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Link to="/" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>›</span>
        <span className="capitalize">{product.category}</span>
        <span>›</span>
        <span className="text-slate-800 font-medium line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image gallery */}
        <div className="flex flex-col gap-3">
          <LazyImage
            src={images[selectedImage]}
            alt={product.title}
            className="w-full h-80 rounded-2xl border border-slate-100"
          />
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-orange-500' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
            {product.title}
          </h1>

          {/* Rating + stock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
              ))}
              <span className="text-sm text-slate-500 ml-1">({product.rating})</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                -{product.discountPercentage.toFixed(0)}% OFF
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>

          {/* Extra info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {product.brand && (
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-slate-400 text-xs mb-0.5">Brand</p>
                <p className="font-medium text-slate-700">{product.brand}</p>
              </div>
            )}
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-0.5">SKU</p>
              <p className="font-medium text-slate-700">{product.sku || 'N/A'}</p>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                inCart
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-[0.98]'
              }`}
            >
              {inCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link
              to="/cart"
              className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-orange-400 hover:text-orange-500 transition-all"
            >
              View Cart
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}

export default ProductDetail