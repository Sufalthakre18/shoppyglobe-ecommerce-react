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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-3xl p-10 shadow-[0_10px_40px_rgba(15,23,42,0.06)] text-center">
          <div className="text-8xl mb-8 opacity-80">🛒</div>

          <h2
            className="text-3xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Your cart is empty
          </h2>

          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products yet. Explore our collection
            and find something you'll love.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Shopping Cart
        </h1>

        <p className="text-slate-500 mt-2">
          Review your items before proceeding to checkout.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-sm font-medium text-slate-500">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </p>

          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Order Summary */}
        <aside className="lg:w-80 shrink-0">
          <div className="sticky top-24 rounded-3xl border border-slate-200/70 bg-white/70 backdrop-blur-md p-7 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">

            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Order Summary
            </h2>

            {/* Items Breakdown */}
            <div className="flex flex-col gap-1">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-start py-2 text-sm"
                >
                  <span className="text-slate-600 line-clamp-1 flex-1 mr-3">
                    {item.title} × {item.quantity}
                  </span>

                  <span className="font-semibold text-slate-800 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 pt-5 mt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">
                  Total
                </span>

                <span className="text-2xl font-bold text-slate-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="block w-full text-center bg-slate-900 text-white py-3.5 rounded-2xl font-semibold transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="block text-center text-sm font-medium text-slate-500 mt-4 hover:text-slate-900 transition-colors"
            >
              Continue Shopping
            </Link>

          </div>
        </aside>

      </div>
    </main>
  )
}

export default Cart