import { useEffect, useState } from 'react'
import api from '../../api/client'
import { IndianRupee, ShoppingCart, Calendar, TrendingUp } from 'lucide-react'
import { useToast } from '../../store/useToast'

export default function Dashboard() {
  const addToast = useToast((state) => state.addToast)
  const [sales, setSales] = useState([])
  const [totalCommission, setTotalCommission] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const { data } = await api.get('/admin/sales')
        setSales(data.sales)
        setTotalCommission(data.total_admin_commission)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  const handleUpdateStatus = async (saleId, newStatus) => {
    try {
      await api.patch(`/admin/sales/${saleId}/status`, { status: newStatus })
      setSales(sales.map(s => s.id === saleId ? { ...s, status: newStatus } : s))
      addToast(`Order #${saleId} status successfully changed to "${newStatus}"!`, 'success')
    } catch (err) {
      console.error('Failed to update sale status:', err)
      addToast('Failed to update order status. Please try again.', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-sand/40 border-t-terracotta animate-spin"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-sand/20 border-b-terracotta animate-spin animation-delay-150"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Title block */}
      <div className="flex flex-col gap-2 relative z-10">
        <h1 className="text-4xl font-serif font-bold tracking-tight text-walnut animate-slide-up transition-colors duration-300" style={{ animationDelay: '0ms' }}>Dashboard Overview</h1>
        <p className="text-sm font-medium text-walnut/60 animate-slide-up transition-colors duration-300" style={{ animationDelay: '100ms' }}>Real-time marketplace volume, transaction ledgers, and revenue split metrics.</p>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white/80 backdrop-blur-md border border-sand/40 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group hover:border-terracotta/30 transition-colors animate-slide-up shadow-sm" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full blur-[50px] group-hover:bg-terracotta/10 transition-all"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 border border-terracotta/20 text-terracotta shadow-sm relative z-10">
            <IndianRupee size={26} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-walnut/50 mb-1 transition-colors duration-300">Total Admin Revenue</p>
            <p className="text-3xl font-bold text-walnut transition-colors duration-300">₹{Number(totalCommission).toFixed(2)}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-2.5 py-0.5 text-[9px] font-bold text-terracotta mt-2 border border-terracotta/20 animate-pulse-glow">
              10% split active
            </span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-sand/40 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group hover:border-[#dfa85c]/50 transition-colors animate-slide-up shadow-sm" style={{ animationDelay: '300ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfa85c]/5 rounded-full blur-[50px] group-hover:bg-[#dfa85c]/10 transition-all"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfa85c]/10 border border-[#dfa85c]/20 text-[#dfa85c] shadow-sm relative z-10">
            <ShoppingCart size={26} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-walnut/50 mb-1 transition-colors duration-300">Total Sales Volume</p>
            <p className="text-3xl font-bold text-walnut transition-colors duration-300">{sales.length}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#dfa85c]/10 px-2.5 py-0.5 text-[9px] font-bold text-[#dfa85c] mt-2 border border-[#dfa85c]/20">
              <TrendingUp size={10} /> +12% this week
            </span>
          </div>
        </div>
      </div>

      {/* Recent sales table */}
      <div className="bg-white/90 backdrop-blur-md border border-sand/40 rounded-3xl overflow-hidden animate-slide-up shadow-sm transition-colors duration-300" style={{ animationDelay: '400ms' }}>
        <div className="border-b border-sand/30 px-8 py-6 flex items-center justify-between transition-colors duration-300">
          <div>
            <h2 className="text-lg font-bold text-walnut transition-colors duration-300">Recent Sales Ledgers</h2>
            <p className="text-xs font-medium text-walnut/60 mt-1 transition-colors duration-300">List of latest customer transactions on seller listings.</p>
          </div>
          <span className="flex h-8 items-center gap-2 rounded-full bg-sand/10 px-3 text-xs font-bold text-walnut/70 border border-sand/30 transition-colors duration-300">
            <Calendar size={14} className="text-terracotta" /> Real-time
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-walnut/80">
            <thead className="bg-sand/10 text-[10px] font-bold uppercase tracking-wider text-walnut/60 border-b border-sand/30 transition-colors duration-300">
              <tr>
                <th className="px-8 py-4">Product Title</th>
                <th className="px-8 py-4">Seller Details</th>
                <th className="px-8 py-4">Buyer Details</th>
                <th className="px-8 py-4 text-right">Order Amount</th>
                <th className="px-8 py-4 text-right">Admin Cut (10%)</th>
                <th className="px-8 py-4 text-center">Order Status</th>
                <th className="px-8 py-4 text-center">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20 text-xs font-medium transition-colors duration-300">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-sand/10 transition-colors group">
                  <td className="px-8 py-5 font-bold text-walnut">
                    {sale.listed_product?.title || 'Premium Leather Craft'}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-walnut">{sale.seller?.name}</span>
                      <span className="text-[10px] text-walnut/50 mt-0.5">{sale.seller?.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {sale.buyer ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-walnut">{sale.buyer.name}</span>
                        <span className="text-[10px] text-walnut/50 mt-0.5">{sale.buyer.email}</span>
                      </div>
                    ) : (
                      <span className="text-walnut/40 italic">Guest Shopper</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-walnut/80">₹{Number(sale.amount).toFixed(2)}</td>
                  <td className="px-8 py-5 text-right">
                    <span className="inline-flex items-center rounded-lg bg-terracotta/10 px-2.5 py-1 text-xs font-bold text-terracotta border border-terracotta/20 group-hover:bg-terracotta/20 transition-colors">
                      +₹{Number(sale.admin_commission).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <select
                      value={sale.status || 'confirmed'}
                      onChange={(e) => handleUpdateStatus(sale.id, e.target.value)}
                      className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider outline-none border transition-colors cursor-pointer appearance-none text-center ${
                        sale.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : sale.status === 'shipped'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : sale.status === 'processing'
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'bg-rose-50 text-rose-600 border-rose-200'
                      }`}
                    >
                      <option value="confirmed" className="bg-white text-walnut">Confirmed</option>
                      <option value="processing" className="bg-white text-walnut">Processing</option>
                      <option value="shipped" className="bg-white text-walnut">Shipped</option>
                      <option value="delivered" className="bg-white text-walnut">Delivered</option>
                    </select>
                  </td>
                  <td className="px-8 py-5 text-center text-[11px] font-semibold text-walnut/50">
                    {new Date(sale.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 opacity-50">
                      <div className="h-12 w-12 rounded-full bg-sand/20 flex items-center justify-center">
                        <ShoppingCart size={20} className="text-walnut/60" />
                      </div>
                      <span className="text-sm font-bold text-walnut/70">No sales recorded yet</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
