import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, EyeOff, X, ShieldAlert } from 'lucide-react'
import api from '../../api/client'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const ssoToken = searchParams.get('token')
    const ssoUserStr = searchParams.get('user')
    
    if (ssoToken && ssoUserStr) {
      try {
        const ssoUser = JSON.parse(decodeURIComponent(ssoUserStr))
        if (ssoUser.role !== 'admin') {
          setError('Access denied: You must be an administrator to enter the Admin panel.')
          return
        }
        localStorage.setItem('token', ssoToken)
        localStorage.setItem('user', JSON.stringify(ssoUser))
        localStorage.setItem('customer_token', ssoToken)
        localStorage.setItem('customer_user', JSON.stringify(ssoUser))
        window.location.href = '/admin/dashboard'
      } catch (err) {
        setError('Failed to parse SSO authentication details.')
      }
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/login', { email, password })
      const { user, token } = response.data

      if (user.role !== 'admin') {
        throw new Error('Access denied: Not an administrator account.')
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('customer_token', token)
      localStorage.setItem('customer_user', JSON.stringify(user))
      window.location.href = '/admin/dashboard'
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0908] flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-terracotta/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-walnut/40 blur-[120px] pointer-events-none"></div>

      {/* Outer Card */}
      <div className="w-full max-w-5xl bg-[#14100e]/90 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden grid md:grid-cols-2 relative z-10 animate-slide-up">
        
        {/* Left Side: Form Panel */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-8">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1 rounded bg-terracotta/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-terracotta border border-terracotta/30">
              <ShieldAlert size={12} /> Secure Gateway
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight leading-tight">
              Admin HQ<br />Authentication
            </h1>
            <p className="text-xs text-ivory/50 font-semibold leading-relaxed max-w-sm">
              Strictly authorized personnel only. Log in to access the marketplace control center, approve designs, and manage sellers.
            </p>
          </div>

          {/* Errors display */}
          {error && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs font-semibold text-rose-300 flex items-start gap-2">
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Core Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thetannery.in"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold outline-none focus:border-terracotta text-white placeholder:text-ivory/20 transition-colors shadow-inner"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white">Master Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter vault password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-5 pr-12 py-3 text-xs font-semibold outline-none focus:border-terracotta text-white placeholder:text-ivory/20 transition-colors shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-ivory/40 hover:text-white transition-colors"
                >
                  <EyeOff size={16} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3.5 bg-gradient-to-r from-terracotta to-[#8c4627] hover:from-[#b35b32] hover:to-[#7a3b20] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-lg active:scale-[0.99] cursor-pointer border border-terracotta/50"
              >
                {loading ? 'Decrypting...' : 'AUTHORIZE ENTRY'}
              </button>
            </div>
          </form>

        </div>

        {/* Right Side: Premium Workspace Visual */}
        <div className="hidden md:block p-0 relative h-full bg-black">
          <img 
            src="http://localhost:5173/login_visual.png" 
            alt="Admin Secure Visual" 
            className="w-full h-full object-cover min-h-[580px] opacity-70 mix-blend-luminosity"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1458213600676-e82cbdd9ceb5?q=80&w=2072&auto=format&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#14100e]/90"></div>
          
          {/* Circular Close Button */}
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  )
}
