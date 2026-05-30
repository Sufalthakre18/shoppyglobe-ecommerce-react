
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
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero Section */}
      <div className="text-center mb-14">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Shop <span className="text-orange-500">Everything</span>
        </h1>

        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Discover thoughtfully selected products at competitive prices.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.06)]">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />

          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-5">
          <div className="w-12 h-12 border-[3px] border-slate-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-500">
            Loading products...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-3xl p-10 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">

            <div className="text-6xl mb-5">⚠️</div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Failed to load products
            </h2>

            <p className="text-slate-500">
              {error}
            </p>

            <p className="text-sm text-slate-400 mt-3">
              Please check your internet connection and try again.
            </p>

          </div>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-slate-500">
              {searchQuery
                ? `${filteredProducts.length} result${
                    filteredProducts.length !== 1 ? 's' : ''
                  } for "${searchQuery}"`
                : `${filteredProducts.length} products`}
            </p>
          </div>

          {/* Empty Search State */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">

              <div className="bg-white/70 backdrop-blur-md border border-slate-200/70 rounded-3xl p-10 max-w-lg mx-auto shadow-[0_10px_40px_rgba(15,23,42,0.06)]">

                <div className="text-6xl mb-5">🔍</div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  No products found
                </h2>

                <p className="text-slate-500">
                  Try searching with different keywords or categories.
                </p>

              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )}
        </>
      )}
    </main>
  )
}

export default ProductList

