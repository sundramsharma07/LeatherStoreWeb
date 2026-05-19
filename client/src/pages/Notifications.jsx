import { useEffect } from 'react'
import { useNotifications } from '../store/useNotifications'
import { useAuth } from '../store/useAuth'
import { Bell, Check, ShoppingBag, ShieldCheck, Sparkles, Info, ArrowLeft, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Notifications() {
  const { user } = useAuth()
  const { notifications, fetchNotifications, markAllAsRead, markAsRead, loading } = useNotifications()

  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user, fetchNotifications])

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 space-y-6 bg-gradient-to-br from-[#FAF7F2] via-[#F3ECE5] to-[#E5DACF] font-sans">
        <div className="h-16 w-16 bg-[#5c3a21]/10 rounded-full flex items-center justify-center text-[#5c3a21] border border-sand/35 animate-bounce">
          <Bell size={28} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-extrabold text-walnut uppercase tracking-wide">Please Sign In</h2>
          <p className="text-xs text-walnut/60 max-w-xs font-semibold leading-relaxed">
            Access your secure Notifications Hub to track live bespoke designs, order invoices, and admin approvals.
          </p>
        </div>
        <Link 
          to="/login" 
          className="px-8 py-3.5 rounded-full bg-walnut hover:bg-walnut/90 text-white font-extrabold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          Sign In Now
        </Link>
      </div>
    )
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const getIcon = (type) => {
    switch (type) {
      case 'purchase':
        return (
          <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
            <ShoppingBag size={18} />
          </div>
        )
      case 'approval':
        return (
          <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
            <ShieldCheck size={18} />
          </div>
        )
      case 'listing':
        return (
          <div className="h-10 w-10 rounded-xl bg-[#5c3a21]/15 border border-[#5c3a21]/30 flex items-center justify-center text-[#5c3a21] shadow-sm">
            <Sparkles size={18} />
          </div>
        )
      default:
        return (
          <div className="h-10 w-10 rounded-xl bg-sand/20 border border-sand/40 flex items-center justify-center text-walnut/60 shadow-sm">
            <Info size={18} />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F4EDE6] to-[#EBE2D7] font-sans pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 space-y-8 animate-in fade-in duration-500">
        
        {/* Top bar breadcrumb with custom transitions */}
        <div className="flex items-center justify-between">
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-[10px] font-extrabold text-walnut/50 hover:text-walnut transition-colors uppercase tracking-widest group cursor-pointer"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5 duration-200" /> 
            <span>Back to Storefront</span>
          </Link>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sand bg-white text-[9px] font-extrabold uppercase tracking-widest text-walnut hover:bg-sand/15 transition-all cursor-pointer shadow-sm hover:scale-[1.03] active:scale-[0.97]"
            >
              <Check size={11} className="text-terracotta" /> 
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Double-border Glassmorphic Hero header block */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-md p-8 md:p-10 border border-white/60 shadow-[0_20px_50px_rgba(78,26,18,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Ornate corner borders */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#dfa85c]/45"></div>
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-[#dfa85c]/45"></div>
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-[#dfa85c]/45"></div>
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#dfa85c]/45"></div>

          <div className="space-y-2 relative z-10">
            <span className="font-['Italianno'] text-3xl text-terracotta leading-none font-semibold block animate-pulse">
              Live Alerts Feed
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-walnut tracking-tight flex items-center gap-3">
              <Bell size={28} className="text-terracotta animate-pulse" />
              Notifications Hub
            </h1>
            <p className="text-xs text-walnut/60 font-semibold max-w-md leading-relaxed">
              Stay fully updated with real-time designer status modifications, local customer transactions, and premium hides listing approvals.
            </p>
          </div>

          <div className="h-fit px-5 py-3 rounded-2xl bg-[#5c3a21]/5 border border-sand/40 flex items-center gap-3 self-start md:self-center shadow-inner select-none">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="text-[10px] font-extrabold text-walnut uppercase tracking-widest">
              {unreadCount} Unread Alerts
            </span>
          </div>
        </div>

        {/* Live Notification Alert List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-sand border-t-terracotta"></div>
            </div>
          ) : notifications.length === 0 ? (
            
            /* Empty Feed View */
            <div className="p-16 text-center bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-[0_15px_40px_rgba(78,26,18,0.03)] space-y-4 max-w-xl mx-auto">
              <div className="h-12 w-12 bg-sand/15 rounded-full flex items-center justify-center mx-auto text-sand">
                <Bell size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-extrabold text-walnut text-sm uppercase tracking-wide">Your inbox is empty</h3>
                <p className="text-xs text-walnut/50 font-semibold leading-relaxed max-w-xs mx-auto">
                  Any purchase confirmations, designer approvals, or shipping status alerts will appear here in real-time.
                </p>
              </div>
            </div>
          ) : (
            
            /* Dynamic List Feed */
            <div className="bg-white/70 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-[0_15px_40px_rgba(78,26,18,0.04)] overflow-hidden divide-y divide-sand/20">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && markAsRead(n.id)}
                  className={`p-6 transition-all duration-300 flex items-start gap-4 cursor-pointer relative group ${
                    n.is_read 
                      ? 'bg-transparent opacity-75 hover:opacity-100' 
                      : 'bg-ivory/30 hover:bg-ivory/55 shadow-inner'
                  }`}
                >
                  {/* Left Role icon */}
                  <div className="flex-shrink-0 mt-0.5 relative z-10 transition-transform duration-300 group-hover:scale-105">
                    {getIcon(n.type)}
                  </div>

                  {/* Main text block */}
                  <div className="flex-1 space-y-1.5 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className={`text-sm font-serif font-extrabold text-walnut tracking-wide transition-colors ${
                        n.is_read ? '' : 'group-hover:text-terracotta'
                      }`}>
                        {n.title}
                      </h3>
                      
                      <div className="flex items-center gap-2.5">
                        {!n.is_read && (
                          <span className="px-2.5 py-0.5 text-[8px] font-extrabold text-white bg-rose-600 rounded-full uppercase tracking-widest shadow-sm animate-pulse">
                            New
                          </span>
                        )}
                        <span className="text-[9px] text-walnut/40 font-bold uppercase tracking-wider">
                          {new Date(n.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-walnut/65 leading-relaxed font-medium">
                      {n.content}
                    </p>
                  </div>

                  {/* Glowing left strip on unread messages */}
                  {!n.is_read && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-terracotta rounded-r-md group-hover:w-1.5 transition-all duration-200" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
