import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
import { AlertCircle, EyeOff, X, User, Briefcase, ShieldCheck } from 'lucide-react'
import api from '../api/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const { error: authError } = useAuth()
  const [localError, setLocalError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [roleTab, setRoleTab] = useState('client') // 'client' or 'seller'
  const [isRoleLocked, setIsRoleLocked] = useState(false)

  useEffect(() => {
    // If role parameter is in URL, lock user into that specific login path!
    const urlRole = searchParams.get('role')
    if (urlRole === 'seller' || urlRole === 'client') {
      setRoleTab(urlRole)
      setIsRoleLocked(true)
    }
  }, [searchParams])

  // SSO Token capture from URL query params
  useEffect(() => {
    const ssoToken = searchParams.get('token')
    const ssoUserStr = searchParams.get('user')
    
    if (ssoToken && ssoUserStr) {
      try {
        const ssoUser = JSON.parse(decodeURIComponent(ssoUserStr))
        localStorage.setItem('customer_token', ssoToken)
        localStorage.setItem('customer_user', JSON.stringify(ssoUser))
        window.location.href = '/'
      } catch (err) {
        setLocalError('Failed to parse SSO authentication details.')
      }
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (!email || !password) return

    setLoading(true)
    try {
      const response = await api.post('/login', { email, password })
      const { user, token } = response.data

      // Role check constraint
      if (roleTab === 'seller' && user.role !== 'seller') {
        throw new Error('Access denied: This account is not registered as a partner seller.')
      }
      if (roleTab === 'client' && user.role === 'seller') {
        throw new Error('Please log in using the Seller Portal to access your Seller Studio.')
      }

      handleLoginSuccess(user, token)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
      setLocalError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem('customer_token', token)
    localStorage.setItem('customer_user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('leathercraft_seller_token', token)

    if (user.role === 'admin') {
      window.location.href = '/admin/dashboard'
    } else if (user.role === 'seller') {
      window.location.href = '/seller/dashboard'
    } else {
      window.location.href = '/store'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F3ECE5] to-[#E5DACF] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-[2rem] border border-[#eae1d8]/65 shadow-[0_30px_80px_rgba(78,26,18,0.08)] overflow-hidden grid md:grid-cols-2 relative">
        
        {/* Left Side: Form Panel */}
        <div className="p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif italic font-extrabold text-2xl tracking-wide text-walnut hover:text-terracotta transition-colors duration-300">
                The Tannery India
              </span>
            </Link>
            <h1 className="text-3xl font-serif font-extrabold text-[#3E3A35] leading-tight uppercase tracking-tight">
              {roleTab === 'seller' ? 'Seller Log In' : 'Customer Log In'}
            </h1>
            <p className="text-xs text-[#8A847C] font-semibold leading-relaxed">
              {roleTab === 'seller' 
                ? 'Authenticate to your secure workspace to upload catalogs, review base items, and manage designs.'
                : 'Authenticate into your private shopping account to purchase bespoke luxury leather crafts.'}
            </p>
          </div>

          {/* Interactive Role Switcher Tabs (OMITTED completely if role query is locked in!) */}
          {!isRoleLocked && (
            <div className="grid grid-cols-2 p-1 bg-ivory rounded-full border border-sand/40 relative z-10 overflow-hidden">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-sm ${
                  roleTab === 'client' 
                    ? 'left-1 bg-walnut' 
                    : 'left-[calc(50%+2px)] bg-[#5c3a21]'
                }`}
              />
              
              <button
                type="button"
                onClick={() => { setRoleTab('client'); setLocalError(''); }}
                className={`relative z-10 py-2 px-4 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  roleTab === 'client' ? 'text-white' : 'text-walnut/60 hover:text-walnut'
                }`}
              >
                <User size={12} />
                <span>Customer</span>
              </button>
              
              <button
                type="button"
                onClick={() => { setRoleTab('seller'); setLocalError(''); }}
                className={`relative z-10 py-2 px-4 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  roleTab === 'seller' ? 'text-white' : 'text-walnut/60 hover:text-walnut'
                }`}
              >
                <Briefcase size={12} />
                <span>Seller Studio</span>
              </button>
            </div>
          )}

          {/* Errors display */}
          {(localError || authError) && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700 flex items-start gap-2 animate-in fade-in duration-200">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
              <span>{localError || authError}</span>
            </div>
          )}

          {/* Core Form */}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">
                {roleTab === 'seller' ? 'Seller Email Address' : 'Customer Email Address'} *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3.5 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-full border border-[#EBE6DD] bg-white pl-5 pr-12 py-3.5 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8C8375]/60 hover:text-[#3E3A35] transition-colors"
                >
                  <EyeOff size={16} />
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="mailto:support@thetannery.in" className="text-[10px] font-bold text-[#C96A3D] hover:underline underline-offset-4">
                Forgot Password?
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3.5 bg-walnut hover:bg-walnut/90 text-white rounded-full text-xs font-extrabold uppercase tracking-widest transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Authenticating...' : `LOG IN AS ${roleTab === 'seller' ? 'PARTNER SELLER' : 'CUSTOMER'}`}
              </button>
            </div>
          </form>

          {/* Unified Registration Options */}
          <div className="pt-4 border-t border-[#EAE1D8]/40 space-y-2">
            {roleTab === 'client' ? (
              <p className="text-[10px] text-[#3E3A35] font-semibold text-center">
                New Customer?{' '}
                <Link to="/register?role=client" className="font-extrabold text-[#C96A3D] hover:underline underline-offset-4">
                  Create Account Here
                </Link>
              </p>
            ) : (
              <p className="text-[10px] text-[#3E3A35] font-semibold text-center">
                New Partner Seller?{' '}
                <Link to="/register?role=seller" className="font-extrabold text-[#5c3a21] hover:underline underline-offset-4">
                  Become a Partner Seller
                </Link>
              </p>
            )}

            <div className="text-center pt-1">
              <Link 
                to="/admin/login" 
                className="inline-flex items-center gap-1 text-[9px] font-bold text-walnut/40 hover:text-walnut/70 uppercase tracking-widest transition-colors"
              >
                <ShieldCheck size={11} />
                <span>Admin Vault Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Premium Workspace Visual & Circular Exit Button */}
        <div className="hidden md:block p-0 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800" 
            alt="Luxury Leather Accessories Still Life" 
            className="w-full h-full object-cover min-h-[580px] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/15 pointer-events-none"></div>
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 h-10 w-10 bg-black/25 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all cursor-pointer border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  )
}
