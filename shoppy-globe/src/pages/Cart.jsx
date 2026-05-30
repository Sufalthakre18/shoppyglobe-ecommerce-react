// Displays all cart items with a summary of totals and checkout link
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../store/cartSlice'
import CartItem from '../components/CartItem'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          to="/"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          Start Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Cart items list */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-sm text-slate-500">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</p>
          {/* Unique key for each CartItem */}
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-slate-800 text-lg mb-4">Order Summary</h2>

            {/* Item breakdown */}
            <div className="flex flex-col gap-2 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600 line-clamp-1 flex-1 mr-2">{item.title} × {item.quantity}</span>
                  <span className="font-medium shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="text-xl font-bold text-orange-500">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/"
              className="block w-full text-center text-sm text-slate-500 mt-3 hover:text-orange-500 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Cart