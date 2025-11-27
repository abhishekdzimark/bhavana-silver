import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import SearchResultsPage from './pages/SearchResultsPage'
import ShipNowPage from './pages/ShipNowPage'
import AboutUsPage from './pages/AboutUsPage'
import './App.css'
const Account = () => <div style={{ padding: '40px', textAlign: 'center' }}><h1>My Account</h1><p>Manage your account and orders.</p></div>
const Wishlist = () => <div style={{ padding: '40px', textAlign: 'center' }}><h1>My Wishlist</h1><p>Your favorite items saved for later.</p></div>
const Cart = () => <div style={{ padding: '40px', textAlign: 'center' }}><h1>Shopping Cart</h1><p>Review your items and proceed to checkout.</p></div>

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/collection/:collection" element={<CategoryPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/:stone" element={<CategoryPage />} />
        <Route path="/gold-jewelry" element={<CategoryPage />} />
        <Route path="/gold-jewelry/*" element={<CategoryPage />} />
        <Route path="/silver-jewelry" element={<CategoryPage />} />
        <Route path="/silver-jewelry/*" element={<CategoryPage />} />
        <Route path="/fashion-jewelry" element={<CategoryPage />} />
        <Route path="/fashion-jewelry/*" element={<CategoryPage />} />
        <Route path="/ship-now" element={<ShipNowPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
