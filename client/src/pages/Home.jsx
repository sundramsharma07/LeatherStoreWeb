import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Sparkles, Filter, ShieldCheck, Heart, Mail, X } from 'lucide-react'
import api, { getApiError } from '../api/client'
import { useCart } from '../store/useCart'
import { useToast } from '../store/useToast'
import { useAuth } from '../store/useAuth'
import LeatherImage from '../components/LeatherImage'
import AnimatedCraftingVideo from '../components/AnimatedCraftingVideo'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  // Store Catalog State
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const addItem = useCart(state => state.addItem)
  const addToast = useToast(state => state.addToast)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)

  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('leathercraft_favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Favorite toggle
  useEffect(() => {
    localStorage.setItem('leathercraft_favorites', JSON.stringify(likedIds))
  }, [likedIds])

  const toggleLike = (productId) => {
    if (likedIds.includes(productId)) {
      setLikedIds(likedIds.filter(id => id !== productId))
    } else {
      setLikedIds([...likedIds, productId])
    }
  }

  // Fetch products catalog
  useEffect(() => {
    async function fetchCatalog() {
      try {
        const response = await api.get('/public/products')
        setProducts(response.data.products || [])
      } catch (err) {
        setError(getApiError(err))
      } finally {
        setLoading(false)
      }
    }
    fetchCatalog()
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" })

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [products])

  const categories = ['All', ...new Set(products.map(p => p.design?.product?.category || 'Leather'))]
  const filteredProducts = filterCategory === 'All'
    ? products
    : products.filter(p => (p.design?.product?.category || 'Leather') === filterCategory)

  return (
    <div className="space-y-16 pb-24 animate-in fade-in duration-500 overflow-x-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F4EDE6] to-[#EBE2D7]">
      
      {/* 1. Brand Showcase Hero (Pristine Customer View without Login fields) */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#4e1a12] to-[#270c08] shadow-[0_30px_70px_rgba(78,26,18,0.22)] min-h-[460px] flex items-center p-8 md:p-14 border border-[#5c1c13]/40">
          
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#dfa85c]/40"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#dfa85c]/40"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#dfa85c]/40"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#dfa85c]/40"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8 w-full">
            
            <div className="space-y-6 text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <span className="font-['Italianno'] text-4xl text-[#dfa85c] tracking-widest leading-none drop-shadow-sm font-semibold select-none animate-pulse">
                The Tannery India
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-[2.85rem] font-serif font-extrabold tracking-tight text-[#FCFBF7] leading-[1.1] max-w-lg">
                Shop the Best <br className="hidden md:block"/>
                Selection of <span className="font-['Italianno'] text-[#dfa85c] italic tracking-wide font-normal text-5xl lowercase">Bespoke Leather</span> <br className="hidden md:block"/>
                <span className="text-[#dfa85c]">Bags</span>
              </h1>
              
              <p className="text-[11px] leading-relaxed text-[#FCFBF7]/75 font-medium max-w-sm">
                Luxury leather crafted with ancestral heritage. Discover custom printed messenger bags, premium bi-folds, and timeless accessories designed exclusively for you.
              </p>

              <div className="pt-3">
                <a
                  href="#products"
                  className="rounded-full bg-[#dfa85c] hover:bg-[#cfa054] text-walnut px-7 py-3 text-[10px] font-extrabold uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 duration-250 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Products</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            <div className="flex justify-center items-center relative order-first md:order-last">
              <div className="relative group max-w-[280px] md:max-w-[340px] rounded-[1.5rem] overflow-hidden bg-white/5 p-3.5 shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800"
                  alt="Premium bag visual representation"
                  className="w-full h-56 md:h-72 object-cover rounded-[1.2rem] shadow-md"
                />
                <div className="absolute top-6 left-6 bg-[#dfa85c] text-walnut text-[8px] font-extrabold tracking-[0.2em] uppercase py-1 px-3 rounded-full shadow-md">
                  100% Genuine
                </div>
              </div>
            </div>

          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
            <a href="#products" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 animate-bounce">
              <span className="text-[12px] font-bold">&darr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Continuous Marquee Scrolling Text */}
      <div className="w-full bg-gradient-to-r from-[#4e1a12] to-[#270c08] border-y border-[#5c1c13]/30 overflow-hidden py-3 shadow-md relative z-20">
        <div className="flex whitespace-nowrap animate-marquee gap-8 text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#dfa85c]">
          <span>✦ 100% Genuine Full-Grain Hides ✦ Handcrafted by Master Indian Leather Artisans ✦ Secure Stripe Escrow Protection ✦ Free Delivery Across India ✦ Lifetime Finish Guarantee ✦</span>
          <span>✦ 100% Genuine Full-Grain Hides ✦ Handcrafted by Master Indian Leather Artisans ✦ Secure Stripe Escrow Protection ✦ Free Delivery Across India ✦ Lifetime Finish Guarantee ✦</span>
        </div>
      </div>

      {/* 3. Dedicated Categories Selector Section */}
      <section id="categories" className="max-w-6xl mx-auto px-4 space-y-6 reveal">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-extrabold tracking-widest text-[#4e1a12] uppercase font-['Cinzel']">
            Categories
          </h2>
          <div className="h-[2px] w-12 bg-terracotta mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { 
              name: 'Bags', 
              img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800',
              label: 'Bags Collection',
              delayClass: 'reveal-delay-1'
            },
            { 
              name: 'Wallets', 
              img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800',
              label: 'Premium Wallets',
              delayClass: 'reveal-delay-2'
            },
            { 
              name: 'Belts', 
              img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800',
              label: 'Designer Belts',
              delayClass: 'reveal-delay-3'
            },
            { 
              name: 'Jackets', 
              img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800',
              label: 'Classic Jackets',
              delayClass: 'reveal-delay-4'
            },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                const matchedCat = categories.find(c => c.toLowerCase() === cat.name.toLowerCase()) || 'All'
                setFilterCategory(matchedCat)
                const el = document.getElementById('products')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`group cursor-pointer relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sand/30 reveal ${cat.delayClass}`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 via-walnut/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-sm font-serif font-extrabold uppercase tracking-wider">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-sand/80 font-bold uppercase tracking-widest mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.label} &rarr;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Grid of Store Commitments */}
      <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-3 px-4 reveal">
        <div className="rounded-2xl border border-sand/40 bg-white/70 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 reveal reveal-delay-1">
          <div className="h-10 w-10 bg-[#5c3a21]/10 rounded-xl flex items-center justify-center text-[#5c3a21] border border-sand/30">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-walnut text-sm">Verified Local Sellers</h3>
          <p className="text-xs text-walnut/60 font-semibold leading-relaxed">All products are prepared and shipped directly by trusted sellers.</p>
        </div>
        <div className="rounded-2xl border border-sand/40 bg-white/70 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 reveal reveal-delay-2">
          <div className="h-10 w-10 bg-terracotta/10 rounded-xl flex items-center justify-center text-terracotta border border-sand/30">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-walnut text-sm">High Quality Prints</h3>
          <p className="text-xs text-walnut/60 font-semibold leading-relaxed">Unique designs printed onto high-quality leather using the best technology.</p>
        </div>
        <div className="rounded-2xl border border-sand/40 bg-white/70 p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 reveal reveal-delay-3">
          <div className="h-10 w-10 bg-sand/30 rounded-xl flex items-center justify-center text-walnut border border-sand/40">
            <ShoppingCart size={20} />
          </div>
          <h3 className="font-bold text-walnut text-sm">Safe & Secure Payment</h3>
          <p className="text-xs text-walnut/60 font-semibold leading-relaxed">Pay safely with Stripe using any credit card or local test options.</p>
        </div>
      </section>

      {/* 5. Filterable Catalog Section */}
      <section id="products" className="max-w-6xl mx-auto space-y-8 px-4 reveal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sand/30 pb-5">
          <div>
            <h2 className="text-2xl font-serif font-extrabold tracking-tight text-walnut uppercase">Products</h2>
            <p className="text-xs text-walnut/50 mt-1 font-semibold">Browse beautiful leather items printed with custom patterns.</p>
          </div>

          {/* Filtering tabs */}
          {products.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] uppercase font-bold text-walnut/40 tracking-wider flex items-center gap-1 mr-1">
                <Filter size={10} /> Filter Category:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition border ${
                    filterCategory === cat
                      ? 'bg-walnut text-white border-walnut shadow-sm'
                      : 'bg-white text-walnut/70 border-sand hover:bg-sand/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-xs font-semibold text-rose-700 shadow-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="rounded-2xl border border-sand bg-white p-4 space-y-4 animate-pulse">
                <div className="aspect-square bg-sand/10 rounded-xl"></div>
                <div className="h-4 bg-sand/20 rounded w-2/3"></div>
                <div className="h-6 bg-sand/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group relative rounded-2xl border border-sand/40 bg-white p-3 overflow-hidden shadow-sm hover:border-[#5c3a21] hover:shadow-lg transition-all duration-300 flex flex-col justify-between reveal"
                  style={{ transitionDelay: `${(idx % 4) * 75}ms` }}
                >
                  <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-1 rounded-full bg-walnut/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-ivory border border-white/10">
                    {product.design?.product?.category || 'Leather'}
                  </span>

                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-5 right-5 z-10 h-7 w-7 rounded-full bg-white/95 backdrop-blur-md border border-sand/40 flex items-center justify-center transition-all shadow-sm"
                  >
                    <Heart
                      size={14}
                      className={likedIds.includes(product.id) ? 'text-rose-500 fill-rose-500' : 'text-walnut/40 hover:text-rose-500'}
                    />
                  </button>

                  <Link to={`/product/${product.id}`} className="aspect-square bg-ivory/50 rounded-xl flex items-center justify-center overflow-hidden p-4 border border-sand/10">
                    {product.design?.ai_image ? (
                      <img
                        src={product.design.ai_image}
                        alt={product.title}
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <LeatherImage
                      type={product.design?.product?.category?.toLowerCase() || 'default'}
                      text={product.design?.product?.category || 'Leather'}
                      className={`w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105 ${product.design?.ai_image ? 'hidden' : ''}`}
                    />
                  </Link>

                  <div className="mt-3 text-xs flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.id}`} className="font-bold text-walnut text-sm block hover:text-terracotta transition-colors truncate">
                        {product.title}
                      </Link>
                      <p className="text-[10px] font-semibold text-walnut/40 mt-0.5 truncate">
                        Seller: {product.user?.name || 'Local Seller Partner'}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-sand/20 flex items-end justify-between">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-walnut/40 mb-0.5">Price</span>
                        <span className="text-sm font-extrabold text-terracotta">₹{product.price}</span>
                      </div>
                      
                      <div className="text-right flex flex-col items-end gap-1.5">
                        <span className="block text-[8px] uppercase tracking-widest text-walnut/40 leading-none">
                          {product.quantity} in stock
                        </span>
                        
                        <button
                          onClick={() => {
                            addItem(product, 1)
                            addToast(`"${product.title}" added to your cart!`, 'success')
                          }}
                          className="rounded-lg bg-[#5c3a21] hover:bg-[#4b301c] text-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <ShoppingCart size={11} />
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-sand bg-white/50 max-w-xl mx-auto reveal">
                <Sparkles size={36} className="text-sand/80 mb-3" />
                <p className="text-sm font-bold text-walnut">Store is empty right now.</p>
                <p className="text-xs text-walnut/50 mt-1 font-semibold leading-relaxed">Check back later or list your own products!</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* 6. Overhauled Artisanal Gallery Section */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 space-y-6 pt-10 reveal">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-extrabold tracking-widest text-walnut uppercase">
            Artisanal Gallery
          </h2>
          <p className="text-xs text-walnut/50 mt-1 font-semibold">Behind the scenes of our premium leather workshops</p>
          <div className="h-[2px] w-12 bg-terracotta mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { 
              img: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800',
              title: 'Exquisite Stitching',
              delayClass: 'reveal-delay-1'
            },
            { 
              img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800',
              title: 'Traditional Tanning',
              delayClass: 'reveal-delay-2'
            },
            { 
              img: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800',
              title: 'Bespoke Finishing',
              delayClass: 'reveal-delay-3'
            },
            { 
              img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800',
              title: 'Precision Tooling',
              delayClass: 'reveal-delay-1'
            },
            { 
              img: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=800',
              title: 'Premium Hides',
              delayClass: 'reveal-delay-2'
            },
            { 
              img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800',
              title: 'Custom Embossing',
              delayClass: 'reveal-delay-3'
            },
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedGalleryImage(item.img)}
              className={`group relative h-60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-sand/30 reveal ${item.delayClass} cursor-pointer`}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-serif font-bold tracking-wider uppercase">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Spotlights / Video Tour Section */}
      <section id="videos" className="max-w-6xl mx-auto px-4 space-y-6 pt-10 reveal">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-extrabold tracking-widest text-walnut uppercase">
            Spotlight Tour
          </h2>
          <p className="text-xs text-walnut/50 mt-1 font-semibold">Watch our designers craft premium printed designs</p>
          <div className="h-[2px] w-12 bg-terracotta mx-auto mt-2"></div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-sand/40 bg-walnut text-[#FAF7F2] p-8 md:p-12 shadow-lg">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C96A3D_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="bg-terracotta/20 text-terracotta text-[9px] font-bold tracking-[0.2em] uppercase py-1 px-3 rounded-full border border-terracotta/30 inline-block animate-pulse">
                Artisan Story
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-extrabold leading-tight">
                Behind the Canvas: <br/>
                Crafting Printed Leather
              </h3>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed font-semibold">
                Take a cinematic journey inside our custom-printing workshop in Kanpur. Discover how our sellers print detailed illustrations directly onto premium grain hides, blending high technology with ancient Indian leatherwork techniques.
              </p>
              <div className="pt-2">
                <a
                  href="#products"
                  className="inline-flex rounded-lg bg-white hover:bg-ivory text-walnut px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all items-center gap-1.5 shadow-md hover:scale-105"
                >
                  <Sparkles size={13} className="text-terracotta" />
                  <span>Start Crafting</span>
                </a>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <AnimatedCraftingVideo />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Lightbox Modal for Gallery */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-walnut/90 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={() => setSelectedGalleryImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); setSelectedGalleryImage(null); }}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedGalleryImage} 
            alt="Gallery High Resolution" 
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  )
}
