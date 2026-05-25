import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'
import { AlertCircle, EyeOff } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()
  
  const { register } = useAuth()
  const [localError, setLocalError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (password !== passwordConfirm) {
      setLocalError('Passwords do not match')
      return
    }
    setLoading(true)

    try {
      const user = await register({ name, email, password, role: 'seller' })
      if (user.role !== 'seller') {
        throw new Error('Server generated invalid role.')
      }
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.response?.data?.message || err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#E5ECE5] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-[#FCFBF7] rounded-[1.5rem] border border-[#eae1d8]/40 shadow-[0_30px_70px_rgba(74,80,74,0.12)] overflow-hidden grid md:grid-cols-2 relative">
        
        <button 
          type="button"
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 h-10 w-10 bg-black/5 hover:bg-black/10 md:bg-white/10 md:hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-[#3E3A35] md:text-white transition-all cursor-pointer border border-[#EBE6DD]/20 md:border-white/10"
        >
          <X size={18} />
        </button>

        <div className="hidden md:block p-0 relative h-full">
          <img 
            src="/login_visual.png" 
            alt="Luxury Leather Studio Visual" 
            className="w-full h-full object-cover min-h-[580px] scale-x-[-1]"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1458213600676-e82cbdd9ceb5?q=80&w=2072&auto=format&fit=crop'
            }}
          />
        </div>

        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1 rounded bg-[#C96A3D]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C96A3D] border border-[#C96A3D]/20">
              Seller Application
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#3E3A35] font-sans tracking-tight leading-tight">
              Create Your<br />Studio
            </h1>
            <p className="text-xs text-[#8A847C] font-semibold leading-relaxed max-w-sm">
              Join The Tannery India as a premium partner to showcase and sell your artisan designs.
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
              <label className="block text-xs font-bold text-[#3E3A35]">Studio / Artisan Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe Leatherworks"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#3E3A35]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="studio@example.com"
                required
                className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#3E3A35]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 chars"
                    required
                    className="w-full rounded-full border border-[#EBE6DD] bg-white pl-5 pr-10 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8C8375]/60 hover:text-[#3E3A35] transition-colors"
                  >
                    <EyeOff size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#3E3A35]">Confirm</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Repeat"
                  required
                  className="w-full rounded-full border border-[#EBE6DD] bg-white px-5 py-3 text-xs font-semibold outline-none focus:border-[#C96A3D] text-[#3E3A35] placeholder:text-[#8C8375]/40 transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-10 py-3.5 bg-[#1C1C1C] hover:bg-[#2C2C2C] text-white rounded-full text-xs font-extrabold uppercase tracking-widest transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Processing...' : 'CREATE SELLER ACCOUNT'}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-[#EAE1D8]/40">
            <p className="text-xs text-[#3E3A35] font-semibold text-center">
              Already a partner?{' '}
              <Link to="/login" className="font-bold text-[#C96A3D] hover:underline underline-offset-4">
                Log In Here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
