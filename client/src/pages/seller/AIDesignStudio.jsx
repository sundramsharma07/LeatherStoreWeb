import { AlignCenter, AlignLeft, AlignRight, Circle, Image as ImageIcon, Save, Square, Star, Trash2, Type, UploadCloud, Grid, Ruler, Eye, EyeOff, Palette, Settings, Compass, Undo, Redo, Lock, Unlock, Download, RefreshCw, ZoomIn, ZoomOut, Layers } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as fabric from 'fabric'
import api, { getApiError } from '../../api/client'
import { DesignTemplatesPanel, DESIGN_TEMPLATES } from '../../components/seller/DesignTemplates'

const FONTS = ['Georgia', 'Arial', 'Playfair Display', 'Times New Roman', 'Great Vibes', 'Italianno', 'Allura', 'Sacramento', 'Pinyon Script', 'Cinzel', 'Montserrat']
const PRESET_COLORS = ['#4A3228', '#C96A3D', '#D8C3A5', '#FAF7F2', '#66734F', '#1a1a1a', '#ffffff', '#8c5230', '#e9c46a', '#2a9d8f']

const LEATHER_COLORS = [
  { id: 'tan', label: 'Natural Tan', color: '#d2a679' },
  { id: 'honey', label: 'Honey Gold', color: '#e5a93b' },
  { id: 'cognac', label: 'Classic Cognac', color: '#9e5a24' },
  { id: 'mahogany', label: 'Rich Mahogany', color: '#5c2e16' },
  { id: 'oxblood', label: 'Oxblood Red', color: '#611a15' },
  { id: 'forest', label: 'Forest Green', color: '#2d4234' },
  { id: 'midnight', label: 'Midnight Blue', color: '#1c2838' },
  { id: 'onyx', label: 'Onyx Black', color: '#171717' },
  { id: 'sand', label: 'Desert Sand', color: '#dfcfb7' },
]

const TEXTURES = [
  { id: 'none', label: 'Smooth / Nappa', desc: 'Sleek premium uniform leather' },
  { id: 'pebbled', label: 'Pebble Grain', desc: 'Fine organic pebble grain pattern' },
  { id: 'saffiano', label: 'Saffiano', desc: 'Luxury diagonal cross-hatch texture' },
  { id: 'croco', label: 'Croco Hide', desc: 'Distinct alligator scale structure' },
  { id: 'suede', label: 'Velvet Suede', desc: 'Soft matte brushed velvet texture' },
  { id: 'distressed', label: 'Crazy Horse', desc: 'Rustic vintage distressed waxy look' },
]

const STITCH_COLORS = [
  { label: 'Linen Cream', value: '#F5EDE4' },
  { label: 'Amber Gold', value: '#bf953f' },
  { label: 'Coal Black', value: '#1a1a1a' },
  { label: 'Crimson Red', value: '#991b1b' },
  { label: 'Bleached White', value: '#ffffff' },
]

const TOUR_STEPS = [
  {
    target: 'product-selector',
    title: '🎒 1. Select Base Template',
    content: 'Start by selecting a base leather product template (like a wallet, cardholder, or belt) from our workshop catalog.'
  },
  {
    target: 'tab-material',
    title: '🎨 2. Design Leather Material Pro',
    content: 'Click here to choose real-world leather skins (Saffiano, Pebble, Suede, Croco) and gorgeous colors directly from our premium tannery swatches.'
  },
  {
    target: 'tab-elements',
    title: '🛠 3. Add Custom Monograms & Shapes',
    content: 'Type custom initials, draw geometry, or upload your vector logo to overlay on the leather.'
  },
  {
    target: 'tab-templates',
    title: '💮 4. Apply Stamping Templates',
    content: 'Drag-and-drop pre-designed artisan badges, "Genuine Leather" markings, or classic workshop logos.'
  },
  {
    target: 'stitching-generator',
    title: '🪡 5. Auto Stitching Generator',
    content: 'Simulate physical linen thread stitching along the borders of your piece with customizable spacing and stitch styles.'
  },
  {
    target: 'precision-assistants',
    title: '📏 6. Physical Ruler & Alignment',
    content: 'Enter real-world centimeter specs. Toggle grids, center crosshairs, and millimeter rulers to size stamps perfectly.'
  },
  {
    target: 'save-button',
    title: '💾 7. Save to Workshop Gallery',
    content: 'Once your masterpiece is finalized, save the design to your gallery to prepare pattern stencils and physical stamps!'
  }
]

export function createLeatherPattern(textureId, color) {
  if (textureId === 'none' || !textureId) return color;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (textureId === 'pebbled') {
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const r = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const r = 0.5 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x + 0.8, y + 0.8, r, 0, Math.PI * 2);
      ctx.fill();
    }
    return canvas;
  }
  
  if (textureId === 'saffiano') {
    canvas.width = 16;
    canvas.height = 16;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 16, 16);
    
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(16, 16);
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(0, 16);
    ctx.stroke();
    return canvas;
  }
  
  if (textureId === 'croco') {
    canvas.width = 64;
    canvas.height = 64;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 64, 64);
    
    ctx.strokeStyle = 'rgba(0,0,0,0.22)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, 0, 64, 64);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.strokeRect(1.5, 1.5, 61, 61);
    return canvas;
  }
  
  if (textureId === 'suede') {
    canvas.width = 64;
    canvas.height = 64;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 64, 64);
    
    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    for(let i=0; i<500; i++) {
      ctx.fillRect(Math.random()*64, Math.random()*64, 1.2, 2.5 + Math.random()*3);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    for(let i=0; i<500; i++) {
      ctx.fillRect(Math.random()*64, Math.random()*64, 1, 1.5 + Math.random()*2);
    }
    return canvas;
  }
  
  if (textureId === 'distressed') {
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 128);
    
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random()*128, 0);
      ctx.bezierCurveTo(Math.random()*128, 40, Math.random()*128, 80, Math.random()*128, 128);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, Math.random()*128);
      ctx.bezierCurveTo(40, Math.random()*128, 80, Math.random()*128, 128, Math.random()*128);
      ctx.stroke();
    }
    return canvas;
  }
  
  return color;
}

