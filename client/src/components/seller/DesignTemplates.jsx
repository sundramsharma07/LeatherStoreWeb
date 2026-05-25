import * as fabric from 'fabric'

// Design template definitions - All multi-element templates are grouped for unified manipulation
export const DESIGN_TEMPLATES = [
  // ─── CLASSIC ────────────────────────────────────────────────────────────────
  {
    id: 'monogram',
    label: 'Monogram',
    icon: '𝕄',
    category: 'Classic',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const circle = new fabric.Circle({ radius: 60, fill: 'transparent', stroke: '#4A3228', strokeWidth: 2, originX: 'center', originY: 'center' })
      const inner = new fabric.Circle({ radius: 52, fill: 'transparent', stroke: '#4A3228', strokeWidth: 0.8, originX: 'center', originY: 'center' })
      const text = new fabric.IText('ABC', { fontFamily: 'Georgia', fontSize: 36, fill: '#4A3228', fontWeight: 'bold', originX: 'center', originY: 'center' })
      const group = new fabric.Group([circle, inner, text], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
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
      const poly = new fabric.Circle({ radius: 80, fill: 'transparent', stroke: '#4A3228', strokeWidth: 3, originX: 'center', originY: 'center' })
      const inner = new fabric.Circle({ radius: 70, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1, strokeDashArray: [4, 4], originX: 'center', originY: 'center' })
      const label = new fabric.IText('HANDCRAFTED', { top: -20, originX: 'center', originY: 'center', fontFamily: 'Georgia', fontSize: 12, fill: '#4A3228', fontWeight: 'bold', charSpacing: 200 })
      const year = new fabric.IText('EST. 2024', { top: 16, originX: 'center', originY: 'center', fontFamily: 'Georgia', fontSize: 10, fill: '#C96A3D', charSpacing: 100 })
      const group = new fabric.Group([poly, inner, label, year], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'oval_monogram',
    label: 'Oval Frame',
    icon: '〇',
    category: 'Classic',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const oval = new fabric.Ellipse({ rx: 90, ry: 55, fill: 'transparent', stroke: '#4A3228', strokeWidth: 2.5, originX: 'center', originY: 'center' })
      const innerOval = new fabric.Ellipse({ rx: 82, ry: 47, fill: 'transparent', stroke: '#4A3228', strokeWidth: 0.8, strokeDashArray: [3, 3], originX: 'center', originY: 'center' })
      const initials = new fabric.IText('AB', { fontFamily: 'Georgia', fontSize: 44, fill: '#4A3228', fontWeight: 'bold', fontStyle: 'italic', originX: 'center', originY: 'center' })
      const group = new fabric.Group([oval, innerOval, initials], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'crest_badge',
    label: 'Crest Badge',
    icon: '⛨',
    category: 'Classic',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      // Shield shape using path
      const shield = new fabric.Path('M 0 -75 L 60 -50 L 60 10 C 60 55, 0 75, 0 75 C 0 75, -60 55, -60 10 L -60 -50 Z', {
        fill: 'transparent', stroke: '#4A3228', strokeWidth: 2.5, originX: 'center', originY: 'center'
      })
      const divider = new fabric.Line([-60, -15, 60, -15], { stroke: '#4A3228', strokeWidth: 1 })
      const topText = new fabric.IText('THE', { left: 0, top: -38, fontSize: 9, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 200 })
      const mainText = new fabric.IText('TANNERY', { left: 0, top: 10, fontSize: 14, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 100 })
      const botText = new fabric.IText('INDIA', { left: 0, top: 45, fontSize: 8, fontFamily: 'Georgia', fill: '#C96A3D', originX: 'center', originY: 'center', charSpacing: 200 })
      const group = new fabric.Group([shield, divider, topText, mainText, botText], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },

  // ─── STAMPS ─────────────────────────────────────────────────────────────────
  {
    id: 'genuine_leather',
    label: 'Genuine Mark',
    icon: '★',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const bg = new fabric.Rect({ width: 160, height: 44, rx: 4, ry: 4, fill: '#C96A3D', stroke: '#4A3228', strokeWidth: 2, originX: 'center', originY: 'center' })
      const text = new fabric.IText('GENUINE LEATHER', { originX: 'center', originY: 'center', fontSize: 12, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#FAF7F2', charSpacing: 100 })
      const group = new fabric.Group([bg, text], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
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
      const seal = new fabric.Circle({ radius: 42, fill: 'transparent', stroke: '#4A3228', strokeWidth: 4, originX: 'center', originY: 'center' })
      const innerSeal = new fabric.Circle({ radius: 33, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1, originX: 'center', originY: 'center' })
      const star1 = new fabric.IText('★', { left: -20, top: 0, fontSize: 10, fill: '#C96A3D', originX: 'center', originY: 'center' })
      const star2 = new fabric.IText('★', { left: 20, top: 0, fontSize: 10, fill: '#C96A3D', originX: 'center', originY: 'center' })
      const textTop = new fabric.IText('ARTISAN', { left: 0, top: -14, fontSize: 10, fontWeight: 'bold', fontFamily: 'Georgia', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 120 })
      const textBot = new fabric.IText('CRAFTED', { left: 0, top: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'Georgia', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 120 })
      const group = new fabric.Group([seal, innerSeal, star1, star2, textTop, textBot], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
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
      const outer = new fabric.Circle({ radius: 50, fill: '#4A3228', stroke: '#D8C3A5', strokeWidth: 2, originX: 'center', originY: 'center' })
      const inner = new fabric.Circle({ radius: 45, fill: 'transparent', stroke: '#D8C3A5', strokeWidth: 1, strokeDashArray: [2, 2], originX: 'center', originY: 'center' })
      const crown = new fabric.IText('♛', { top: -10, originX: 'center', originY: 'center', fontSize: 32, fill: '#D8C3A5' })
      const text = new fabric.IText('PREMIUM', { top: 20, originX: 'center', originY: 'center', fontSize: 10, fontFamily: 'Arial', fontWeight: 'bold', fill: '#D8C3A5', charSpacing: 150 })
      const group = new fabric.Group([outer, inner, crown, text], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'tannery_brand',
    label: 'Tannery Brand',
    icon: '⊕',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const rect = new fabric.Rect({ width: 160, height: 80, rx: 6, ry: 6, fill: '#4A3228', originX: 'center', originY: 'center' })
      const innerRect = new fabric.Rect({ width: 152, height: 72, rx: 4, ry: 4, fill: 'transparent', stroke: '#D8C3A5', strokeWidth: 0.8, originX: 'center', originY: 'center' })
      const top = new fabric.IText('THE TANNERY INDIA', { top: -20, originX: 'center', originY: 'center', fontSize: 11, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#D8C3A5', charSpacing: 80 })
      const divider = new fabric.Line([-55, 0, 55, 0], { stroke: '#C96A3D', strokeWidth: 1.5 })
      const bot = new fabric.IText('HANDCRAFTED LEATHER', { top: 22, originX: 'center', originY: 'center', fontSize: 7.5, fontFamily: 'Georgia', fill: '#D8C3A5', charSpacing: 80 })
      const group = new fabric.Group([rect, innerRect, top, divider, bot], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'full_grain_stamp',
    label: 'Full Grain Mark',
    icon: '⬟',
    category: 'Stamps',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const diamond = new fabric.Rect({ width: 110, height: 110, angle: 45, rx: 4, ry: 4, fill: 'transparent', stroke: '#4A3228', strokeWidth: 2, originX: 'center', originY: 'center' })
      const innerDiamond = new fabric.Rect({ width: 96, height: 96, angle: 45, fill: 'transparent', stroke: '#4A3228', strokeWidth: 0.8, originX: 'center', originY: 'center' })
      const mainText = new fabric.IText('FULL\nGRAIN', { top: -10, originX: 'center', originY: 'center', fontSize: 14, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', textAlign: 'center', lineHeight: 1.2 })
      const group = new fabric.Group([diamond, innerDiamond, mainText], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },

  // ─── LEATHER CRAFT ──────────────────────────────────────────────────────────
  {
    id: 'saddle_stitch',
    label: 'Saddle Stitch',
    icon: '⊶',
    category: 'Leather Craft',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 60, h = canvas.height - 60
      const lines = []
      const dashArr = [8, 6]
      lines.push(new fabric.Line([-w/2, -h/2, w/2, -h/2], { stroke: '#bf953f', strokeWidth: 1.8, strokeDashArray: dashArr }))
      lines.push(new fabric.Line([w/2, -h/2, w/2, h/2], { stroke: '#bf953f', strokeWidth: 1.8, strokeDashArray: dashArr }))
      lines.push(new fabric.Line([w/2, h/2, -w/2, h/2], { stroke: '#bf953f', strokeWidth: 1.8, strokeDashArray: dashArr }))
      lines.push(new fabric.Line([-w/2, h/2, -w/2, -h/2], { stroke: '#bf953f', strokeWidth: 1.8, strokeDashArray: dashArr }))
      // Inner offset
      const pad = 10
      lines.push(new fabric.Line([-w/2+pad, -h/2+pad, w/2-pad, -h/2+pad], { stroke: '#bf953f', strokeWidth: 1, strokeDashArray: dashArr, opacity: 0.5 }))
      lines.push(new fabric.Line([w/2-pad, -h/2+pad, w/2-pad, h/2-pad], { stroke: '#bf953f', strokeWidth: 1, strokeDashArray: dashArr, opacity: 0.5 }))
      lines.push(new fabric.Line([w/2-pad, h/2-pad, -w/2+pad, h/2-pad], { stroke: '#bf953f', strokeWidth: 1, strokeDashArray: dashArr, opacity: 0.5 }))
      lines.push(new fabric.Line([-w/2+pad, h/2-pad, -w/2+pad, -h/2+pad], { stroke: '#bf953f', strokeWidth: 1, strokeDashArray: dashArr, opacity: 0.5 }))
      const group = new fabric.Group(lines, { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'burnished_edge',
    label: 'Burnished Edge',
    icon: '▣',
    category: 'Leather Craft',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 30, h = canvas.height - 30
      const outerRect = new fabric.Rect({ width: w, height: h, rx: 14, ry: 14, fill: 'transparent', stroke: '#5c2e16', strokeWidth: 5, originX: 'center', originY: 'center', shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.35)', blur: 8, offsetX: 0, offsetY: 0 }) })
      const midRect = new fabric.Rect({ width: w - 12, height: h - 12, rx: 10, ry: 10, fill: 'transparent', stroke: '#9e5a24', strokeWidth: 2, originX: 'center', originY: 'center' })
      const innerRect = new fabric.Rect({ width: w - 24, height: h - 24, rx: 7, ry: 7, fill: 'transparent', stroke: '#d2a679', strokeWidth: 1, strokeDashArray: [4, 4], originX: 'center', originY: 'center' })
      const group = new fabric.Group([outerRect, midRect, innerRect], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'hide_outline',
    label: 'Hide Outline',
    icon: '☫',
    category: 'Leather Craft',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const hide = new fabric.Path('M 0 15 C 15 20, 30 10, 45 20 C 35 40, 40 60, 45 80 C 25 75, 10 80, -10 80 C -15 60, -5 40, -10 20 C 5 10, 10 20, 0 15 Z', {
        fill: 'transparent', stroke: '#4A3228', strokeWidth: 2, scaleX: 2.2, scaleY: 2.2, originX: 'center', originY: 'center'
      })
      const text = new fabric.IText('100% NATURAL', { top: 70, originX: 'center', originY: 'center', fontSize: 10, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', charSpacing: 80 })
      const group = new fabric.Group([hide, text], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'tooling_flower',
    label: 'Tooling Flower',
    icon: '✾',
    category: 'Leather Craft',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const petals = []
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        petals.push(new fabric.Ellipse({
          left: Math.cos(angle) * 45, top: Math.sin(angle) * 45,
          rx: 14, ry: 30, angle: (i / 8) * 360,
          fill: 'transparent', stroke: '#4A3228', strokeWidth: 1.5,
          originX: 'center', originY: 'center'
        }))
      }
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
        petals.push(new fabric.Ellipse({
          left: Math.cos(angle) * 28, top: Math.sin(angle) * 28,
          rx: 8, ry: 18, angle: (i / 8) * 360 + 22.5,
          fill: 'transparent', stroke: '#C96A3D', strokeWidth: 1,
          originX: 'center', originY: 'center'
        }))
      }
      const centerCircle = new fabric.Circle({ radius: 12, fill: '#C96A3D', originX: 'center', originY: 'center' })
      const centerInner = new fabric.Circle({ radius: 7, fill: 'transparent', stroke: '#FAF7F2', strokeWidth: 1.5, originX: 'center', originY: 'center' })
      const group = new fabric.Group([...petals, centerCircle, centerInner], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'celtic_knot',
    label: 'Celtic Knot',
    icon: '⊗',
    category: 'Leather Craft',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const rings = []
      const radii = [70, 52, 36, 20]
      const strokes = ['#4A3228', '#C96A3D', '#4A3228', '#D8C3A5']
      radii.forEach((r, i) => {
        rings.push(new fabric.Circle({
          radius: r, fill: 'transparent', stroke: strokes[i], strokeWidth: i % 2 === 0 ? 2.5 : 1.5,
          strokeDashArray: i % 2 === 0 ? undefined : [5, 5], originX: 'center', originY: 'center'
        }))
      })
      const cross1 = new fabric.Line([-70, 0, 70, 0], { stroke: '#4A3228', strokeWidth: 1, opacity: 0.3 })
      const cross2 = new fabric.Line([0, -70, 0, 70], { stroke: '#4A3228', strokeWidth: 1, opacity: 0.3 })
      const group = new fabric.Group([...rings, cross1, cross2], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },

  // ─── DECORATIVE ─────────────────────────────────────────────────────────────
  {
    id: 'floral_border',
    label: 'Floral Border',
    icon: '✿',
    category: 'Decorative',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 60, h = canvas.height - 60
      const rect = new fabric.Rect({ width: w, height: h, fill: 'transparent', stroke: '#C96A3D', strokeWidth: 2, rx: 8, ry: 8, strokeDashArray: [6, 3], originX: 'center', originY: 'center' })
      const positions = [
        { x: -w/2, y: -h/2 }, { x: 0, y: -h/2 - 10 }, { x: w/2, y: -h/2 },
        { x: w/2 + 10, y: 0 }, { x: w/2, y: h/2 },
        { x: 0, y: h/2 + 10 }, { x: -w/2, y: h/2 }, { x: -w/2 - 10, y: 0 },
      ]
      const flowerObjs = ['✿', '❀', '✿', '❀', '✿', '❀', '✿', '❀'].map((f, i) =>
        new fabric.IText(f, { left: positions[i].x, top: positions[i].y, originX: 'center', originY: 'center', fontSize: 18, fill: '#C96A3D' })
      )
      const group = new fabric.Group([rect, ...flowerObjs], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
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
      const w = canvas.width - 40, h = canvas.height - 40, size = 45
      const corners = [
        new fabric.Line([-w/2, -h/2, -w/2 + size, -h/2], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([-w/2, -h/2, -w/2, -h/2 + size], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([w/2, -h/2, w/2 - size, -h/2], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([w/2, -h/2, w/2, -h/2 + size], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([w/2, h/2, w/2 - size, h/2], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([w/2, h/2, w/2, h/2 - size], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([-w/2, h/2, -w/2 + size, h/2], { stroke: '#C96A3D', strokeWidth: 2.5 }),
        new fabric.Line([-w/2, h/2, -w/2, h/2 - size], { stroke: '#C96A3D', strokeWidth: 2.5 }),
      ]
      const group = new fabric.Group(corners, { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'scroll_banner',
    label: 'Scroll Banner',
    icon: '📜',
    category: 'Decorative',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const banner = new fabric.Path('M -110 -18 C -110 -18, -90 -30, -60 -18 L 60 -18 C 90 -30, 110 -18, 110 -18 L 110 18 C 110 18, 90 30, 60 18 L -60 18 C -90 30, -110 18, -110 18 Z', {
        fill: '#D8C3A5', stroke: '#4A3228', strokeWidth: 1.5, originX: 'center', originY: 'center'
      })
      const text = new fabric.IText('YOUR BRAND NAME', { originX: 'center', originY: 'center', fontSize: 14, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', charSpacing: 80 })
      const leftCurl = new fabric.Path('M -110 -18 C -130 -10, -130 10, -110 18', { fill: '#bf953f', stroke: '#4A3228', strokeWidth: 1, originX: 'center', originY: 'center' })
      const rightCurl = new fabric.Path('M 110 -18 C 130 -10, 130 10, 110 18', { fill: '#bf953f', stroke: '#4A3228', strokeWidth: 1, originX: 'center', originY: 'center' })
      const group = new fabric.Group([banner, leftCurl, rightCurl, text], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },

  // ─── GEOMETRIC ──────────────────────────────────────────────────────────────
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
          diamonds.push(new fabric.Rect({ left: (col - 2) * 110, top: (row - 1.5) * 80, originX: 'center', originY: 'center', width: 30, height: 30, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1, angle: 45 }))
        }
      }
      const group = new fabric.Group(diamonds, { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'chevron',
    label: 'Chevron Lines',
    icon: '❯❯',
    category: 'Geometric',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const colors = ['#4A3228', '#C96A3D', '#D8C3A5']
      const lines = []
      for (let i = 0; i < 5; i++) {
        lines.push(new fabric.Line([-canvas.width/2, (i - 2) * 60, canvas.width/2, (i - 2) * 60], { stroke: colors[i % 3], strokeWidth: i % 2 === 0 ? 2 : 1, opacity: 0.5, originX: 'center', originY: 'center' }))
      }
      const group = new fabric.Group(lines, { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'quilt_pattern',
    label: 'Quilt Pattern',
    icon: '⊞',
    category: 'Geometric',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const cells = []
      const cols = 6, rows = 4, cw = 90, ch = 70
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - cols/2 + 0.5) * cw
          const y = (r - rows/2 + 0.5) * ch
          cells.push(new fabric.Rect({ left: x, top: y, width: cw - 4, height: ch - 4, originX: 'center', originY: 'center', fill: 'transparent', stroke: '#4A3228', strokeWidth: 0.8, rx: 3, ry: 3 }))
          // Diagonal accent
          cells.push(new fabric.Line([x - cw/2 + 4, y - ch/2 + 4, x + cw/2 - 4, y + ch/2 - 4], { stroke: '#C96A3D', strokeWidth: 0.5, opacity: 0.5 }))
        }
      }
      const group = new fabric.Group(cells, { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },

  // ─── ARTISAN ────────────────────────────────────────────────────────────────
  {
    id: 'arabesque',
    label: 'Arabesque',
    icon: '☽',
    category: 'Artisan',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const petals = []
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        petals.push(new fabric.Ellipse({ left: Math.cos(angle) * 70, top: Math.sin(angle) * 70, originX: 'center', originY: 'center', rx: 20, ry: 40, fill: 'transparent', stroke: '#4A3228', strokeWidth: 1.2, angle: (i / 8) * 360 }))
      }
      const center = new fabric.Circle({ radius: 10, fill: '#C96A3D', originX: 'center', originY: 'center' })
      const group = new fabric.Group([...petals, center], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'mughal_border',
    label: 'Mughal Border',
    icon: '❋',
    category: 'Artisan',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const w = canvas.width - 50, h = canvas.height - 50
      const outerBorder = new fabric.Rect({ width: w, height: h, rx: 6, ry: 6, fill: 'transparent', stroke: '#4A3228', strokeWidth: 2, originX: 'center', originY: 'center' })
      const innerBorder = new fabric.Rect({ width: w - 18, height: h - 18, rx: 4, ry: 4, fill: 'transparent', stroke: '#C96A3D', strokeWidth: 1, originX: 'center', originY: 'center' })
      const motifs = []
      const positions = [
        { x: 0, y: -h/2 + 4 }, { x: 0, y: h/2 - 4 },
        { x: -w/2 + 4, y: 0 }, { x: w/2 - 4, y: 0 },
        { x: -w/4, y: -h/2 + 4 }, { x: w/4, y: -h/2 + 4 },
        { x: -w/4, y: h/2 - 4 }, { x: w/4, y: h/2 - 4 },
      ]
      positions.forEach(p => {
        motifs.push(new fabric.IText('❋', { left: p.x, top: p.y, fontSize: 14, fill: '#C96A3D', originX: 'center', originY: 'center' }))
      })
      const group = new fabric.Group([outerBorder, innerBorder, ...motifs], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
  {
    id: 'workshop_mark',
    label: 'Workshop Mark',
    icon: '✦',
    category: 'Artisan',
    apply: (canvas) => {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const hexagon = new fabric.Path('M 0 -70 L 60 -35 L 60 35 L 0 70 L -60 35 L -60 -35 Z', {
        fill: 'transparent', stroke: '#4A3228', strokeWidth: 2.5, originX: 'center', originY: 'center'
      })
      const innerHex = new fabric.Path('M 0 -58 L 50 -29 L 50 29 L 0 58 L -50 29 L -50 -29 Z', {
        fill: 'transparent', stroke: '#4A3228', strokeWidth: 1, strokeDashArray: [3, 3], originX: 'center', originY: 'center'
      })
      const icon = new fabric.IText('✦', { fontSize: 30, fill: '#C96A3D', originX: 'center', originY: 'center', top: -12 })
      const name = new fabric.IText('WORKSHOP', { top: 20, fontSize: 11, fontFamily: 'Georgia', fontWeight: 'bold', fill: '#4A3228', originX: 'center', originY: 'center', charSpacing: 80 })
      const group = new fabric.Group([hexagon, innerHex, icon, name], { left: cx, top: cy, originX: 'center', originY: 'center' })
      canvas.add(group); canvas.setActiveObject(group); canvas.renderAll()
    }
  },
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

  const categories = ['Stamps', 'Classic', 'Leather Craft', 'Decorative', 'Artisan', 'Geometric']

  return (
    <div className="rounded-2xl border border-sand/50 bg-white p-4 shadow-sm space-y-5 h-[420px] overflow-y-auto custom-scrollbar animate-in fade-in duration-200">
      <div className="sticky top-0 bg-white z-10 pb-2 border-b border-sand/30 mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-walnut/60 flex items-center gap-2">
          <span className="text-terracotta">✦</span> Design Templates &amp; Stamps
        </h3>
        <p className="text-[10px] text-walnut/40 mt-1 font-semibold leading-tight">
          Click any template to add it to the canvas. Move, resize, rotate, or ungroup for custom editing.
        </p>
      </div>

      {categories.map(cat => {
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
