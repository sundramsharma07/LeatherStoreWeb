import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
import { User, Mail, Lock, AlertCircle, UserPlus, X, Briefcase } from 'lucide-react'

export default function Register() {
  const [searchParams] = useSearchParams()
  const initialRole = searchParams.get('role') === 'seller' ? 'seller' : 'client'
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [role, setRole] = useState(initialRole)
  const [isRoleLocked, setIsRoleLocked] = useState(false)
  const [localError, setLocalError] = useState('')
  const navigate = useNavigate()
  
  const { register, loading, error } = useAuth()

  useEffect(() => {
    const urlRole = searchParams.get('role')
    if (urlRole === 'seller' || urlRole === 'client') {
      setRole(urlRole)
      setIsRoleLocked(true)
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!name || !email || !password || !passwordConfirm) {
      setLocalError('All fields are required.')
      return
    }

    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters long.')
      return
    }

    if (password !== passwordConfirm) {
      setLocalError('Passwords do not match. Please try again.')
      return
    }
    
    const success = await register(name, email, password, passwordConfirm, role)
    if (success) {
      if (role === 'seller') {
        window.location.href = '/seller/dashboard'
      } else {
        window.location.href = '/store'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F3ECE5] to-[#E5DACF] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-[2rem] border border-[#eae1d8]/65 shadow-[0_30px_80px_rgba(78,26,18,0.08)] overflow-hidden grid md:grid-cols-2 relative">
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 h-10 w-10 bg-black/5 hover:bg-black/10 md:bg-black/25 md:hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-walnut md:text-white transition-all cursor-pointer border border-sand/20 md:border-white/10"
        >
          <X size={18} />
        </button>

        {/* Left Side: Form Panel */}
        <div className="p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <span className="font-serif italic font-extrabold text-2xl tracking-wide text-walnut hover:text-terracotta transition-colors duration-300">
                The Tannery India
              </span>
            </Link>
            <h1 className="text-3xl font-serif font-extrabold text-[#3E3A35] leading-tight uppercase tracking-tight">
              {role === 'seller' ? 'Seller Registration' : 'Customer Registration'}
            </h1>
            <p className="text-xs text-[#8A847C] font-semibold leading-relaxed">
              {role === 'seller' 
                ? 'Create a secure partner account to design templates, list leather artifacts, and view sale charts.'
                : 'Create a private shopping account to browse full-grain collections and order bespoke leather crafts.'}
            </p>
          </div>

          {/* Interactive Role Switcher Tabs (OMITTED completely if role query is locked in!) */}
          {!isRoleLocked && (
            <div className="grid grid-cols-2 p-1 bg-ivory rounded-full border border-sand/40 relative z-10 overflow-hidden">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out shadow-sm ${
                  role === 'client' 
                    ? 'left-1 bg-walnut' 
                    : 'left-[calc(50%+2px)] bg-[#5c3a21]'
                }`}
              />
              
              <button
                type="button"
                onClick={() => { setRole('client'); setLocalError(''); }}
                className={`relative z-10 py-2 px-4 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'client' ? 'text-white' : 'text-walnut/60 hover:text-walnut'
                }`}
              >
                <User size={12} />
                <span>Customer</span>
              </button>
              
              <button
                type="button"
                onClick={() => { setRole('seller'); setLocalError(''); }}
                className={`relative z-10 py-2 px-4 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'seller' ? 'text-white' : 'text-walnut/60 hover:text-walnut'
                }`}
              >
                <Briefcase size={12} />
                <span>Partner Seller</span>
              </button>
            </div>
          )}

          {/* Errors display */}
          {(error || localError) && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700 flex items-start gap-2 animate-in fade-in duration-200">
              <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
              <span>{localError || error}</span>
            </div>
          )}

          {/* Core Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 flex-1">
            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">Your Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#3E3A35]">Confirm Password *</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3.5 bg-walnut hover:bg-walnut/90 text-white rounded-full text-xs font-extrabold uppercase tracking-widest transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Creating Account...' : `REGISTER AS ${role === 'seller' ? 'PARTNER SELLER' : 'CUSTOMER'}`}
              </button>
            </div>
          </form>

          {/* Direct Link to Login */}
          <div className="pt-4 border-t border-[#EAE1D8]/40 text-center">
            <p className="text-[10px] text-[#3E3A35] font-semibold">
              Already have an account?{' '}
              <Link 
                to={isRoleLocked ? `/login?role=${role}` : "/login"} 
                className="font-extrabold text-[#C96A3D] hover:underline underline-offset-4"
              >
                Log In Here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Luxury Graphic Visual */}
        <div className="hidden md:block p-0 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=800" 
            alt="Bespoke luxury leather stitch still-life" 
            className="w-full h-full object-cover min-h-[580px] brightness-[0.85]"
          />
        </div>

      </div>
    </div>
  )
}
