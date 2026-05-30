import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Header from "./components/Header"
const RootLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Header />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    
  
  },
])

function App() {

  
  
return <RouterProvider router={router} />

}

export default App
