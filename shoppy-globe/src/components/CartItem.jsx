// Displays a single item in the cart with quantity controls and remove button
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { removeFromCart, updateQuantity } from '../store/cartSlice'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  // Decrement quantity (min 1)
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }

  // Increment quantity
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  // Remove item from cart
  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">

      {/* Product thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 object-contain rounded-lg bg-slate-50 shrink-0"
      />

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-800 line-clamp-2">{item.title}</h4>
        <p className="text-orange-500 font-bold text-sm mt-0.5">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-orange-400 hover:text-orange-500 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <span className="text-sm font-bold text-slate-800 shrink-0 w-16 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="shrink-0 text-slate-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
}

export default CartItem