import * as fabric from 'fabric'

// Design template definitions - All multi-element templates are grouped for unified manipulation
export const DESIGN_TEMPLATES = [
  {
    id: 'monogram',
    label: 'Monogram',
    icon: '𝕄',
    category: 'Classic',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const circle = new fabric.Circle({
        radius: 60,
        fill: 'transparent',
        stroke: '#4A3228',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      })
      const inner = new fabric.Circle({
        radius: 52,
        fill: 'transparent',
        stroke: '#4A3228',
        strokeWidth: 0.8,
        originX: 'center',
        originY: 'center',
      })
      const text = new fabric.IText('ABC', {
        fontFamily: 'Georgia',
        fontSize: 36,
        fill: '#4A3228',
        fontWeight: 'bold',
        originX: 'center',
        originY: 'center',
      })
      
      const group = new fabric.Group([circle, inner, text], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'floral_border',
    label: 'Floral Border',
    icon: '✿',
    category: 'Decorative',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 60
      const h = canvas.height - 60
      
      const rect = new fabric.Rect({
        width: w,
        height: h,
        fill: 'transparent',
        stroke: '#C96A3D',
        strokeWidth: 2,
        rx: 8,
        ry: 8,
        strokeDashArray: [6, 3],
        originX: 'center',
        originY: 'center',
      })
      
      const flowers = ['✿', '❀', '✿', '❀', '✿', '❀', '✿', '❀']
      const relativePositions = [
        {x: -w/2, y: -h/2}, {x: 0, y: -h/2 - 10}, {x: w/2, y: -h/2},
        {x: w/2 + 10, y: 0}, {x: w/2, y: h/2},
        {x: 0, y: h/2 + 10}, {x: -w/2, y: h/2}, {x: -w/2 - 10, y: 0},
      ]
      
      const flowerObjects = flowers.map((f, i) => {
        return new fabric.IText(f, {
          left: relativePositions[i].x,
          top: relativePositions[i].y,
          originX: 'center',
          originY: 'center',
          fontSize: 18,
          fill: '#C96A3D',
        })
      })
      
      const group = new fabric.Group([rect, ...flowerObjects], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'diamond_grid',
    label: 'Diamond Grid',
    icon: '◆',
    category: 'Geometric',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const diamonds = []
      
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
          diamonds.push(new fabric.Rect({
            left: (col - 2) * 110,
            top: (row - 1.5) * 80,
            originX: 'center',
            originY: 'center',
            width: 30,
            height: 30,
            fill: 'transparent',
            stroke: '#4A3228',
            strokeWidth: 1,
            angle: 45,
          }))
        }
      }
      
      const group = new fabric.Group(diamonds, {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'vintage_stamp',
    label: 'Vintage Stamp',
    icon: '⬡',
    category: 'Classic',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const poly = new fabric.Circle({
        radius: 80,
        fill: 'transparent',
        stroke: '#4A3228',
        strokeWidth: 3,
        originX: 'center',
        originY: 'center',
      })
      const inner = new fabric.Circle({
        radius: 70,
        fill: 'transparent',
        stroke: '#4A3228',
        strokeWidth: 1,
        strokeDashArray: [4, 4],
        originX: 'center',
        originY: 'center',
      })
      const label = new fabric.IText('HANDCRAFTED', {
        top: -20,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Georgia',
        fontSize: 12,
        fill: '#4A3228',
        fontWeight: 'bold',
        charSpacing: 200,
      })
      const year = new fabric.IText('EST. 2024', {
        top: 16,
        originX: 'center',
        originY: 'center',
        fontFamily: 'Georgia',
        fontSize: 10,
        fill: '#C96A3D',
        charSpacing: 100,
      })
      
      const group = new fabric.Group([poly, inner, label, year], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'chevron',
    label: 'Chevron',
    icon: '❯❯',
    category: 'Geometric',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const colors = ['#4A3228', '#C96A3D', '#D8C3A5']
      const lines = []
      
      for (let i = 0; i < 5; i++) {
        lines.push(new fabric.Line(
          [-canvas.width/2, (i - 2) * 60, canvas.width/2, (i - 2) * 60],
          { 
            stroke: colors[i % 3], 
            strokeWidth: i % 2 === 0 ? 2 : 1, 
            opacity: 0.5,
            originX: 'center',
            originY: 'center'
          }
        ))
      }
      
      const group = new fabric.Group(lines, {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'arabic_pattern',
    label: 'Arabesque',
    icon: '☽',
    category: 'Artisan',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const petals = []
      
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const px = Math.cos(angle) * 70
        const py = Math.sin(angle) * 70
        
        petals.push(new fabric.Ellipse({
          left: px,
          top: py,
          originX: 'center',
          originY: 'center',
          rx: 20,
          ry: 40,
          fill: 'transparent',
          stroke: '#4A3228',
          strokeWidth: 1.2,
          angle: (i / 8) * 360,
        }))
      }
      
      const center = new fabric.Circle({
        left: 0,
        top: 0,
        originX: 'center',
        originY: 'center',
        radius: 10,
        fill: '#C96A3D',
      })
      
      const group = new fabric.Group([...petals, center], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'leather_stitching',
    label: 'Stitching',
    icon: '- - -',
    category: 'Artisan',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 60
      const h = canvas.height - 60
      
      const l1 = new fabric.Line([-w/2, -h/2, w/2, -h/2], { stroke: '#4A3228', strokeWidth: 1.5, strokeDashArray: [8, 6], opacity: 0.7 })
      const l2 = new fabric.Line([w/2, -h/2, w/2, h/2], { stroke: '#4A3228', strokeWidth: 1.5, strokeDashArray: [8, 6], opacity: 0.7 })
      const l3 = new fabric.Line([w/2, h/2, -w/2, h/2], { stroke: '#4A3228', strokeWidth: 1.5, strokeDashArray: [8, 6], opacity: 0.7 })
      const l4 = new fabric.Line([-w/2, h/2, -w/2, -h/2], { stroke: '#4A3228', strokeWidth: 1.5, strokeDashArray: [8, 6], opacity: 0.7 })
      
      const group = new fabric.Group([l1, l2, l3, l4], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'corner_ornament',
    label: 'Corner Ornaments',
    icon: '⌐',
    category: 'Decorative',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 40
      const h = canvas.height - 40
      const size = 40
      
      // Top Left
      const tl1 = new fabric.Line([-w/2, -h/2, -w/2 + size, -h/2], { stroke: '#C96A3D', strokeWidth: 2 })
      const tl2 = new fabric.Line([-w/2, -h/2, -w/2, -h/2 + size], { stroke: '#C96A3D', strokeWidth: 2 })
      
      // Top Right
      const tr1 = new fabric.Line([w/2, -h/2, w/2 - size, -h/2], { stroke: '#C96A3D', strokeWidth: 2 })
      const tr2 = new fabric.Line([w/2, -h/2, w/2, -h/2 + size], { stroke: '#C96A3D', strokeWidth: 2 })
      
      // Bottom Right
      const br1 = new fabric.Line([w/2, h/2, w/2 - size, h/2], { stroke: '#C96A3D', strokeWidth: 2 })
      const br2 = new fabric.Line([w/2, h/2, w/2, h/2 - size], { stroke: '#C96A3D', strokeWidth: 2 })
      
      // Bottom Left
      const bl1 = new fabric.Line([-w/2, h/2, -w/2 + size, h/2], { stroke: '#C96A3D', strokeWidth: 2 })
      const bl2 = new fabric.Line([-w/2, h/2, -w/2, h/2 - size], { stroke: '#C96A3D', strokeWidth: 2 })
      
      const group = new fabric.Group([tl1, tl2, tr1, tr2, br1, br2, bl1, bl2], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center',
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'premium_badge',
    label: 'Premium Badge',
    icon: '♛',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const outer = new fabric.Circle({
        radius: 50,
        fill: '#4A3228',
        stroke: '#D8C3A5',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      })
      const inner = new fabric.Circle({
        radius: 45,
        fill: 'transparent',
        stroke: '#D8C3A5',
        strokeWidth: 1,
        strokeDashArray: [2, 2],
        originX: 'center',
        originY: 'center'
      })
      const crown = new fabric.IText('♛', {
        top: -10,
        originX: 'center',
        originY: 'center',
        fontSize: 32,
        fill: '#D8C3A5'
      })
      const text = new fabric.IText('PREMIUM', {
        top: 20,
        originX: 'center',
        originY: 'center',
        fontSize: 10,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fill: '#D8C3A5',
        charSpacing: 150
      })
      
      const group = new fabric.Group([outer, inner, crown, text], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center'
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'genuine_leather',
    label: 'Genuine Mark',
    icon: '★',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const bg = new fabric.Rect({
        width: 140,
        height: 40,
        rx: 4,
        ry: 4,
        fill: '#C96A3D',
        stroke: '#4A3228',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      })
      const text = new fabric.IText('GENUINE LEATHER', {
        originX: 'center',
        originY: 'center',
        fontSize: 12,
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        fill: '#FAF7F2',
        charSpacing: 100
      })
      
      const group = new fabric.Group([bg, text], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center'
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'artisan_seal',
    label: 'Artisan Seal',
    icon: '◎',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const seal = new fabric.Circle({ radius: 40, fill: 'transparent', stroke: '#4A3228', strokeWidth: 4, originX: 'center', originY: 'center' })
      const innerSeal = new fabric.Circle({ radius: 32, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1, originX: 'center', originY: 'center' })
      const star1 = new fabric.IText('★', { left: -25, top: 0, fontSize: 10, fill: '#4A3228', originX: 'center', originY: 'center' })
      const star2 = new fabric.IText('★', { left: 25, top: 0, fontSize: 10, fill: '#4A3228', originX: 'center', originY: 'center' })
      const textTop = new fabric.IText('ARTISAN', { left: 0, top: -15, fontSize: 10, fontWeight: 'bold', fontFamily: 'Courier New', fill: '#4A3228', originX: 'center', originY: 'center' })
      const textBot = new fabric.IText('CRAFTED', { left: 0, top: 15, fontSize: 10, fontWeight: 'bold', fontFamily: 'Courier New', fill: '#4A3228', originX: 'center', originY: 'center' })
      
      const group = new fabric.Group([seal, innerSeal, star1, star2, textTop, textBot], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center'
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'workshop_logo',
    label: 'Workshop Logo',
    icon: '⚙',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const outer = new fabric.Rect({
        width: 130, height: 130, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1.5, rx: 8, ry: 8, originX: 'center', originY: 'center'
      })
      const inner = new fabric.Rect({
        width: 120, height: 120, fill: 'transparent', stroke: '#4A3228', strokeWidth: 0.8, rx: 6, ry: 6, strokeDashArray: [4, 4], originX: 'center', originY: 'center'
      })
      const hammerIcon = new fabric.IText('🛠', {
        left: 0, top: -20, fontSize: 32, fill: '#4A3228', originX: 'center', originY: 'center'
      })
      const line = new fabric.Line([-40, 10, 40, 10], {
        stroke: '#4A3228', strokeWidth: 1
      })
      const nameText = new fabric.IText('ARTISAN CO.', {
        left: 0, top: 25, fontSize: 11, fontFamily: 'Courier New', fontWeight: 'bold', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 100
      })
      const locationText = new fabric.IText('HANDMADE IN USA', {
        left: 0, top: 40, fontSize: 7, fontFamily: 'Arial', fontWeight: 'bold', fill: '#C96A3D', originX: 'center', originY: 'center', charSpacing: 120
      })
      
      const group = new fabric.Group([outer, inner, hammerIcon, line, nameText, locationText], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center'
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  },
  {
    id: 'leather_hide_stamp',
    label: 'Hide Outline',
    icon: '☫',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      
      const hide = new fabric.Path('M 0 15 C 15 20, 30 10, 45 20 C 35 40, 40 60, 45 80 C 25 75, 10 80, -10 80 C -15 60, -5 40, -10 20 C 5 10, 10 20, 0 15 Z', {
        fill: 'transparent',
        stroke: '#4A3228',
        strokeWidth: 2,
        scaleX: 1.5,
        scaleY: 1.5,
        originX: 'center',
        originY: 'center'
      })
      
      const text = new fabric.IText('100% NATURAL', {
        originX: 'center',
        originY: 'center',
        fontSize: 9,
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        fill: '#4A3228',
        charSpacing: 80
      })
      
      const group = new fabric.Group([hide, text], {
        left: cx,
        top: cy,
        originX: 'center',
        originY: 'center'
      })
      
      canvas.add(group)
      canvas.setActiveObject(group)
      canvas.renderAll()
    }
  }
]

export const LEATHER_TEXTURES = [
  { id: 'none', label: 'None', color: 'transparent', pattern: null },
  { id: 'croco', label: 'Croco', color: '#5c3a21', pattern: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 4px, transparent 4px, transparent 12px)' },
  { id: 'grain', label: 'Full Grain', color: '#6b4226', pattern: 'repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 8px)' },
  { id: 'suede', label: 'Suede', color: '#8c6240', pattern: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)' },
  { id: 'smooth', label: 'Smooth', color: '#4a2c18', pattern: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' },
]

export function DesignTemplatesPanel({ canvas }) {
  if (!canvas) return null

  return (
    <div className="rounded-2xl border border-sand/50 bg-white p-4 shadow-sm space-y-5 h-[380px] overflow-y-auto custom-scrollbar animate-in fade-in duration-200">
      <div className="sticky top-0 bg-white z-10 pb-2 border-b border-sand/30 mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-walnut/60 flex items-center gap-2">
          <span className="text-terracotta">✦</span> Design Templates & Stamps
        </h3>
        <p className="text-[10px] text-walnut/40 mt-1 font-semibold leading-tight">
          Click any template to instantly add it to your leather canvas as a single unified stamp. You can move, resize, rotate, and ungroup parts for customized modifications.
        </p>
      </div>

      {['Stamps', 'Classic', 'Decorative', 'Artisan', 'Geometric'].map(cat => {
        const templates = DESIGN_TEMPLATES.filter(t => t.category === cat)
        if (templates.length === 0) return null
        
        return (
          <div key={cat} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-[9px] uppercase tracking-widest text-walnut/40 font-bold mb-2 flex items-center gap-2">
              {cat} <span className="h-px flex-1 bg-sand/30"></span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => template.apply(canvas)}
                  title={template.label}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-sand/40 bg-ivory/60 hover:bg-terracotta/10 hover:border-terracotta/50 hover:shadow-sm transition-all text-center group min-h-[70px]"
                >
                  <span className="text-2xl leading-none text-walnut/70 group-hover:text-terracotta group-hover:scale-110 transition-transform">{template.icon}</span>
                  <span className="text-[9px] font-bold text-walnut/70 uppercase tracking-wider group-hover:text-walnut">{template.label}</span>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
