// Navigation header with logo, links, and cart icon with item count badge
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../store/cartSlice'

const Header = () => {
  const cartCount = useSelector(selectCartCount)
  const location = useLocation()

  // Helper to apply active nav styles
  const navClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      location.pathname === path
        ? 'text-orange-500'
        : 'text-slate-600 hover:text-orange-500'
    }`

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 border-b border-white/30 shadow-[0_8px_32px_rgba(15,23,42,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-8 bg-transparent rounded-lg flex items-center justify-center">
              <img src="/public/favicon.png" alt="" />
            </div>
            <span className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Syne, sans-serif' }}>
              ShoppyGlobe
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className={navClass('/')}>Home</Link>
            <Link to="/cart" className={navClass('/cart')}>Cart</Link>
            <Link to="/checkout" className={navClass('/checkout')}>Checkout</Link>
          </nav>

          {/* Cart icon with badge */}
          <Link to="/cart" className="relative p-2 text-slate-700 hover:text-orange-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span key={cartCount} className="badge-bounce absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Mobile nav */}
      <nav className="sm:hidden flex items-center gap-4 px-4 pb-2">
        <Link to="/" className={navClass('/')}>Home</Link>
        <Link to="/cart" className={navClass('/cart')}>Cart</Link>
        <Link to="/checkout" className={navClass('/checkout')}>Checkout</Link>
      </nav>
    </header>
  )
}

export default Header