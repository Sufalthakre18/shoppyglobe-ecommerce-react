// Displays a single product card with image, title, price, rating, and Add to Cart button
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { addToCart, selectCartItems } from '../store/cartSlice'
import LazyImage from './LazyImage'

const ProductItem = ({ product }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  // Check if product is already in cart
  const inCart = cartItems.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigating when clicking Add to Cart
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* Product image - links to detail page */}
      <Link to={`/product/${product.id}`}>
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category badge */}
        <span className="text-xs text-orange-500 font-medium uppercase tracking-wide">
          {product.category}
        </span>

        {/* Product title - links to detail */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-orange-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-slate-500">{product.rating}</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              inCart
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
            }`}
          >
            {inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>

    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
}

export default ProductItem