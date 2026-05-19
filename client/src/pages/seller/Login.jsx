import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'
import { AlertCircle, EyeOff, X } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const { login } = useAuth()
  const [localError, setLocalError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // SSO Token capture from URL query params
  useEffect(() => {
    const ssoToken = searchParams.get('token')
    const ssoUserStr = searchParams.get('user')
    
    if (ssoToken && ssoUserStr) {
      try {
        const ssoUser = JSON.parse(decodeURIComponent(ssoUserStr))
        if (ssoUser.role !== 'seller') {
          setLocalError('Access denied: You must be a partner seller.')
          return
        }
        localStorage.setItem('token', ssoToken)
        localStorage.setItem('user', JSON.stringify(ssoUser))
        window.location.href = '/dashboard'
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
      const user = await login({ email, password })
      if (user.role !== 'seller') {
        throw new Error('Access denied: Not a partner seller account.')
      }
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#E5ECE5] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-[#FCFBF7] rounded-[1.5rem] border border-[#eae1d8]/40 shadow-[0_30px_70px_rgba(74,80,74,0.12)] overflow-hidden grid md:grid-cols-2 relative">
        
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1 rounded bg-[#C96A3D]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C96A3D] border border-[#C96A3D]/20">
              Seller Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#3E3A35] font-sans tracking-tight leading-tight">
              Welcome Back,<br />Partner
            </h1>
            <p className="text-xs text-[#8A847C] font-semibold leading-relaxed max-w-sm">
              Log in to manage your premium leather craft listings, review sales, and fulfill orders.
            </p>
          </div>

          {localError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700 flex items-start gap-2">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3E3A35]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@example.com"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3E3A35]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  className="w-full rounded-full border border-[#EBE6DD] bg-white pl-5 pr-12 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
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

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3.5 bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white rounded-full text-xs font-extrabold uppercase tracking-widest transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'LOG IN TO STUDIO'}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-[#EAE1D8]/40">
            <p className="text-xs text-[#3E3A35] font-semibold text-center">
              New to The Tannery India?{' '}
              <Link to="/register" className="font-bold text-[#C96A3D] hover:underline underline-offset-4">
                Apply as Seller
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block p-0 relative h-full">
          <img 
            src="http://localhost:5173/login_visual.png" 
            alt="Luxury Leather Studio Visual" 
            className="w-full h-full object-cover min-h-[580px]"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1458213600676-e82cbdd9ceb5?q=80&w=2072&auto=format&fit=crop'
            }}
          />
        </div>

      </div>
    </div>
  )
}