export default function AIDesignStudio() {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('elements') // elements | templates | material | properties

  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [activeObject, setActiveObject] = useState(null)
  const [updateTrigger, setUpdateTrigger] = useState(0)

  // Undo / Redo History States
  const historyRef = useRef([])
  const historyIndexRef = useRef(-1)
  const isHandlingHistoryRef = useRef(false)
  const saveHistoryStateRef = useRef(() => {})

  // Leather Material Pro States
  const [bgTexture, setBgTexture] = useState('none')
  const [bgLeatherColor, setBgLeatherColor] = useState('#d2a679') // Tan
  const [showTemplate, setShowTemplate] = useState(true)
  
  // Enterprise Assistant States
  const [showGrid, setShowGrid] = useState(false)
  const [showCenterLines, setShowCenterLines] = useState(false)
  const [showRulers, setShowRulers] = useState(false)
  const [itemWidthCm, setItemWidthCm] = useState(15)
  const [itemHeightCm, setItemHeightCm] = useState(10)

  // Stitching Generator States
  const [stitchType, setStitchType] = useState('single')
  const [stitchColor, setStitchColor] = useState('#F5EDE4')
  const [stitchSpacing, setStitchSpacing] = useState('medium')

  // Interactive Onboarding Tour State
  const [tourStep, setTourStep] = useState(() => {
    return localStorage.getItem('leathercraft_studio_tour_completed') ? -1 : 0
  })

  // Advanced real-time zoom & layer states
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [layersList, setLayersList] = useState([])

  useEffect(() => {
    let active = true
    async function loadProducts() {
      try {
        const { data } = await api.get('/products')
        if (active) {
          const p = data.products || []
          setProducts(p)
          setSelectedProductId(current => current || String(p[0]?._id || p[0]?.id || ''))
        }
      } catch (e) {
        if (active) setError(getApiError(e))
      } finally {
        if (active) setLoadingProducts(false)
      }
    }
    loadProducts()
    return () => { active = false }
  }, [])

  // Guarantee canvas mounts successfully on DOM reference load & setup history/keyboard listeners
  useEffect(() => {
    if (!canvasRef.current) return

    const c = new fabric.Canvas(canvasRef.current, {
      width: 720, height: 480,
      backgroundColor: '#f5ede4',
      preserveObjectStacking: true,
    })

    const updateCSSScale = () => {
      const wrapper = document.getElementById('canvas-container-wrapper')
      const scaleWrapper = document.getElementById('scale-wrapper')
      if (wrapper && scaleWrapper) {
        const availableWidth = wrapper.parentElement?.clientWidth || wrapper.clientWidth
        const availableHeight = window.innerHeight < 680
          ? Math.max(260, window.innerHeight * 0.5)
          : window.innerHeight < 860
            ? Math.max(390, window.innerHeight * 0.62)
            : 480
        const scale = Math.min(1, availableWidth / 720, availableHeight / 480)
        wrapper.style.width = `${Math.floor(720 * scale)}px`
        wrapper.style.height = `${Math.floor(480 * scale)}px`
        scaleWrapper.style.transform = `scale(${scale})`
      }
    }
    window.addEventListener('resize', updateCSSScale)
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => requestAnimationFrame(updateCSSScale))
      : null
    const wrapperParent = document.getElementById('canvas-container-wrapper')?.parentElement
    if (resizeObserver && wrapperParent) resizeObserver.observe(wrapperParent)
    setTimeout(updateCSSScale, 50)
    


    const onSel = (e) => { setActiveObject(e.selected?.[0] || null); setUpdateTrigger(p => p + 1) }
    c.on('selection:created', onSel)
    c.on('selection:updated', onSel)
    c.on('selection:cleared', () => { setActiveObject(null); setUpdateTrigger(p => p + 1) })
    c.on('object:modified', () => { 
        setActiveObject(c.getActiveObject()); 
        setUpdateTrigger(p => p + 1); 
        saveHistoryStateRef.current(); 
    })

    // Smart Snapping Guidelines (Canva-style)
    let isDragging = false;
    c.on('mouse:down', () => { isDragging = true; });
    c.on('mouse:up', () => { 
        isDragging = false; 
        const active = c.getActiveObject();
        if (active) { active.snappedX = false; active.snappedY = false; }
        c.renderAll(); 
    });

    c.on('object:moving', (e) => {
        const obj = e.target;
        const cx = 720 / 2;
        const cy = 480 / 2;
        const snapZone = 12;

        obj.snappedX = false;
        obj.snappedY = false;

        // Snap X
        if (Math.abs(obj.left - cx) < snapZone) {
            obj.set({ left: cx }).setCoords();
            obj.snappedX = true;
        }
        // Snap Y
        if (Math.abs(obj.top - cy) < snapZone) {
            obj.set({ top: cy }).setCoords();
            obj.snappedY = true;
        }
    });

    c.on('after:render', (opt) => {
        if (!isDragging) return;
        
        const active = c.getActiveObject();
        if (active && (active.snappedX || active.snappedY)) {
            const cx = 720 / 2;
            const cy = 480 / 2;
            const ctx = opt.ctx;
            const zoom = c.getZoom();
            
            ctx.save();
            ctx.strokeStyle = '#e91e63'; // Canva pink
            ctx.lineWidth = 1;

            if (active.snappedX) {
                ctx.beginPath();
                ctx.moveTo(cx * zoom, 0);
                ctx.lineTo(cx * zoom, 480 * zoom);
                ctx.stroke();
            }
            if (active.snappedY) {
                ctx.beginPath();
                ctx.moveTo(0, cy * zoom);
                ctx.lineTo(720 * zoom, cy * zoom);
                ctx.stroke();
            }
            ctx.restore();
        }
    });
    
    // Snapshots state shifts onto the history stack
    const onCanvasChanged = () => {
      if (isHandlingHistoryRef.current) return
      const stateJson = JSON.stringify(c.toJSON())
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1)
      newHistory.push(stateJson)
      if (newHistory.length > 50) newHistory.shift()
      historyRef.current = newHistory
      historyIndexRef.current = newHistory.length - 1
      setUpdateTrigger(p => p + 1)
      
      // Sync active layers list
      setLayersList(c.getObjects().map((obj, idx) => ({
        id: idx,
        type: obj.type,
        text: obj.text || obj.name || `Vector ${obj.type}`,
        ref: obj,
        visible: obj.visible,
        locked: !obj.selectable
      })))
    }

    c.on('object:added', onCanvasChanged)
    c.on('object:removed', onCanvasChanged)
    c.on('object:modified', onCanvasChanged)

    // Keyboard controls (Delete / Backspace removes pieces, Ctrl+Z / Ctrl+Y redirects)
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const active = c.getActiveObject()
        if (active) {
          c.remove(active)
          c.discardActiveObject()
          c.renderAll()
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        document.getElementById('studio-undo-btn')?.click()
      } else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        document.getElementById('studio-redo-btn')?.click()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    
    setCanvas(c)

    // Save initial state tick
    setTimeout(() => {
      onCanvasChanged()
    }, 150)
    
    return () => {
      c.dispose()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateCSSScale)
      resizeObserver?.disconnect()
    }
  }, [])

  const selectedProduct = useMemo(
    () => products.find(p => String(p._id || p.id) === String(selectedProductId)),
    [products, selectedProductId]
  )

  // Recalculates and renders background leather color, pattern, and overlay template image
  useEffect(() => {
    if (!canvas) return
    
    // Reset background elements
    canvas.backgroundImage = null
    canvas.backgroundColor = '#f5ede4'
    canvas.renderAll()

    // 1. Draw procedural leather texture onto canvas background
    const patternCanvas = createLeatherPattern(bgTexture, bgLeatherColor)
    if (typeof patternCanvas === 'string') {
      canvas.backgroundColor = patternCanvas
    } else {
      const pattern = new fabric.Pattern({
        source: patternCanvas,
        repeat: 'repeat'
      })
      canvas.backgroundColor = pattern
    }
    canvas.renderAll()

    // 2. Load and overlay template outline image on top
    if (showTemplate && selectedProduct) {
      let url = selectedProduct.image_url
      if (url.includes('localhost') || url.includes('127.0.0.1'))
        url = url.replace(/^https?:\/\/[^/]+/, '')
      
      fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' })
        .then(img => {
          const scale = Math.min(canvas.getWidth() / img.width, canvas.getHeight() / img.height)
          img.set({
            scaleX: scale,
            scaleY: scale,
            originX: 'center',
            originY: 'center',
            top: canvas.getHeight() / 2,
            left: canvas.getWidth() / 2,
            selectable: false,
            evented: false,
            opacity: 0.82
          })
          canvas.backgroundImage = img
          canvas.renderAll()
        })
        .catch(e => console.error(e))
    } else {
      canvas.renderAll()
    }
  }, [canvas, selectedProduct, bgTexture, bgLeatherColor, showTemplate])

  // Canvas Quick Action Handlers
  const saveHistoryState = () => {
    if (!canvas || isHandlingHistoryRef.current) return
    const stateJson = JSON.stringify(canvas.toJSON())
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1)
    newHistory.push(stateJson)
    if (newHistory.length > 50) newHistory.shift()
    historyRef.current = newHistory
    historyIndexRef.current = newHistory.length - 1
    setUpdateTrigger(p => p + 1)
  }
  saveHistoryStateRef.current = saveHistoryState

  const undo = () => {
    if (!canvas || historyIndexRef.current <= 0) return
    isHandlingHistoryRef.current = true
    historyIndexRef.current -= 1
    const stateJson = historyRef.current[historyIndexRef.current]
    canvas.loadFromJSON(stateJson).then(() => {
      canvas.renderAll()
      isHandlingHistoryRef.current = false
      setUpdateTrigger(p => p + 1)
    })
  }

  const redo = () => {
    if (!canvas || historyIndexRef.current >= historyRef.current.length - 1) return
    isHandlingHistoryRef.current = true
    historyIndexRef.current += 1
    const stateJson = historyRef.current[historyIndexRef.current]
    canvas.loadFromJSON(stateJson).then(() => {
      canvas.renderAll()
      isHandlingHistoryRef.current = false
      setUpdateTrigger(p => p + 1)
    })
  }

  const ungroupActiveObject = () => {
    if (!canvas || !activeObject || activeObject.type !== 'group') return
    
    isHandlingHistoryRef.current = true
    
    // In Fabric.js v6, use toActiveSelection to ungroup
    if (typeof activeObject.toActiveSelection === 'function') {
      activeObject.toActiveSelection()
    } else {
      // Fallback for older versions if needed, though this shouldn't be reached
      const items = activeObject.getObjects()
      activeObject.removeAll()
      canvas.remove(activeObject)
      items.forEach(obj => canvas.add(obj))
    }
    
    isHandlingHistoryRef.current = false
    saveHistoryState()
    canvas.renderAll()
    setUpdateTrigger(p => p + 1)
  }

  const groupSelection = () => {
    if (!canvas || !activeObject || activeObject.type !== 'activeselection') return
    
    isHandlingHistoryRef.current = true
    const activeSelection = activeObject
    const objects = activeSelection.getObjects()
    
    objects.forEach(obj => {
      canvas.remove(obj)
    })
    
    const group = new fabric.Group(objects, {
      canvas,
      left: activeSelection.left,
      top: activeSelection.top,
      originX: 'center',
      originY: 'center'
    })
    
    canvas.add(group)
    canvas.setActiveObject(group)
    
    isHandlingHistoryRef.current = false
    saveHistoryState()
    canvas.renderAll()
    setUpdateTrigger(p => p + 1)
  }

  const addText = () => {
    if (!canvas) return
    const t = new fabric.IText('Your Text', {
      left: 720 / 2, top: 480 / 2,
      originX: 'center', originY: 'center',
      fontFamily: 'Georgia', fill: '#4A3228', fontSize: 36,
    })
    canvas.add(t); canvas.setActiveObject(t); canvas.renderAll(); saveHistoryState();
  }

  const addClipart = (clipart) => {
    if (!canvas) return
    const t = new fabric.IText(clipart.symbol, {
      left: 720 / 2, top: 480 / 2,
      originX: 'center', originY: 'center',
      fontFamily: clipart.font, fill: '#4A3228', fontSize: 64,
      name: clipart.name
    })
    canvas.add(t); canvas.setActiveObject(t); canvas.renderAll(); saveHistoryState();
  }

  const downloadPNG = () => {
    if (!canvas) return
    canvas.discardActiveObject()
    canvas.renderAll()
    const dataURL = canvas.toDataURL({ format: 'png', quality: 1.0 })
    const link = document.createElement('a')
    link.download = `corium-royale-design-${selectedProductId || 'raw'}.png`
    link.href = dataURL
    link.click()
  }

  const resetWorkspace = () => {
    if (!canvas) return
    if (window.confirm("Are you sure you want to clear all customization layers and reset your design?")) {
      canvas.clear()
      canvas.backgroundColor = '#f5ede4'
      canvas.renderAll()
      
      // Re-apply background
      const patternCanvas = createLeatherPattern(bgTexture, bgLeatherColor)
      if (typeof patternCanvas === 'string') {
        canvas.backgroundColor = patternCanvas
      } else {
        const pattern = new fabric.Pattern({
          source: patternCanvas,
          repeat: 'repeat'
        })
        canvas.backgroundColor = pattern
      }
      if (showTemplate && selectedProduct) {
        let url = selectedProduct.image_url
        if (url.includes('localhost') || url.includes('127.0.0.1'))
          url = url.replace(/^https?:\/\/[^/]+/, '')
        fabric.FabricImage.fromURL(url, { crossOrigin: 'anonymous' }).then(img => {
          const scale = Math.min(canvas.getWidth() / img.width, canvas.getHeight() / img.height)
          img.set({
            scaleX: scale, scaleY: scale,
            originX: 'center', originY: 'center',
            top: canvas.getHeight() / 2, left: canvas.getWidth() / 2,
            selectable: false, evented: false, opacity: 0.82
          })
          canvas.backgroundImage = img
          canvas.renderAll()
        })
      }
      saveHistoryState()
    }
  }

  const handleZoom = (factor) => {
    if (!canvas) return
    let newZoom = zoomLevel * factor
    if (newZoom < 0.5) newZoom = 0.5
    if (newZoom > 3.0) newZoom = 3.0
    setZoomLevel(newZoom)
    canvas.setZoom(newZoom)
    canvas.renderAll()
  }

  const resetZoom = () => {
    if (!canvas) return
    setZoomLevel(1.0)
    canvas.setZoom(1.0)
    canvas.renderAll()
  }

  const addShape = (type) => {
    if (!canvas) return
    let shape
    const cx = 720 / 2
    const cy = 480 / 2
    if (type === 'rect') shape = new fabric.Rect({ left: cx, top: cy, originX: 'center', originY: 'center', width: 140, height: 100, fill: 'transparent', stroke: '#4A3228', strokeWidth: 3, rx: 6 })
    else if (type === 'circle') shape = new fabric.Circle({ left: cx, top: cy, originX: 'center', originY: 'center', radius: 60, fill: 'transparent', stroke: '#C96A3D', strokeWidth: 3 })
    else if (type === 'triangle') shape = new fabric.Triangle({ left: cx, top: cy, originX: 'center', originY: 'center', width: 120, height: 110, fill: 'transparent', stroke: '#4A3228', strokeWidth: 3 })
    else if (type === 'line') shape = new fabric.Line([50, 0, 250, 0], { left: cx, top: cy, originX: 'center', originY: 'center', stroke: '#4A3228', strokeWidth: 3 })
    if (shape) { canvas.add(shape); canvas.setActiveObject(shape); canvas.renderAll(); saveHistoryState(); }
  }

  const addImage = (e) => {
    const file = e.target.files?.[0]
    if (!file || !canvas) return
    const reader = new FileReader()
    reader.onload = async (f) => {
      try {
        const img = await fabric.FabricImage.fromURL(f.target.result)
        img.set({ left: 720 / 2, top: 480 / 2, originX: 'center', originY: 'center' })
        img.scaleToWidth(180)
        canvas.add(img); canvas.setActiveObject(img); canvas.renderAll(); saveHistoryState();
      } catch (e) { console.error(e) }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const deleteActive = () => {
    if (!canvas || !activeObject) return
    canvas.remove(activeObject); canvas.discardActiveObject(); canvas.renderAll(); setActiveObject(null); saveHistoryState();
  }

  const update = (props) => {
    if (!canvas || !activeObject) return
    activeObject.set(props); canvas.renderAll(); setUpdateTrigger(p => p + 1); saveHistoryState();
  }

  const applyTextureToShape = (textureId, color) => {
    if (!canvas || !activeObject) return
    const patternCanvas = createLeatherPattern(textureId, color)
    if (typeof patternCanvas === 'string') {
      activeObject.set({ fill: patternCanvas })
    } else {
      const pattern = new fabric.Pattern({
        source: patternCanvas,
        repeat: 'repeat'
      })
      activeObject.set({ fill: pattern })
    }
    canvas.renderAll()
    setUpdateTrigger(p => p + 1)
    saveHistoryState()
  }

  const applyDebossStyle = (styleName) => {
    if (!canvas || !activeObject || activeObject.type !== 'i-text') return
    
    if (styleName === 'blind') {
      activeObject.set({
        fill: 'rgba(0, 0, 0, 0.45)',
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.55)',
          blur: 2.5,
          offsetX: -1.5,
          offsetY: -1.5
        })
      })
    } else if (styleName === 'gold') {
      const gradient = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: activeObject.width || 200, y2: 0 },
        colorStops: [
          { offset: 0, color: '#bf953f' },
          { offset: 0.25, color: '#fcf6ba' },
          { offset: 0.5, color: '#b38728' },
          { offset: 0.75, color: '#fbf5b7' },
          { offset: 1, color: '#aa771c' }
        ]
      })
      activeObject.set({
        fill: gradient,
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.35)',
          blur: 2.5,
          offsetX: 1.5,
          offsetY: 1.5
        })
      })
    } else if (styleName === 'silver') {
      const gradient = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: activeObject.width || 200, y2: 0 },
        colorStops: [
          { offset: 0, color: '#cfd8dc' },
          { offset: 0.25, color: '#eceff1' },
          { offset: 0.5, color: '#b0bec5' },
          { offset: 0.75, color: '#eceff1' },
          { offset: 1, color: '#90a4ae' }
        ]
      })
      activeObject.set({
        fill: gradient,
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.35)',
          blur: 2.5,
          offsetX: 1.5,
          offsetY: 1.5
        })
      })
    } else if (styleName === 'burned') {
      activeObject.set({
        fill: '#1a0b02',
        shadow: new fabric.Shadow({
          color: '#e67e22',
          blur: 5.5,
          offsetX: 0,
          offsetY: 0
        })
      })
    }
    
    canvas.renderAll()
    setUpdateTrigger(p => p + 1)
    saveHistoryState()
  }

  const addStitchingBorder = () => {
    if (!canvas) return
    const padding = 26
    const w = canvas.getWidth() - padding * 2
    const h = canvas.getHeight() - padding * 2
    
    let dash = [8, 5]
    if (stitchSpacing === 'fine') dash = [4, 3]
    if (stitchSpacing === 'bold') dash = [12, 7]
    
    const cx = canvas.getWidth() / 2
    const cy = canvas.getHeight() / 2

    if (stitchType === 'double') {
      const s1 = new fabric.Rect({
        left: cx, top: cy, originX: 'center', originY: 'center',
        width: w, height: h, fill: 'transparent',
        stroke: stitchColor, strokeWidth: 1.5, strokeDashArray: dash, rx: 12, ry: 12
      })
      const s2 = new fabric.Rect({
        left: cx, top: cy, originX: 'center', originY: 'center',
        width: w - 8, height: h - 8, fill: 'transparent',
        stroke: stitchColor, strokeWidth: 1.5, strokeDashArray: dash, rx: 10, ry: 10
      })
      const group = new fabric.Group([s1, s2], {
        selectable: true,
        evented: true,
        name: 'stitching_border'
      })
      canvas.add(group)
      canvas.setActiveObject(group)
    } else {
      const sRect = new fabric.Rect({
        left: cx, top: cy, originX: 'center', originY: 'center',
        width: w, height: h, fill: 'transparent',
        stroke: stitchColor, strokeWidth: 2, strokeDashArray: dash, rx: 12, ry: 12,
        selectable: true,
        evented: true,
        name: 'stitching_border'
      })
      canvas.add(sRect)
      canvas.setActiveObject(sRect)
    }
    canvas.renderAll()
    saveHistoryState()
  }

  const handleSave = async () => {
    if (!canvas) return
    setSaving(true); setError(''); setNotice('')
    canvas.discardActiveObject(); canvas.renderAll()
    try {
      const dataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.85 })
      const byteStr = atob(dataURL.split(',')[1])
      const mime = dataURL.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteStr.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteStr.length; i++) ia[i] = byteStr.charCodeAt(i)
      const blob = new Blob([ab], { type: mime })
      const form = new FormData()
      
      const pId = selectedProduct?._id || selectedProduct?.id || ''
      const origImg = selectedProduct?.image_url || ''
      
      if (pId) form.append('product_id', pId)
      form.append('original_image', origImg)
      form.append('design_image', blob, 'design.jpg')
      await api.post('/design/save', form)
      setNotice('✦ Masterpiece saved to your workshop gallery!')
    } catch (e) {
      if (e.response?.status === 422) setError(Object.values(e.response.data.errors || {}).flat().join(', ') || e.response.data.message || 'Validation failed')
      else setError(getApiError(e))
    } finally { setSaving(false) }
  }

  // Onboarding Tour Handlers
  const handleTourNext = () => {
    if (tourStep === TOUR_STEPS.length - 1) {
      setTourStep(-1)
      localStorage.setItem('leathercraft_studio_tour_completed', 'true')
    } else {
      const nextStep = tourStep + 1
      setTourStep(nextStep)
      if (nextStep === 1) setActiveTab('material')
      else if (nextStep === 2) setActiveTab('elements')
      else if (nextStep === 3) setActiveTab('templates')
      else if (nextStep === 4) setActiveTab('material')
      else if (nextStep === 5) setActiveTab('material')
    }
  }

  const handleTourPrev = () => {
    if (tourStep > 0) {
      const prevStep = tourStep - 1
      setTourStep(prevStep)
      if (prevStep === 1) setActiveTab('material')
      else if (prevStep === 2) setActiveTab('elements')
      else if (prevStep === 3) setActiveTab('templates')
      else if (prevStep === 4) setActiveTab('material')
      else if (prevStep === 5) setActiveTab('material')
    }
  }

  const [tourStyle, setTourStyle] = useState({ bottom: '2rem', right: '2rem' })

  useEffect(() => {
    if (tourStep >= 0 && TOUR_STEPS[tourStep]) {
      const targetId = TOUR_STEPS[tourStep].target
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (window.innerWidth < 768) {
            setTourStyle({ bottom: '2rem', left: '1rem', right: '1rem' })
          } else {
            let topPos = rect.bottom + 15
            let leftPos = rect.left
            if (topPos + 250 > window.innerHeight) {
               topPos = Math.max(20, rect.top - 200)
            }
            if (leftPos + 360 > window.innerWidth) {
               leftPos = window.innerWidth - 380
            }
            setTourStyle({ top: `${topPos}px`, left: `${leftPos}px` })
          }
        } else {
          setTourStyle({ bottom: '2rem', right: '2rem' })
        }
      }, 100)
    }
  }, [tourStep, activeTab])

  const isHighlighted = (targetId) => {
    if (tourStep < 0) return false
    return TOUR_STEPS[tourStep].target === targetId
  }

  const isText = activeObject?.type === 'i-text'
  const isShape = activeObject?.type === 'rect' || activeObject?.type === 'circle' || activeObject?.type === 'triangle'

  return (
    <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-500 pb-10 relative min-w-0">
      
      {/* 🧭 Onboarding Tour Guide Popup */}
      {tourStep >= 0 && (
        <div 
          style={tourStyle}
          className="fixed z-50 w-full max-w-[340px] rounded-2xl border-2 border-terracotta bg-white/95 backdrop-blur-md p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ring-4 ring-terracotta/10 transition-all"
        >
          <div className="flex items-center justify-between border-b border-sand pb-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta flex items-center gap-1.5 animate-pulse">
              <Compass size={14} className="text-terracotta" /> Onboarding Tour
            </span>
            <button 
              onClick={() => { setTourStep(-1); localStorage.setItem('leathercraft_studio_tour_completed', 'true') }}
              className="text-xs font-bold text-walnut/40 hover:text-rose-500 uppercase tracking-wider transition-colors"
            >
              Skip
            </button>
          </div>
          <h4 className="text-sm font-serif font-extrabold text-walnut">{TOUR_STEPS[tourStep].title}</h4>
          <p className="text-xs text-walnut/70 mt-2 font-medium leading-relaxed">{TOUR_STEPS[tourStep].content}</p>
          
          <div className="flex items-center justify-between mt-5 pt-3 border-t border-sand/40">
            <span className="text-xs font-mono font-bold text-walnut/40">Step {tourStep + 1} of {TOUR_STEPS.length}</span>
            <div className="flex gap-2">
              {tourStep > 0 && (
                <button 
                  onClick={handleTourPrev} 
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-walnut/60 hover:bg-sand/15 rounded-lg border border-sand transition-all"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleTourNext} 
                className="px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-terracotta hover:bg-terracotta/90 text-white rounded-lg shadow-sm transition-all"
              >
                {tourStep === TOUR_STEPS.length - 1 ? 'Finish ✦' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700 flex items-center gap-3 shadow-sm"><span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />{error}</div>}
      {notice && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800 flex items-center gap-3 shadow-sm"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />{notice}</div>}

      {/* Main Studio Workspace - Canvas Screen on Top, Controls Beneath */}
      <div className="flex flex-col gap-3 sm:gap-4">
        
        {/* 1. Stretched Design Canvas Screen (AT THE TOP) - Gated for responsive height, luxury dark leather workshop styling */}
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-walnut bg-gradient-to-br from-[#1a110a] to-[#0c0805] p-2.5 sm:p-3 lg:p-4 xl:p-5 shadow-2xl overflow-hidden w-full relative min-w-0">
          
          {/* Subtle workshop leather stamp overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%),linear-gradient(-45deg,#ffffff_25%,transparent_25%)] bg-[size:30px_30px] pointer-events-none"></div>

          {/* Studio Clickable Action Bar (Z-index active, pointer events allowed) */}
          <div className="w-full flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2 mb-3 sm:mb-4 relative z-10 min-w-0">
            {/* Left side: Scale & Zoom info */}
            <div className="flex flex-wrap items-center gap-2 max-w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-walnut/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-lg select-none">
                Workspace • <span className="text-terracotta font-serif font-extrabold">{itemWidthCm}x{itemHeightCm}cm</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white bg-[#C96A3D]/25 backdrop-blur-md px-3 py-2.5 rounded-xl border border-terracotta/30 shadow-md">
                Zoom • {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Right side: Quick Action Toolbar */}
            <div className="flex max-w-full items-center justify-start gap-1.5 overflow-x-auto bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-sand/40 shadow-lg scrollbar-none">
              <button
                id="studio-undo-btn"
                onClick={undo}
                disabled={historyIndexRef.current <= 0}
                className="p-2 rounded-lg hover:bg-sand/20 disabled:opacity-40 text-walnut transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo size={15} />
              </button>
              <button
                id="studio-redo-btn"
                onClick={redo}
                disabled={historyIndexRef.current >= historyRef.current.length - 1}
                className="p-2 rounded-lg hover:bg-sand/20 disabled:opacity-40 text-walnut transition-colors border-r border-sand/40 pr-2.5 mr-1"
                title="Redo (Ctrl+Y)"
              >
                <Redo size={15} />
              </button>

              {/* Advanced Zoom Controls */}
              <button
                onClick={() => handleZoom(1.15)}
                className="p-2 rounded-lg hover:bg-sand/20 text-walnut transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                onClick={() => handleZoom(0.85)}
                className="p-2 rounded-lg hover:bg-sand/20 text-walnut transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-[8px] font-bold rounded-lg hover:bg-sand/20 text-walnut border border-sand transition-all mr-1.5"
                title="Reset Zoom Scale"
              >
                1:1
              </button>

              {/* Advanced PNG Download */}
              <button
                onClick={downloadPNG}
                className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors border border-teal-200"
                title="Export Design as High-Res Print-Ready PNG"
              >
                <Download size={15} />
              </button>

              {/* Reset Canvas */}
              <button
                onClick={resetWorkspace}
                className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors border border-amber-200"
                title="Clear customization layers and reset workspace"
              >
                <RefreshCw size={15} className="animate-spin-slow" />
              </button>

              <button
                onClick={deleteActive}
                disabled={!activeObject}
                className="p-2 rounded-lg hover:bg-rose-50 disabled:opacity-40 text-rose-500 transition-colors border-l border-sand/40 pl-2.5 ml-1"
                title="Delete Selection (Delete)"
              >
                <Trash2 size={15} />
              </button>

              {activeObject && activeObject.type === 'group' && (
                <button
                  onClick={ungroupActiveObject}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-terracotta/10 hover:bg-terracotta/20 text-terracotta rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ml-1 shadow-sm border border-terracotta/20"
                  title="Break template stamp into editable individual vector parts"
                >
                  <Unlock size={11} /> Ungroup Stamp
                </button>
              )}

              {activeObject && activeObject.type === 'activeselection' && (
                <button
                  onClick={groupSelection}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-walnut/10 hover:bg-walnut/20 text-walnut rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ml-1 shadow-sm border border-walnut/20"
                  title="Group selected individual parts into a unified stamp"
                >
                  <Lock size={11} /> Group Parts
                </button>
              )}
            </div>
          </div>

          <div className="flex w-full max-w-full items-start justify-center overflow-x-auto overflow-y-hidden transition-all duration-300 pb-2">
            {/* Vertical Left Ruler */}
            {showRulers && (
              <div className="hidden xl:flex w-10 flex-col justify-between text-[10px] font-mono font-bold text-walnut/50 bg-sand/15 border-r border-sand/30 select-none py-3 mr-3 text-right h-[480px] pr-2 mt-8 transition-all animate-in fade-in shrink-0">
                <span>0</span>
                <span>{Math.round(itemHeightCm * 2.5)}</span>
                <span>{Math.round(itemHeightCm * 5)}</span>
                <span>{Math.round(itemHeightCm * 7.5)}</span>
                <span>{Math.round(itemHeightCm * 10)}mm</span>
              </div>
            )}

            <div className="flex min-w-[280px] w-full max-w-[720px] flex-col items-center">
              {/* Horizontal Top Ruler */}
              {showRulers && (
                <div className="hidden xl:flex h-8 justify-between text-[10px] font-mono font-bold text-walnut/50 bg-sand/15 border-b border-sand/30 select-none px-3 mb-3 items-end pb-1.5 w-full max-w-[720px] transition-all animate-in fade-in shrink-0">
                  <span>0</span>
                  <span>{Math.round(itemWidthCm * 2)}</span>
                  <span>{Math.round(itemWidthCm * 4)}</span>
                  <span>{Math.round(itemWidthCm * 6)}</span>
                  <span>{Math.round(itemWidthCm * 8)}</span>
                  <span>{Math.round(itemWidthCm * 10)}mm</span>
                </div>
              )}

              {/* Canvas Wrapper - Pure CSS transform scaling to perfectly preserve mouse coordinates */}
              <div id="canvas-container-wrapper" className="relative shadow-2xl rounded-2xl overflow-hidden border-2 border-walnut/30 bg-white transition-all duration-300 ring-4 sm:ring-8 ring-walnut/5 shrink-0 mx-auto flex items-start justify-start">
                <div id="scale-wrapper" style={{ width: 720, height: 480, transformOrigin: 'top left' }}>
                  <canvas ref={canvasRef} />
                </div>

                {/* HTML Grid Overlay */}
                {showGrid && (
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-40 animate-in fade-in duration-200"
                    style={{
                      backgroundImage: 'linear-gradient(to right, rgba(74, 50, 40, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 50, 40, 0.25) 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}
                  />
                )}

                {/* Center Alignment Lines */}
                {showCenterLines && (
                  <div className="absolute inset-0 pointer-events-none animate-in fade-in duration-200">
                    <div className="absolute top-1/2 left-0 right-0 h-px border-t-2 border-dashed border-terracotta/40" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-terracotta/40" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Customizer Controls Grid Panel (BENEATH THE CANVAS) */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] bg-white rounded-2xl border border-sand p-3 sm:p-5 lg:p-6 shadow-sm min-w-0">
          
          {/* Left Column: Creator Control Tabs */}
          <div className="space-y-6 min-w-0">
            
            {/* Top Row: Template Selector + Navigation Bar */}
            <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] items-center border-b border-sand pb-5">
              <div id="product-selector-box">
                <label className="text-[10px] font-bold uppercase tracking-wider text-walnut/50 block mb-1">Base Template</label>
                <select
                  id="product-selector"
                  value={selectedProductId}
                  onChange={e => { setSelectedProductId(String(e.target.value)); setNotice(''); setError('') }}
                  disabled={loadingProducts}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all outline-none ${
                    isHighlighted('product-selector') 
                      ? 'border-terracotta ring-4 ring-terracotta/20 bg-terracotta/5' 
                      : 'border-sand bg-ivory text-walnut focus:border-terracotta'
                  }`}
                >
                  {products.map(p => {
                    const pid = String(p._id || p.id)
                    const label = p.name || (p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'Product')
                    return <option key={pid} value={pid}>{label}</option>
                  })}
                  {products.length === 0 && <option value="">Raw Leather Sheet Mode</option>}
                </select>
              </div>

              {/* Redesigned 2x2 Grid Tab Navigation to avoid squishing and overlapping */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-walnut/50 block mb-1">Creator Panel</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-ivory/40 p-1.5 rounded-2xl border-2 border-sand/40 w-full shadow-inner">
                  {[
                    { id: 'elements', label: 'Elements', tourId: 'tab-elements', icon: <Type size={13} /> },
                    { id: 'templates', label: 'Templates', tourId: 'tab-templates', icon: <Star size={13} /> },
                    { id: 'material', label: 'Material Pro', tourId: 'tab-material', icon: <Palette size={13} /> },
                    { id: 'properties', label: 'Inspector', tourId: 'tab-properties', icon: <Settings size={13} /> },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex min-w-0 items-center justify-center gap-1.5 py-2.5 px-2 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wide transition-all ${
                        activeTab === tab.id 
                          ? 'bg-walnut text-white shadow-md' 
                          : 'text-walnut/60 hover:bg-sand/20 hover:text-walnut'
                      } ${isHighlighted(tab.tourId) ? 'ring-2 ring-terracotta ring-offset-1 animate-pulse text-terracotta bg-terracotta/5' : ''}`}
                    >
                      {tab.icon}
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Elements Tab content */}
            {activeTab === 'elements' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <button onClick={addText} className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-sand px-5 py-4 text-sm font-bold text-walnut hover:bg-walnut hover:text-white hover:border-walnut transition-all shadow-sm group">
                    <Type size={16} className="text-terracotta group-hover:text-white" /> Add Monogram Text
                  </button>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:col-span-2">
                    {[
                      { type: 'rect', icon: <Square size={16} />, label: 'Rect' },
                      { type: 'circle', icon: <Circle size={16} />, label: 'Circle' },
                      { type: 'triangle', icon: <Star size={16} />, label: 'Triangle' },
                      { type: 'line', icon: <AlignRight size={16} />, label: 'Line' },
                    ].map(s => (
                      <button key={s.type} onClick={() => addShape(s.type)}
                        className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-sand text-walnut hover:bg-terracotta/5 hover:border-terracotta/30 transition-all text-xs font-bold uppercase tracking-wider shadow-sm">
                        {s.icon}<span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leather Motifs & Symbols */}
                <div className="border-2 border-sand/40 rounded-xl p-3 sm:p-4 bg-ivory/10 shadow-sm space-y-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-sand/40 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-walnut">Leather Motifs &amp; Symbols</span>
                    <span className="text-[9px] font-semibold text-terracotta">Click to stamp on canvas</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                    {[
                      { name: 'Crown', symbol: '♛', font: 'Georgia' },
                      { name: 'Compass', symbol: '✦', font: 'Georgia' },
                      { name: 'Anchor', symbol: '⚓', font: 'Arial' },
                      { name: 'Shield', symbol: '⛨', font: 'Arial' },
                      { name: 'Fleur', symbol: '⚜', font: 'Arial' },
                      { name: 'Stag', symbol: '🦌', font: 'Arial' },
                      { name: 'Eagle', symbol: '🦅', font: 'Arial' },
                      { name: 'Lion', symbol: '🦁', font: 'Arial' },
                      { name: 'Leaf', symbol: '🌿', font: 'Arial' },
                      { name: 'Acorn', symbol: '🌰', font: 'Arial' },
                      { name: 'Arrow', symbol: '➶', font: 'Georgia' },
                      { name: 'Star', symbol: '★', font: 'Georgia' },
                      { name: 'Infinity', symbol: '∞', font: 'Georgia' },
                      { name: 'Cross', symbol: '✙', font: 'Georgia' },
                      { name: 'Feather', symbol: '🪶', font: 'Arial' },
                      { name: 'Tree', symbol: '🌳', font: 'Arial' },
                    ].map(motif => (
                      <button
                        key={motif.name}
                        onClick={() => addClipart(motif)}
                        className="flex flex-col items-center justify-center p-2 bg-white border border-sand hover:border-terracotta hover:bg-terracotta/5 rounded-xl transition-all shadow-sm group hover:scale-105"
                        title={`Stamp ${motif.name}`}
                      >
                        <span className="text-xl leading-none filter drop-shadow-sm group-hover:scale-110 transition-transform">{motif.symbol}</span>
                        <span className="text-[7px] font-bold text-walnut/50 uppercase tracking-tight text-center mt-1 truncate w-full">{motif.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Embossing & Engraving Techniques */}
                <div className="border-2 border-sand/40 rounded-xl p-3 sm:p-4 bg-ivory/10 shadow-sm space-y-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-sand/40 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-walnut">Embossing &amp; Engraving</span>
                    <span className="text-[9px] font-semibold text-terracotta">Select text first, then apply a finish</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Deep Deboss', desc: 'Pressed', action: () => applyDebossStyle('blind'), icon: '▼', color: 'text-walnut' },
                      { label: 'Gold Foil', desc: 'Luxury', action: () => applyDebossStyle('gold'), icon: '✦', color: 'text-amber-600' },
                      { label: 'Silver Foil', desc: 'Metallic', action: () => applyDebossStyle('silver'), icon: '◈', color: 'text-slate-500' },
                      { label: 'Pyrography', desc: 'Burned', action: () => applyDebossStyle('burned'), icon: '🔥', color: 'text-orange-700' },
                    ].map(tech => (
                      <button
                        key={tech.label}
                        onClick={() => { if (!activeObject) { addText(); setTimeout(() => tech.action(), 120) } else { tech.action() } }}
                        className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-sand px-3 py-3 text-xs font-bold text-walnut hover:bg-walnut hover:text-white hover:border-walnut transition-all shadow-sm group ${!activeObject ? 'opacity-80' : ''}`}
                        title={activeObject ? `Apply ${tech.label}` : `Add text then apply ${tech.label}`}
                      >
                        <span className={`text-lg ${tech.color} group-hover:text-white`}>{tech.icon}</span>
                        <span className="font-bold truncate">{tech.label}</span>
                        <span className="text-[8px] opacity-60 font-normal">{tech.desc}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-walnut/40 font-semibold pt-1">
                    💡 Select any text on the canvas and click a technique to apply. Or click without selection to add new text with the effect.
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                  <label className="flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-sand px-5 py-3 text-sm font-bold text-walnut hover:bg-walnut hover:text-white hover:border-walnut transition-all shadow-sm group w-full md:w-auto shrink-0">
                    <ImageIcon size={16} className="text-terracotta group-hover:text-white" /> Upload Vector/Image
                    <input type="file" accept="image/*" className="sr-only" onChange={addImage} onClick={e => e.target.value = null} />
                  </label>

                  {/* Preset Colors */}
                  <div className="w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 border-2 border-sand/40 rounded-xl px-4 py-2.5 bg-ivory/20 shadow-inner">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-walnut/50 whitespace-nowrap">Presets</span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_COLORS.map(color => (
                        <button key={color} onClick={() => update(isText ? { fill: color } : { stroke: color })}
                          style={{ backgroundColor: color }}
                          className="h-7 w-7 rounded-lg border-2 border-white hover:scale-110 transition-transform shadow-md"
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Templates Tab content */}
            {activeTab === 'templates' && <DesignTemplatesPanel canvas={canvas} />}

            {/* Material Pro Tab content */}
            {activeTab === 'material' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid gap-5 xl:grid-cols-2">
                  
                  {/* Background Leather Customizer */}
                  <div className="border-2 border-sand/40 p-4 sm:p-5 rounded-2xl space-y-4 bg-ivory/10 shadow-sm min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-walnut flex items-center gap-2 border-b border-sand pb-2">
                      <Palette size={14} className="text-terracotta" /> Leather Skins & Colors
                    </h3>
                    
                    {/* Leather color selection */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-walnut/50 block mb-2">Color Tannery</label>
                      <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
                        {LEATHER_COLORS.map(l => (
                          <button
                            key={l.id}
                            onClick={() => setBgLeatherColor(l.color)}
                            style={{ backgroundColor: l.color }}
                            title={l.label}
                            className={`h-7 rounded-lg border-2 hover:scale-115 transition-transform flex items-center justify-center ${
                              bgLeatherColor === l.color ? 'border-terracotta ring-2 ring-terracotta/20' : 'border-white'
                            }`}
                          >
                            {bgLeatherColor === l.color && <span className="h-1.5 w-1.5 rounded-full bg-white shadow-md" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Leather texture grain selection */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-walnut/50 block mb-2">Leather Grain</label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {TEXTURES.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setBgTexture(t.id)}
                            className={`p-2.5 rounded-xl border-2 text-left flex flex-col justify-between transition-all ${
                              bgTexture === t.id ? 'border-terracotta bg-terracotta/5' : 'border-sand/40 hover:bg-sand/10'
                            }`}
                          >
                            <span className="text-xs font-extrabold text-walnut leading-none">{t.label}</span>
                            <span className="text-[9px] font-semibold text-walnut/40 leading-none mt-1">{t.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toggle Template Overlay */}
                    <div className="flex items-center justify-between py-2 bg-ivory/60 rounded-xl px-3 border border-sand/30 shadow-inner">
                      <span className="text-xs font-bold uppercase tracking-wide text-walnut/60 flex items-center gap-1.5">
                        {showTemplate ? <Eye size={14} className="text-teal-600 animate-pulse" /> : <EyeOff size={14} className="text-walnut/40" />}
                        Template Overlay outline
                      </span>
                      <input
                        type="checkbox"
                        checked={showTemplate}
                        onChange={e => setShowTemplate(e.target.checked)}
                        className="h-4.5 w-4.5 rounded border-sand text-terracotta accent-terracotta cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Stitching Border Generator */}
                  <div 
                    id="stitching-generator-panel"
                    className={`border-2 p-4 sm:p-5 rounded-2xl space-y-4 transition-all shadow-sm min-w-0 ${
                      isHighlighted('stitching-generator') 
                        ? 'border-terracotta bg-terracotta/5 ring-4 ring-terracotta/20 animate-pulse' 
                        : 'border-sand/40 bg-ivory/10'
                    }`}
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest text-walnut flex items-center gap-2 border-b border-sand pb-2">
                      <Settings size={14} className="text-terracotta" /> Stitching Generator
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-walnut/50 block mb-1">Stitch seam</label>
                        <select
                          value={stitchType}
                          onChange={e => setStitchType(e.target.value)}
                          className="w-full rounded-xl border-2 border-sand bg-white px-3 py-2 text-xs font-bold text-walnut outline-none focus:border-terracotta"
                        >
                          <option value="single">Single Line</option>
                          <option value="double">Double Line</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-walnut/50 block mb-1">Spacing</label>
                        <select
                          value={stitchSpacing}
                          onChange={e => setStitchSpacing(e.target.value)}
                          className="w-full rounded-xl border-2 border-sand bg-white px-3 py-2 text-xs font-bold text-walnut outline-none focus:border-terracotta"
                        >
                          <option value="fine">Fine (4mm)</option>
                          <option value="medium">Medium (6mm)</option>
                          <option value="bold">Bold (10mm)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-walnut/50 block mb-2">Thread color</label>
                      <div className="flex flex-wrap gap-1.5">
                        {STITCH_COLORS.map(s => (
                          <button
                            key={s.value}
                            onClick={() => setStitchColor(s.value)}
                            style={{ backgroundColor: s.value }}
                            title={s.label}
                            className={`h-7 w-7 rounded-lg border-2 hover:scale-105 transition-transform flex items-center justify-center ${
                              stitchColor === s.value ? 'border-terracotta ring-2 ring-terracotta/20' : 'border-white'
                            }`}
                          >
                            {stitchColor === s.value && <span className="h-1.5 w-1.5 rounded-full bg-terracotta shadow-md" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addStitchingBorder}
                      className="w-full py-2.5 rounded-xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta/90 transition shadow-md"
                    >
                      Apply Stitching Border
                    </button>
                  </div>
                </div>

                {/* Enterprise Assistants */}
                <div 
                  id="precision-assistants-panel"
                  className={`border-2 p-4 sm:p-5 rounded-2xl space-y-4 transition-all shadow-sm min-w-0 ${
                    isHighlighted('precision-assistants') 
                      ? 'border-terracotta bg-terracotta/5 ring-4 ring-terracotta/20 animate-pulse' 
                      : 'border-sand/40 bg-ivory/10'
                  }`}
                >
                  <h3 className="text-xs font-bold uppercase tracking-widest text-walnut flex items-center gap-2 border-b border-sand pb-2">
                    <Ruler size={14} className="text-terracotta" /> Enterprise Workshop Assistants
                  </h3>

                  <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 items-center">
                    {/* Size Inputs */}
                    <div className="xl:col-span-2 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-walnut/50 block mb-1">Width (cm)</label>
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={itemWidthCm}
                          onChange={e => setItemWidthCm(Math.max(5, parseInt(e.target.value) || 15))}
                          className="w-full rounded-xl border-2 border-sand bg-white px-3 py-2 text-xs font-bold text-walnut outline-none focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-widest text-walnut/50 block mb-1">Height (cm)</label>
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={itemHeightCm}
                          onChange={e => setItemHeightCm(Math.max(5, parseInt(e.target.value) || 10))}
                          className="w-full rounded-xl border-2 border-sand bg-white px-3 py-2 text-xs font-bold text-walnut outline-none focus:border-terracotta"
                        />
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <label className="flex-1 flex flex-col items-center justify-center text-[10px] font-bold text-walnut/60 bg-white p-2.5 rounded-xl border-2 border-sand/40 cursor-pointer hover:bg-sand/15 select-none transition shadow-sm animate-all hover:scale-105">
                        <Grid size={14} className="text-terracotta mb-1" />
                        <span>Grid Overlay</span>
                        <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} className="sr-only" />
                        <span className={`h-2 w-2 rounded-full mt-1.5 ${showGrid ? 'bg-teal-500 animate-pulse' : 'bg-sand/40'}`} />
                      </label>
                      <label className="flex-1 flex flex-col items-center justify-center text-[10px] font-bold text-walnut/60 bg-white p-2.5 rounded-xl border-2 border-sand/40 cursor-pointer hover:bg-sand/15 select-none transition shadow-sm animate-all hover:scale-105">
                        <Compass size={14} className="text-terracotta mb-1" />
                        <span>Center Lines</span>
                        <input type="checkbox" checked={showCenterLines} onChange={e => setShowCenterLines(e.target.checked)} className="sr-only" />
                        <span className={`h-2 w-2 rounded-full mt-1.5 ${showCenterLines ? 'bg-teal-500 animate-pulse' : 'bg-sand/40'}`} />
                      </label>
                      <label className="flex-1 flex flex-col items-center justify-center text-[10px] font-bold text-walnut/60 bg-white p-2.5 rounded-xl border-2 border-sand/40 cursor-pointer hover:bg-sand/15 select-none transition shadow-sm animate-all hover:scale-105">
                        <Ruler size={14} className="text-terracotta mb-1" />
                        <span>Metric Rulers</span>
                        <input type="checkbox" checked={showRulers} onChange={e => setShowRulers(e.target.checked)} className="sr-only" />
                        <span className={`h-2 w-2 rounded-full mt-1.5 ${showRulers ? 'bg-teal-500 animate-pulse' : 'bg-sand/40'}`} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties/Layers list Tab content */}
            {activeTab === 'properties' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-sand pb-2">
                  <h3 className="text-xs font-bold text-walnut uppercase tracking-widest flex items-center gap-1.5">
                    <Layers size={14} className="text-terracotta" /> Canvas Layers ({layersList.length})
                  </h3>
                  <span className="text-[9px] font-semibold text-walnut/40">Manage Z-Index & Visibility</span>
                </div>

                {layersList.length === 0 ? (
                  <div className="text-center py-8 text-walnut/40 bg-ivory/10 rounded-xl border-2 border-dashed border-sand/60 px-6">
                    <p className="text-xs font-bold uppercase text-walnut/50">No Custom Layers</p>
                    <p className="text-[10px] text-walnut/40 mt-1">Add text monograms, shapes, or branding stamps from the Elements tab to begin customizing.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {layersList.map((layer, idx) => {
                      const isSelected = activeObject === layer.ref
                      return (
                        <div
                          key={layer.id}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
                            isSelected 
                              ? 'bg-terracotta/5 border-terracotta/40 shadow-sm ring-1 ring-terracotta/20' 
                              : 'bg-white border-sand/50 hover:bg-sand/10'
                          }`}
                        >
                          <button
                            onClick={() => { canvas.setActiveObject(layer.ref); canvas.renderAll() }}
                            className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                          >
                            <span className="text-[10px] font-mono font-bold text-walnut/30">#{idx + 1}</span>
                            <div className="truncate">
                              <p className={`text-xs font-bold ${isSelected ? 'text-terracotta' : 'text-walnut'}`}>
                                {layer.text.length > 25 ? layer.text.slice(0, 25) + '...' : layer.text}
                              </p>
                              <p className="text-[8px] font-semibold text-walnut/40 uppercase tracking-widest mt-0.5">{layer.type}</p>
                            </div>
                          </button>

                          <div className="flex items-center gap-1">
                            {/* Visibility Toggle */}
                            <button
                              onClick={() => {
                                layer.ref.set({ visible: !layer.ref.visible })
                                canvas.renderAll()
                                setUpdateTrigger(p => p + 1)
                              }}
                              className={`p-1.5 rounded-lg hover:bg-sand/20 transition-all ${layer.visible ? 'text-teal-600' : 'text-walnut/30'}`}
                              title={layer.visible ? 'Hide Element' : 'Show Element'}
                            >
                              {layer.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                            </button>

                            {/* Lock Toggle */}
                            <button
                              onClick={() => {
                                const newSelectable = !layer.ref.selectable
                                layer.ref.set({ selectable: newSelectable, evented: newSelectable })
                                canvas.discardActiveObject()
                                canvas.renderAll()
                                setUpdateTrigger(p => p + 1)
                              }}
                              className={`p-1.5 rounded-lg hover:bg-sand/20 transition-all ${!layer.locked ? 'text-teal-600' : 'text-rose-500 bg-rose-50'}`}
                              title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}
                            >
                              {layer.locked ? <Lock size={13} /> : <Unlock size={13} />}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                canvas.remove(layer.ref)
                                canvas.discardActiveObject()
                                canvas.renderAll()
                              }}
                              className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                              title="Remove Layer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Active Properties Panel & Primary Save Action */}
          <div className="border-t xl:border-t-0 xl:border-l-2 border-sand pb-4 pt-5 xl:pt-0 xl:pl-6 space-y-5 flex flex-col justify-between min-h-[260px] min-w-0">
            
            {/* Object Customizer */}
            <div className="flex-1">
              {!activeObject ? (
                <div className="text-center py-12 text-walnut/40 bg-ivory/10 border-2 border-dashed border-sand/60 rounded-xl px-5">
                  <AlignCenter size={26} className="mx-auto mb-3 opacity-40 text-terracotta" />
                  <p className="text-xs font-bold uppercase tracking-widest text-walnut/60">Inspector Active</p>
                  <p className="text-[10px] font-semibold text-walnut/40 mt-1.5 leading-relaxed">Click any monogram text, stamp template, or vector shape on the top canvas to style its parameters.</p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center border-b border-sand pb-3">
                    <h3 className="text-xs font-bold text-walnut uppercase tracking-widest flex items-center gap-1.5">
                      <Settings size={13} className="text-terracotta" /> Active Selection
                    </h3>
                    <button onClick={deleteActive} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors border border-rose-100" title="Delete element"><Trash2 size={14} /></button>
                  </div>

                  {/* Contextual Deboss/Texture Finishes */}
                  {(isText || isShape) && (
                    <div className="bg-ivory/20 p-4 rounded-xl border border-sand shadow-inner space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta block">Artisan Finishes</span>
                      
                      {isText && (
                        <div className="grid grid-cols-2 gap-1.5">
                          <button onClick={() => applyDebossStyle('blind')} className="py-2 text-xs font-bold bg-white border border-sand hover:bg-sand/15 rounded-lg text-walnut shadow-sm">Blind Deboss</button>
                          <button onClick={() => applyDebossStyle('gold')} className="py-2 text-xs font-bold bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg text-amber-800 shadow-sm">Gold Foil</button>
                          <button onClick={() => applyDebossStyle('silver')} className="py-2 text-xs font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-800 shadow-sm">Silver Foil</button>
                          <button onClick={() => applyDebossStyle('burned')} className="py-2 text-xs font-bold bg-orange-50 border border-orange-200 hover:bg-orange-100 rounded-lg text-orange-950 shadow-sm">Hot Brand</button>
                        </div>
                      )}

                      {isShape && (
                        <div className="grid grid-cols-3 gap-1.5">
                          {TEXTURES.map(t => (
                            <button
                              key={t.id}
                              onClick={() => applyTextureToShape(t.id, bgLeatherColor)}
                              className="py-1.5 text-[9px] font-bold bg-white border border-sand hover:bg-sand/15 rounded-lg text-walnut leading-none shadow-sm"
                            >
                              {t.label.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-walnut/60 uppercase tracking-wider">
                      <span>Opacity</span><span>{Math.round((activeObject.opacity || 1) * 100)}%</span>
                    </div>
                    <input type="range" min="0.1" max="1" step="0.05" value={activeObject.opacity || 1}
                      onChange={e => update({ opacity: parseFloat(e.target.value) })}
                      className="w-full accent-terracotta animate-all" />
                  </div>

                  {/* Layer ordering & Alignments */}
                  <div className="grid grid-cols-4 gap-1.5">
                    <button onClick={() => { canvas.bringObjectForward(activeObject); canvas.renderAll() }} className="text-[10px] font-bold uppercase bg-sand/15 hover:bg-sand/35 rounded-lg py-1.5 text-walnut border border-sand/40 shrink-0">Fwd</button>
                    <button onClick={() => { canvas.sendObjectBackwards(activeObject); canvas.renderAll() }} className="text-[10px] font-bold uppercase bg-sand/15 hover:bg-sand/35 rounded-lg py-1.5 text-walnut border border-sand/40 shrink-0">Back</button>
                    <button onClick={() => { canvas.centerObjectH(activeObject); canvas.renderAll() }} className="text-[10px] font-bold uppercase bg-sand/15 hover:bg-sand/35 rounded-lg py-1.5 text-walnut border border-sand/40 shrink-0">Cent H</button>
                    <button onClick={() => { canvas.centerObjectV(activeObject); canvas.renderAll() }} className="text-[10px] font-bold uppercase bg-sand/15 hover:bg-sand/35 rounded-lg py-1.5 text-walnut border border-sand/40 shrink-0">Cent V</button>
                  </div>

                  {/* Vector shape outline / fills */}
                  {!isText && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-walnut/60 block mb-1">Stroke</label>
                        <input type="color" value={activeObject.stroke || '#4A3228'}
                          onChange={e => update({ stroke: e.target.value })}
                          className="w-full h-8 rounded-lg border border-sand cursor-pointer p-0.5" />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-walnut/60 block mb-1">Fill</label>
                        <input type="color" value={activeObject.fill && activeObject.fill !== 'transparent' ? activeObject.fill : '#ffffff'}
                          onChange={e => update({ fill: e.target.value })}
                          className="w-full h-8 rounded-lg border border-sand cursor-pointer p-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Text Controls */}
                  {isText && (
                    <div className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-wider text-walnut/60 block mb-1">Font Color</label>
                          <input type="color" value={activeObject.fill || '#4A3228'}
                            onChange={e => update({ fill: e.target.value })}
                            className="w-full h-8 rounded-lg border border-sand cursor-pointer p-0.5" />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-wider text-walnut/60 block mb-1">Size</label>
                          <input type="number" min="8" max="150" value={activeObject.fontSize || 36}
                            onChange={e => update({ fontSize: parseInt(e.target.value) || 12 })}
                            className="w-full rounded-lg border-2 border-sand bg-ivory px-3 py-1.5 text-sm font-semibold text-walnut outline-none focus:border-terracotta" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-wider text-walnut/60 block mb-1">Font Style</label>
                        <select value={activeObject.fontFamily} onChange={e => update({ fontFamily: e.target.value })}
                          className="w-full rounded-lg border-2 border-sand bg-ivory px-3 py-1.5 text-xs font-semibold text-walnut outline-none focus:border-terracotta">
                          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                      <div className="flex border border-sand rounded-xl overflow-hidden shadow-sm">
                        <button onClick={() => update({ fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold' })}
                          className={`flex-1 py-2 text-xs font-bold font-serif ${activeObject.fontWeight === 'bold' ? 'bg-walnut text-white shadow-inner' : 'text-walnut/60 hover:bg-sand/10'}`}>B</button>
                        <button onClick={() => update({ fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic' })}
                          className={`flex-1 py-2 text-xs italic font-bold font-serif border-x border-sand ${activeObject.fontStyle === 'italic' ? 'bg-walnut text-white shadow-inner' : 'text-walnut/60 hover:bg-sand/10'}`}>I</button>
                        <button onClick={() => update({ underline: !activeObject.underline })}
                          className={`flex-1 py-2 text-xs font-bold underline ${activeObject.underline ? 'bg-walnut text-white shadow-inner' : 'text-walnut/60 hover:bg-sand/10'}`}>U</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Save Masterpiece Action */}
            <button 
              id="save-button"
              onClick={handleSave} 
              disabled={saving}
              className={`sticky bottom-3 z-10 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-extrabold uppercase tracking-widest transition-all shadow-md hover:shadow-lg ${
                isHighlighted('save-button')
                  ? 'bg-terracotta hover:bg-terracotta/90 ring-4 ring-terracotta/20 animate-pulse text-white'
                  : 'bg-walnut hover:bg-[#3a2518] disabled:bg-sand text-white'
              }`}
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Design to Gallery'}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
