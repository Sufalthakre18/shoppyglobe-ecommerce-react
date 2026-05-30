# 🛍️ ShoppyGlobe — React E-Commerce Application

> A fully-featured e-commerce application built with React 19, Vite, Redux Toolkit, and Tailwind CSS v4.

---

## 🔗 GitHub Repository

**→ https://github.com/Sufalthakre18/shoppyglobe-ecommerce-react**

> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username before submission.

---

## 📸 Features

- 🔍 Search products by name or category (Redux state)
- 🛒 Add / remove products from cart
- ➕➖ Adjust cart item quantities (minimum 1 enforced)
- 📦 Product detail page with image gallery
- 💳 Checkout form → "Order Placed" → cart cleared → auto redirect
- 🚫 404 Not Found page for unknown routes
- 🖼️ Lazy loading images via IntersectionObserver
- ⚡ Code splitting via `React.lazy` + `Suspense` for all pages
- 📱 Fully responsive — mobile, tablet, desktop

---

## 🧰 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19.x | UI library |
| [Vite](https://vitejs.dev) | 8.x | Build tool & dev server |
| [React Router DOM](https://reactrouter.com) | 7.x | Client-side routing |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2.x | Global state management |
| [React Redux](https://react-redux.js.org) | 9.x | React bindings for Redux |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS framework |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | 4.x | Tailwind v4 Vite plugin |
| [PropTypes](https://www.npmjs.com/package/prop-types) | 15.x | Runtime prop validation |

**API:** [dummyjson.com/products](https://dummyjson.com/products)

---

## 📁 Project Structure

```
shoppyglobe/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky nav with logo, links, cart badge
│   │   ├── ProductItem.jsx     # Single product card with Add to Cart
│   │   ├── Footer.jsx     # Footer
│   │   ├── CartItem.jsx        # Single cart row with qty controls + remove
│   │   └── LazyImage.jsx       # IntersectionObserver lazy image loader
│   ├── pages/
│   │   ├── ProductList.jsx     # Home — search bar + product grid
│   │   ├── ProductDetail.jsx   # Dynamic product page (/product/:id)
│   │   ├── Cart.jsx            # Cart with order summary
│   │   ├── Checkout.jsx        # Form + order placement + redirect
│   │   └── NotFound.jsx        # 404 error page
│   ├── hooks/
│   │   └── useFetchProducts.js # Custom hook — fetches product list
│   ├── store/
│   │   ├── store.js            # Redux store configuration
│   │   ├── cartSlice.js        # Cart: actions, reducers, selectors
│   │   └── searchSlice.js      # Search query: actions, reducers, selectors
│   ├── App.jsx                 # createBrowserRouter + lazy loading setup
│   ├── main.jsx                # Entry point with Redux Provider
│   └── index.css               # Tailwind v4 (@import "tailwindcss")
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Sufalthakre18/shoppyglobe-ecommerce-react.git

# 2. Navigate into the project
cd shoppy-globe

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Routes

| Route | Component | Description |
|---|---|---|
| `/` | `ProductList` | Home page — product grid + search |
| `/product/:id` | `ProductDetail` | Single product detail (dynamic route) |
| `/cart` | `Cart` | Shopping cart with totals |
| `/checkout` | `Checkout` | Checkout form + order placement |
| `*` | `NotFound` | 404 page for unknown routes |

> Router is set up using `createBrowserRouter` from React Router v6 — the modern data router with better features than the traditional `BrowserRouter`.

---

## 🗂️ Redux State Structure

```js
{
  cart: {
    items: [
      { id, title, price, thumbnail, quantity }
    ]
  },
  search: {
    query: ""
  }
}
```

### Cart Actions
| Action | Description |
|---|---|
| `addToCart(product)` | Add product or increment quantity |
| `removeFromCart(id)` | Remove item completely |
| `updateQuantity({ id, quantity })` | Set quantity (min 1 enforced) |
| `clearCart()` | Empty cart (called after order placement) |

### Search Actions
| Action | Description |
|---|---|
| `setSearchQuery(query)` | Update search filter |
| `clearSearch()` | Reset search to empty string |


---

## 👨‍💻 Author

**SUFAL THAKRE**
- GitHub: [@SUFALTHAKRE18](https://github.com/Sufalthakre18)

---

*Submitted as part of React Project Assignment — ShoppyGlobe E-Commerce Application*