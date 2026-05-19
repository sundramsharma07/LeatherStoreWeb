import React from 'react';
import { Briefcase, ShoppingBag, Watch, Info, ShieldCheck, Sparkles, Scissors, PenTool, Layout } from 'lucide-react';

const iconMap = {
  bags: ShoppingBag,
  wallets: Briefcase,
  belts: Watch,
  jackets: ShieldCheck,
  crafting: Scissors,
  tools: PenTool,
  texture: Layout,
  default: Info
};

export default function LeatherImage({ type = 'default', text, className = '' }) {
  const Icon = iconMap[type] || iconMap.default;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-[#5c3a21] text-sand ${className}`}>
      {/* Procedural Leather Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px'
        }}
      ></div>
      
      {/* Stitching Border */}
      <div className="absolute inset-2 border-2 border-dashed border-sand/30 rounded-lg pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 p-4 text-center">
        <Icon size={48} className="opacity-80 drop-shadow-md" strokeWidth={1.5} />
        {text && (
          <span className="font-serif text-sm md:text-lg font-bold tracking-widest uppercase opacity-90 drop-shadow-sm">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
