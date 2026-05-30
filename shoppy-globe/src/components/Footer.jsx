// components/Footer.jsx
// Site-wide footer with links, social icons, newsletter signup, and copyright
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer
      className="bg-slate-900 mt-auto"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
                <img src="/favicon.png" alt="Shoppy Globe Logo" className="w-6 h-6" />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-[200px]">
              Your one-stop shop for everything. Great products, great prices, delivered fast.
            </p>
            
          </div>

          {/* Shop links */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Shop</p>
            <ul className="flex flex-col gap-2.5">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Deals'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/50 hover:text-orange-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Account</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'My Cart', to: '/cart' },
                { label: 'Checkout', to: '/checkout' },
                { label: 'Order History', to: '/' },
                { label: 'Wishlist', to: '/' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/50 hover:text-orange-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

         
        </div>
      </div>


      
    </footer>
  )
}

export default Footer