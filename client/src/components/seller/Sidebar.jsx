import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'
import NotificationBell from './NotificationBell'
import {
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Scissors,
  Upload,
  WandSparkles,
  X,
  DollarSign,
  User,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const links = [
  { to: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/seller/upload', label: 'Upload Template', icon: Upload },
  { to: '/seller/products', label: 'Base Materials', icon: Package },
  { to: '/seller/studio', label: 'Design Studio', icon: WandSparkles },
  { to: '/seller/designs', label: 'Designs Gallery', icon: Images },
  { to: '/seller/sales', label: 'Sales Records', icon: DollarSign },
  { to: '/seller/account', label: 'My Account', icon: User },
]

export default function Sidebar({ isCollapsed = false, onToggleCollapsed }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) => [
    `flex items-center ${isCollapsed ? 'gap-3 px-3 md:justify-center md:gap-0 md:px-2' : 'gap-3 px-3'} py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200`,
    isActive
      ? `bg-walnut text-white shadow-sm shadow-walnut/20 ${isCollapsed ? 'md:translate-x-0' : 'translate-x-1'}`
      : 'text-walnut/70 hover:bg-sand/20 hover:text-walnut',
  ].join(' ')

  return (
    <>
      {/* Mobile Top Header */}
      <header className="flex h-16 items-center justify-between border-b border-sand/30 bg-white/90 backdrop-blur-md px-4 md:hidden fixed top-0 w-full z-30">
        <NavLink to="/seller/dashboard" className="flex items-center gap-2 text-walnut">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-walnut text-white shadow-md">
            <Scissors size={16} className="rotate-90 text-sand" />
          </span>
          <span className="block text-sm font-serif font-extrabold tracking-tight">The Tannery India</span>
        </NavLink>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sand bg-white text-walnut hover:bg-sand/10"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-walnut/30 backdrop-blur-sm md:hidden transition-opacity duration-300"
        ></div>
      )}

      {/* Sidebar Panel Container */}
      <aside
        className={`${isCollapsed ? 'md:w-16' : 'md:w-64'} w-64 flex-shrink-0 border-r border-sand/40 bg-white/95 backdrop-blur-md md:bg-white/70 flex flex-col z-50 md:z-10 shadow-sm fixed md:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-[width,transform] duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className={`${isCollapsed ? 'p-4 md:p-3' : 'p-4'} border-b border-sand/30 flex items-center gap-2`}>
          {/* Desktop collapse/expand toggle — only shows chevron arrow, never hamburger */}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={`hidden md:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-sand/50 bg-white/80 text-walnut/60 hover:bg-sand/20 hover:text-walnut transition-all duration-200 ${isCollapsed ? '' : 'mr-1'}`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <NavLink to="/seller/dashboard" className={`flex items-center ${isCollapsed ? 'gap-3 md:hidden' : 'gap-3'} min-w-0 text-walnut group flex-1`}>
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-walnut text-white shadow-md transition-transform group-hover:scale-105">
              <Scissors size={20} className="rotate-90 text-sand" />
            </span>
            <div className={`${isCollapsed ? 'md:hidden' : ''} min-w-0`}>
              <span className="block text-sm font-serif font-extrabold tracking-tight text-walnut leading-none">The Tannery India</span>
              <span className="inline-flex items-center gap-1 rounded bg-terracotta/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-terracotta border border-terracotta/20 mt-1.5">
                Seller Studio
              </span>
            </div>
          </NavLink>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sand/15 text-walnut/70"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className={`${isCollapsed ? 'md:px-2' : 'p-4'} flex-1 p-4 space-y-1.5 overflow-y-auto`}>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setIsOpen(false)}
                title={isCollapsed ? link.label : undefined}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className={`${isCollapsed ? 'md:hidden' : ''} truncate`}>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* User Block & Logout */}
        <div className={`${isCollapsed ? 'md:p-3' : 'p-4'} p-4 border-t border-sand/30 flex flex-col gap-3`}>
          <div className={`flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'} gap-3 px-2 py-1`}>
            <div className={`flex items-center ${isCollapsed ? 'md:justify-center' : 'gap-3'} min-w-0`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand/20 border border-sand/40 text-walnut font-semibold uppercase">
                {user?.name?.[0] || 'S'}
              </div>
              <div className={`${isCollapsed ? 'md:hidden' : ''} min-w-0 flex-1`}>
                <p className="text-xs font-semibold text-walnut truncate leading-none">{user?.name}</p>
                <p className="text-[10px] font-semibold text-terracotta uppercase tracking-widest mt-1">Merchant</p>
              </div>
            </div>
            <div className={isCollapsed ? 'md:hidden' : ''}>
              <NotificationBell />
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center ${isCollapsed ? 'md:justify-center md:gap-0 md:px-2' : 'gap-3 px-3'} py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200`}
            title={isCollapsed ? 'Log out' : undefined}
          >
            <LogOut size={16} className="flex-shrink-0" />
            <span className={isCollapsed ? 'md:hidden' : ''}>Log out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
