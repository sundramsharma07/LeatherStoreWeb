import { useState } from 'react'
import { Navigate, Outlet, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Store, Search, User } from 'lucide-react'
import { useCart } from './store/useCart'
import { useAuth } from './store/useAuth'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ToastContainer from './components/ToastContainer'
import NotificationBell from './components/NotificationBell'
import Notifications from './pages/Notifications'

// Seller Imports
import SellerDashboard from './pages/seller/Dashboard'
import SellerUploadProduct from './pages/seller/UploadProduct'
import SellerBaseProducts from './pages/seller/BaseProducts'
import SellerAIDesignStudio from './pages/seller/AIDesignStudio'
import SellerDesignsGallery from './pages/seller/DesignsGallery'
import SellerSales from './pages/seller/Sales'
import SellerAccount from './pages/seller/Account'
import SellerNotifications from './pages/seller/Notifications'
import SellerSidebar from './components/seller/Sidebar'

// Admin Imports
import AdminLayout from './components/admin/Layout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminSellers from './pages/admin/Sellers'
import AdminSellerDesigns from './pages/admin/SellerDesigns'
import AdminNotifications from './pages/admin/Notifications'
import AdminLogin from './pages/admin/Login'



function AppShell() {
  const itemCount = useCart(state => state.getItemCount())
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-walnut font-sans relative">
      <ToastContainer />
      
      {/* Sleek, Premium Unified Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#eae1d8]/90 backdrop-blur-md border-b border-sand/35 py-3.5 px-4 md:px-8 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Original Elegant Brand Logo Box */}
          <Link to={user && user.role === 'client' ? "/store" : "/"} className="flex items-center gap-2 group transition-transform duration-300 hover:scale-102">
            <div className="relative border-2 border-double border-walnut py-1.5 px-6 rounded-md text-center shadow-sm select-none bg-white/95">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-walnut"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-walnut"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-walnut"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-walnut"></div>
              
              <div className="text-[9px] uppercase font-serif italic tracking-[0.15em] text-terracotta font-bold leading-tight">
                In Trend
              </div>
              <div className="text-[17px] uppercase font-serif font-extrabold tracking-[0.2em] text-walnut mt-0.5 leading-none transition-colors duration-300 group-hover:text-terracotta">
                The Tannery India
              </div>
            </div>
          </Link>

          {/* Center: Main Nav Links (Centered & Spacious) */}
          <nav className="hidden lg:flex items-center gap-x-5 text-[10px] font-extrabold uppercase tracking-widest text-walnut/85">
            <Link to={user && user.role === 'client' ? "/store" : "/"} className={`relative py-1.5 transition-colors hover:text-terracotta ${location.pathname === '/' || location.pathname === '/store' ? 'text-terracotta' : ''}`}>
              Home
              {(location.pathname === '/' || location.pathname === '/store') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta rounded-full animate-in fade-in zoom-in duration-300" />}
            </Link>
            <a href="#categories" className="hover:text-terracotta transition-colors py-1.5">Categories</a>
            <a href="#products" className="hover:text-terracotta transition-colors py-1.5">Products</a>

            <a href="#gallery" className="hover:text-terracotta transition-colors py-1.5">Gallery</a>
            <Link to="/contact" className={`relative py-1.5 transition-colors hover:text-terracotta ${location.pathname === '/contact' ? 'text-terracotta' : ''}`}>
              Contact
              {location.pathname === '/contact' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta rounded-full animate-in fade-in zoom-in duration-300" />}
            </Link>
          </nav>

          {/* Right side Actions: Compact Search + Cart + Unified Login */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar (Visible only to authenticated clients) */}
            {user && user.role === 'client' && (
              <div className="hidden md:flex items-center shadow-inner rounded-full overflow-hidden border border-sand/40 focus-within:border-walnut bg-ivory/20 px-2 py-1 transition-colors">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-walnut px-2.5 py-1 text-[11px] font-semibold outline-none placeholder:text-walnut/30 w-36 focus:w-48 transition-all duration-300"
                />
                <Search size={12} className="text-walnut/50 mr-1.5" />
              </div>
            )}

            {/* Notification Bell & Shopping Cart */}
            {user && user.role === 'client' ? (
              <div className="flex items-center gap-2.5">
                <NotificationBell />
                <Link to="/cart" className="relative p-2 rounded-full border border-[#5c3a21]/20 hover:border-[#5c3a21] text-walnut transition-all flex items-center justify-center bg-white shadow-sm hover:scale-105 duration-200">
                  <ShoppingCart size={14} className="text-[#5c3a21]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[8px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-white animate-in zoom-in duration-300">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : null}

            {/* Unified Small Login Action with Micro-Animation Hover Effect */}
            {user ? (
              <div className="flex items-center gap-2 border-l border-sand/30 pl-3">
                <div className="text-right leading-none hidden sm:block">
                  <p className="text-[10px] font-bold text-walnut">{user.name.split(' ')[0]}</p>
                  <p className="text-[8px] font-semibold text-walnut/40 uppercase tracking-wider">{user.role}</p>
                </div>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="px-3 py-1.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold uppercase transition-all duration-300 text-[9px] hover:scale-105 active:scale-95 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="relative overflow-hidden px-4.5 py-2 rounded-full bg-[#5c3a21] hover:bg-[#4b301c] text-white text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-1 group cursor-pointer"
              >
                {/* Micro shine effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <User size={11} className="transition-transform group-hover:translate-x-0.5 duration-200" />
                <span>Log In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile secondary nav links (Horizontal scroll for smaller viewports) */}
        <div className="lg:hidden mt-3 pt-2 border-t border-[#eae1d8]/30 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-x-4 text-[9px] font-extrabold uppercase tracking-widest text-walnut/75">
          <Link to={user && user.role === 'client' ? "/store" : "/"} className={`pb-1 ${location.pathname === '/' || location.pathname === '/store' ? 'text-terracotta border-b border-terracotta' : ''}`}>Home</Link>
          <a href="#categories" className="pb-1">Categories</a>
          <a href="#products" className="pb-1">Products</a>

          <a href="#gallery" className="pb-1">Gallery</a>
          <Link to="/contact" className={`pb-1 ${location.pathname === '/contact' ? 'text-terracotta border-b border-terracotta' : ''}`}>Contact</Link>
        </div>
      </header>

      {/* Main Content Layout Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer Element */}
      <footer className="bg-walnut text-ivory border-t border-sand/35 py-12 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3 text-xs font-semibold text-ivory/60 leading-relaxed">
          <div className="space-y-4">
            <Link to={user && user.role === 'client' ? "/store" : "/"} className="flex items-center gap-2 hover:opacity-90 transition-opacity text-ivory">
              <div className="h-8 w-8 bg-ivory text-walnut rounded-lg flex items-center justify-center border border-white/10">
                <Store size={15} />
              </div>
              <span className="text-sm font-serif font-extrabold tracking-tight text-white uppercase">The Tannery India</span>
            </Link>
            <p className="max-w-xs text-[11px]">
              Beautiful wallets, bags & jackets with custom prints. Created by verified partner sellers and delivered safely across India.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Quick Links</h4>
            <div className="flex flex-col gap-2 font-semibold">
              <Link to={user && user.role === 'client' ? "/store" : "/"} className="hover:text-white transition-colors">Products Catalog</Link>

              <Link to="/contact" className="hover:text-white transition-colors">Customer Support</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[10px]">Stripe Escrow Security</h4>
            <p className="text-[11px] leading-relaxed">
              We process all card transactions safely using Stripe. Your money is secured until the product is successfully delivered to your address.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-[10px] text-ivory/40 font-semibold">
          © {new Date().getFullYear()} The Tannery India. All rights reserved. Secure payment via Stripe.
        </div>
      </footer>
    </div>
  )
}

function SellerAppShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-dvh min-h-[560px] min-w-0 bg-ivory overflow-hidden relative font-sans">
      <ToastContainer />
      <SellerSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((value) => !value)}
      />
      <div className="flex-1 min-w-0 overflow-auto pt-16 md:pt-0 relative">
        <main className="w-full max-w-[90rem] mx-auto p-3 sm:p-4 md:p-6 xl:p-8 scroll-pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SellerProtectedRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'seller') {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

function AdminProtectedRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }
  return <Outlet />
}

function CustomerProtectedRoute() {
  const { user } = useAuth()
  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
export default function App() {
  return (
    <Routes>
      {/* Standalone Guest Landing Page (No global customer navbar) */}
      <Route path="/" element={<Landing />} />

      {/* Client / Customer storefront routes inside AppShell */}
      <Route element={<AppShell />}>

        <Route path="/contact" element={<Contact />} />
        
        {/* Protected Shopper pages */}
        <Route element={<CustomerProtectedRoute />}>
          <Route path="/store" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notification" element={<Notifications />} />
        </Route>
      </Route>

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />


      {/* Seller routes */}
      <Route element={<SellerProtectedRoute />}>
        <Route element={<SellerAppShell />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/upload" element={<SellerUploadProduct />} />
          <Route path="/seller/products" element={<SellerBaseProducts />} />
          <Route path="/seller/studio" element={<SellerAIDesignStudio />} />
          <Route path="/seller/designs" element={<SellerDesignsGallery />} />
          <Route path="/seller/sales" element={<SellerSales />} />
          <Route path="/seller/account" element={<SellerAccount />} />
          <Route path="/seller/notifications" element={<SellerNotifications />} />
          <Route path="/seller/notification" element={<SellerNotifications />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/sellers/:id/designs" element={<AdminSellerDesigns />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/notification" element={<AdminNotifications />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
