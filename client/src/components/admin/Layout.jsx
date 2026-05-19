import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, ShoppingBag, LogOut, Scissors, Menu, X } from 'lucide-react'

import ToastContainer from './ToastContainer'
import NotificationBell from './NotificationBell'
import { useAuth } from '../../store/useAuth'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products Review', path: '/admin/products', icon: ShoppingBag },
    { name: 'Sellers Directory', path: '/admin/sellers', icon: Users },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F4EDE6] to-[#EBE2D7] text-walnut overflow-hidden relative font-sans transition-colors duration-300">
      <ToastContainer />
      {/* Decorative ambient gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-terracotta/10 blur-[120px] pointer-events-none transition-all duration-300"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-walnut/10 blur-[120px] pointer-events-none transition-all duration-300"></div>

      {/* Mobile Top Header */}
      <header className="flex h-16 items-center justify-between border-b border-sand/30 bg-white/80 backdrop-blur-xl px-4 md:hidden fixed top-0 w-full z-30 transition-colors duration-300">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4e1a12] to-[#270c08] text-[#dfa85c] shadow-md">
            <Scissors size={16} className="rotate-90" />
          </span>
          <span className="block text-sm font-serif font-extrabold tracking-tight text-walnut transition-colors duration-300">The Tannery India</span>
          <span className="inline-flex items-center gap-1 rounded bg-[#dfa85c]/10 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#dfa85c] border border-[#dfa85c]/20 transition-colors duration-300">
            Admin
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sand/40 bg-white text-walnut hover:bg-sand/10 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-walnut/30 backdrop-blur-md md:hidden transition-opacity duration-300"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`w-64 border-r border-sand/40 bg-white/60 backdrop-blur-3xl flex flex-col z-50 md:z-10 shadow-[4px_0_24px_rgba(62,58,53,0.04)] fixed md:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out transition-colors`}
      >
        <div className="p-6 border-b border-sand/30 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4e1a12] to-[#270c08] text-[#dfa85c] shadow-lg">
              <Scissors size={20} className="rotate-90" />
            </span>
            <div>
              <h1 className="text-lg font-serif font-extrabold tracking-tight text-walnut leading-tight transition-colors duration-300">The Tannery</h1>
              <span className="inline-flex items-center gap-1 rounded bg-[#dfa85c]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#9c6a46] border border-[#dfa85c]/20 transition-colors duration-300">
                Admin HQ
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sand/10 text-walnut/70 transition-colors duration-300"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-sm text-terracotta border border-sand/50'
                    : 'text-walnut/60 hover:bg-white/50 hover:text-walnut border border-transparent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={16} className={isActive ? 'text-terracotta' : 'text-walnut/40'} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sand/30 flex flex-col gap-3 transition-colors duration-300">
          <div className="flex items-center justify-between gap-3 px-2 py-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/50 border border-sand/60 text-walnut font-bold uppercase transition-colors duration-300">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-extrabold text-walnut truncate leading-none transition-colors duration-300">Admin User</p>
                <p className="text-[9px] font-black text-[#9c6a46] uppercase tracking-widest mt-1">Superuser</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-3 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-all shadow-sm border border-rose-100"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-16 md:pt-0 relative z-10">
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
