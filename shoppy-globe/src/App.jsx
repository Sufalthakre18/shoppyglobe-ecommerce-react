import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header'

// Lazy-loaded pages for code splitting (performance optimization)

const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback shown while lazy components load
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] flex-col gap-4">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-slate-400 text-sm">Loading...</p>
  </div>
)

// Root layout - wraps all routes with Header
const RootLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </div>
)

// createBrowserRouter - modern data router with better features than BrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        // Dynamic route with :id param for product detail
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        // Catch-all route for 404
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App