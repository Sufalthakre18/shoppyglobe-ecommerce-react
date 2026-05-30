// Checkout form with user details + cart summary
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  })

  // Update form field
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Place order: show confirmation, clear cart, redirect after delay
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    dispatch(clearCart())

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  // Order placed confirmation screen
  if (orderPlaced) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Order Placed!
          </h2>
          <p className="text-slate-500 mb-2">Thank you for your purchase. Your order is being processed.</p>
          <p className="text-sm text-slate-400">Redirecting you to home page in a few seconds...</p>
          <div className="mt-6">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </main>
    )
  }

  // Empty cart - redirect prompt
  if (cartItems.length === 0) {
    return (
      <main className="max-w-md mx-auto text-center py-20 px-4">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">No items to checkout</h2>
        <p className="text-slate-500 mb-6">Please add items to your cart first.</p>
        <Link to="/" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Go Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'Syne, sans-serif' }}>
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Checkout form */}
        <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col gap-6">

          {/* Personal info section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Shipping address section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main Street"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">City *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  placeholder="Jabalpur"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">ZIP Code *</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  placeholder="482001"
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Payment section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">Expiry (MM/YY) *</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-600">CVV *</label>
                <input
                  type="text"
                  name="cardCvv"
                  value={form.cardCvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  maxLength={4}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Place Order button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-base hover:bg-orange-600 active:scale-[0.99] transition-all shadow-lg shadow-orange-200"
          >
            Place Order · ${cartTotal.toFixed(2)}
          </button>

        </form>

        {/* Cart summary */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-slate-800 text-base mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-contain rounded-lg bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 line-clamp-2">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-xs font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between">
              <span className="font-semibold text-slate-700">Total</span>
              <span className="font-bold text-orange-500 text-lg">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Checkout