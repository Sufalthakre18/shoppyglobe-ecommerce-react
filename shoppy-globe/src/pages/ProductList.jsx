// Home page - displays search bar and product grid
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, selectSearchQuery } from '../store/searchSlice'
import useFetchProducts from '../hooks/useFetchProducts'
import ProductItem from '../components/ProductItem'

const ProductList = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)
  const { products, loading, error } = useFetchProducts()

  // Filter products based on Redux search state (case-insensitive)
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Shop <span className="text-orange-500">Everything</span>
        </h1>
        <p className="text-slate-500 text-lg">Discover great products at great prices</p>
      </div>

      {/* Search bar - updates Redux state */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500">Loading products...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="max-w-md mx-auto text-center py-16">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Failed to load products</h2>
          <p className="text-slate-500 text-sm">{error}</p>
          <p className="text-slate-400 text-xs mt-2">Please check your internet connection and try again.</p>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && (
        <>
          {/* Results count */}
          <p className="text-sm text-slate-500 mb-4">
            {searchQuery
              ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `${filteredProducts.length} products`
            }
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">No products found</h2>
              <p className="text-slate-500 text-sm">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* Unique key for each product item */}
              {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

    </main>
  )
}

export default ProductList