// 404 page displayed for unknown routes
import { Link, useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Big 404 display */}
        <h1 className="text-9xl font-black text-orange-500 leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
          404
        </h1>

        <h2 className="text-2xl font-bold text-slate-800 mt-4 mb-3">
          Page Not Found
        </h2>

        {/* Error details */}
        <div className="bg-slate-100 rounded-xl p-4 text-left mb-6">
          <p className="text-sm text-slate-500 font-mono">
            <span className="text-red-500 font-semibold">Error 404:</span> The requested URL was not found on this server.
          </p>
          <p className="text-xs text-slate-400 mt-1 font-mono break-all">
            Path: <span className="text-slate-600">{location.pathname}</span>
          </p>
        </div>

        <p className="text-slate-500 text-sm mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-semibold hover:border-orange-400 hover:text-orange-500 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  )
}

export default NotFound