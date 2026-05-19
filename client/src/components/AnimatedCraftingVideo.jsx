import React from 'react';

export default function AnimatedCraftingVideo() {
  return (
    <div className="relative w-full h-full bg-[#3e2312] overflow-hidden flex items-center justify-center rounded-xl shadow-inner border-2 border-[#5c3a21]">
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>

      {/* Grid Canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,247,242,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(250,247,242,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      {/* Video Content inside the Engine frame */}
      <div className="relative z-10 w-[85%] max-w-[500px] aspect-video rounded-md overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] border-2 border-[#5c3a21] bg-black">
        <iframe
          className="w-full h-full absolute inset-0"
          src="https://www.youtube-nocookie.com/embed/EIGT_RXi8ZM?autoplay=1&mute=1&loop=1&playlist=EIGT_RXi8ZM&controls=0&modestbranding=1&rel=0"
          title="Leather Crafting Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Decorative Branding overlay */}
      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded text-[9px] font-bold tracking-widest text-[#f4a261] uppercase border border-white/10">
        Tannery Engine V1.0
      </div>
    </div>
  );
}
