import { Mail, Phone, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 animate-in fade-in duration-700 bg-gradient-to-br from-[#FAF7F2] to-[#EBE2D7]">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Elegant Contact Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-[#dfa85c] animate-pulse">
              <Sparkles size={12} /> Priority Support
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-walnut leading-[1.1] tracking-tight">
              Let's craft <br />
              <span className="font-['Italianno'] text-[#dfa85c] text-6xl md:text-7xl lg:text-8xl lowercase font-normal italic pr-2">brilliance</span> together.
            </h1>
            <p className="text-xs text-walnut/60 font-semibold leading-relaxed max-w-sm">
              Whether you're looking for bespoke leather designs, order support, or interested in becoming a partner artisan, our concierge team is at your service.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="group flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-white border border-sand/40 flex items-center justify-center text-terracotta group-hover:scale-110 group-hover:border-[#dfa85c] transition-all duration-300 shadow-sm">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-walnut">Digital Concierge</h4>
                <p className="text-xs font-semibold text-walnut/60 mt-0.5">concierge@thetannery.in</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-white border border-sand/40 flex items-center justify-center text-[#dfa85c] group-hover:scale-110 group-hover:border-[#dfa85c] transition-all duration-300 shadow-sm">
                <Phone size={16} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-walnut">Direct Line</h4>
                <p className="text-xs font-semibold text-walnut/60 mt-0.5">+91 1800-TANNERY (Toll-Free)</p>
              </div>
            </div>

            <div className="group flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-white border border-sand/40 flex items-center justify-center text-walnut group-hover:scale-110 group-hover:border-[#dfa85c] transition-all duration-300 shadow-sm">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-walnut">Atelier Address</h4>
                <p className="text-xs font-semibold text-walnut/60 mt-0.5 leading-relaxed">MG Road, Bengaluru<br/>Karnataka, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Premium Form */}
        <div className="relative w-full">
          {/* Decorative background blur */}
          <div className="absolute inset-0 bg-[#dfa85c]/5 blur-3xl rounded-full transform -translate-x-10 translate-y-10 z-0"></div>
          
          <div className="relative z-10 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_rgba(92,58,33,0.08)] p-8 md:p-10">
            {submitted ? (
              <div className="py-16 text-center space-y-5 animate-in zoom-in duration-500">
                <div className="h-16 w-16 bg-[#dfa85c]/10 text-[#dfa85c] rounded-full flex items-center justify-center mx-auto border border-[#dfa85c]/20">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-extrabold text-walnut">Message Delivered</h3>
                  <p className="text-xs text-walnut/60 font-semibold mt-2 max-w-xs mx-auto">
                    Thank you for reaching out. A dedicated specialist will return your inquiry within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[9px] font-black uppercase tracking-widest text-terracotta hover:text-walnut transition-colors"
                >
                  &larr; Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-walnut/50 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/50 border-b border-sand/50 px-4 py-3 text-sm font-semibold text-walnut outline-none focus:bg-white focus:border-[#dfa85c] transition-all rounded-t-xl"
                    placeholder="Your distinguished name"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-walnut/50 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/50 border-b border-sand/50 px-4 py-3 text-sm font-semibold text-walnut outline-none focus:bg-white focus:border-[#dfa85c] transition-all rounded-t-xl"
                    placeholder="Where we can reach you"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-walnut/50 ml-1">Inquiry</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full bg-white/50 border-b border-sand/50 px-4 py-3 text-sm font-semibold text-walnut outline-none focus:bg-white focus:border-[#dfa85c] transition-all rounded-t-xl resize-none"
                    placeholder="How may we assist you today?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full group flex items-center justify-center gap-3 rounded-full bg-walnut hover:bg-[#4b301c] py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <span>Dispatch Message</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
