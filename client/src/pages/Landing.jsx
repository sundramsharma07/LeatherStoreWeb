import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Search, ShieldCheck, Mail, Lock, X, Quote, Sparkles, Phone, Truck, RotateCcw, Globe, Landmark } from 'lucide-react'
import { useAuth } from '../store/useAuth'

export default function Landing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showPortalModal, setShowPortalModal] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  
  const [searchQuery, setSearchQuery] = useState('')


  const handleSearchChange = (val) => {
    setSearchQuery(val)
    if (val.trim()) {
      const catalogSection = document.getElementById('product-catalog')
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const megaMenuData = {
    Fashion: [
      'Bespoke Flight Jackets', 'Structured Handbags', 'Slim Bifold Wallets', 
      'Steerhide Trench Coats', 'Aniline Chelsea Boots', 'Heavy-Grain Messenger Bags', 
      'Classic Steerhide Belts', 'Premium Tote Bags', 'Minimalist Cardholders', 
      'Supple Dress Gloves', 'Passport Wallets', 'Vintage Satchels'
    ],
    Electronics: [
      'Laptop Protector Sleeves', 'AirPods Vault Cases', 'Saddle Leather Desk Mats', 
      'Tactile Mouse Pads', 'Steerhide Phone Cases', 'Minimalist Cable Wraps', 
      'Heavy-Duty Camera Straps', 'Keyboard Carry Sleeves', 'Stylus Slip Covers', 
      'Wireless Charger Mats', 'Tablet Zip Portfolios', 'Headphone Cushions'
    ],
    'Baby & Kids': [
      'Mini School Satchels', 'Supple Baby Moccasins', 'Handcrafted Teddy Bears', 
      'Childrens Suspenders', 'Toddler Buckle Trailpacks', 'Pacifier Slip Loops', 
      'Steerhide Hair Bows', 'Height Tracking Growth Ribbons', 'Pencil Carry Pouches', 
      'Toddler Booties', 'Toy Storage Hampers', 'Baby Memory Album Covers'
    ],
    Automobiles: [
      'Perforated Steering Wraps', 'Custom Key Fob Wraps', 'Steerhide Driving Gloves', 
      'Console Hanging Pouches', 'Hanging Headrest Organizers', 'Seat Back Protector Wraps', 
      'Visor Sunglasses Clips', 'Automotive Tissue Holders', 'Gear Shift Slip Covers', 
      'Luxury Seat protectors', 'Seat Belt Soft Pads', 'Durable Rolled Tool Rolls'
    ],
    Featured: [
      'Kanpur Saddle Bags', 'Signature Travel Duffels', 'Vegetable-Tanned Wallets', 
      'Steerhide Jackets', 'Aniline Leather Shoes', 'Artisan Desk Protectors', 
      'Custom Laptop Sleeves', 'Handcrafted Toy Teddies', 'Steering Wheel Covers', 
      'Visor Sunglasses Holders', 'Steerhide Flight Packs', 'Luxury Card Envelopes'
    ]
  }

  // 1. DYNAMIC LANGUAGE STATE & DICTIONARY
  const [selectedLanguage, setSelectedLanguage] = useState('English') // 'English', 'Hindi', 'Spanish', 'German'
  
  // Translation dictionary for dynamic landing page i18n
  const translations = {
    English: {
      call: 'CALL: +91-999-000-111',
      myAccount: 'My Account',
      getOption: 'Get Option Here',
      viewCollection: 'View Collection',
      supportTitle: '24x7 Free Support',
      supportDesc: 'Ask any technical help',
      guaranteeTitle: 'Money Back Guarantee',
      guaranteeDesc: '30-day money-back guarantee',
      shippingTitle: 'Free Shipping India',
      shippingDesc: 'On all designer shipments',
      bestProducts: 'Best Products',
      featured: 'Featured',
      newArrivals: 'New Arrivals',
      signIn: 'Sign In',
      selectPortal: 'Select Your Portal',
      selectPortalDesc: 'Choose the matching gateway role below to enter your secure dashboard or customized catalog.',
      customerBtn: 'Log In As Customer',
      sellerBtn: 'Log In As Partner Seller',
      adminBtn: 'Admin Vault Login',
      searchPlaceholder: 'Search our catalog...',
      footerDesc: 'Beautiful wallets, bags & jackets with custom prints. Created by verified partner sellers and delivered safely across India.',
      pagesTitle: 'Pages',
      policiesTitle: 'Policies',
      contactTitle: 'Contact Info',
      slides: [
        {
          subtitle: 'ALL PRODUCTS LEATHER COLLECTION 2026',
          title: 'WOMEN HANDBAGS 2026',
          promo: 'GET BY ALL LEATHER PRODUCTS 20% OFF'
        },
        {
          subtitle: 'EXCLUSIVE KANPUR SADDLE COLLECTION',
          title: 'HERITAGE ACCESSORIES',
          promo: 'GET FREE SHIPPING ON ALL ORDER ITEMS'
        },
        {
          subtitle: 'LUXURY TACTILE LEATHER DESIGN',
          title: 'DESIGNER PORTFOLIOS',
          promo: 'HANDMADE TO LAST A GENERATION'
        },
        {
          subtitle: 'VINTAGE TAILORED SERIES',
          title: 'FLIGHT JACKETS',
          promo: 'GET UP TO 25% OFF EXQUISITE SEAMS'
        }
      ]
    },
    Hindi: {
      call: 'कॉल करें: +91-999-000-111',
      myAccount: 'मेरा खाता',
      getOption: 'यहाँ विकल्प चुनें',
      viewCollection: 'संग्रह देखें',
      supportTitle: '24x7 मुफ्त सहायता',
      supportDesc: 'कोई भी तकनीकी मदद मांगें',
      guaranteeTitle: 'पैसा वापसी गारंटी',
      guaranteeDesc: '30-दिन की मनी-बैक गारंटी',
      shippingTitle: 'मुफ्त डिलीवरी भारत',
      shippingDesc: 'सभी डिज़ाइनर शिपमेंट पर',
      bestProducts: 'सर्वश्रेष्ठ उत्पाद',
      featured: 'विशेष रुप से प्रदर्शित',
      newArrivals: 'नए उत्पाद',
      signIn: 'साइन इन करें',
      selectPortal: 'अपना पोर्टल चुनें',
      selectPortalDesc: 'सुरक्षित डैशबोर्ड या कस्टमाइज्ड कैटलॉग में प्रवेश करने के लिए नीचे दी गई भूमिका का चयन करें।',
      customerBtn: 'ग्राहक लॉगिन',
      sellerBtn: 'विक्रेता लॉगिन',
      adminBtn: 'एडमिन वॉल्ट लॉगिन',
      searchPlaceholder: 'कैटलॉग खोजें...',
      footerDesc: 'कस्टम प्रिंट वाले सुंदर वॉलेट, बैग और जैकेट। सत्यापित भागीदार विक्रेताओं द्वारा निर्मित और पूरे भारत में सुरक्षित रूप से वितरित।',
      pagesTitle: 'पृष्ठ',
      policiesTitle: 'नीतियां',
      contactTitle: 'संपर्क जानकारी',
      slides: [
        {
          subtitle: 'सभी उत्पाद चमड़ा संग्रह 2026',
          title: 'महिला हैंडबैग 2026',
          promo: 'चमड़े के उत्पादों पर 20% की छूट'
        },
        {
          subtitle: 'विशेष कानपुर सैडल संग्रह',
          title: 'विरासत सहायक उपकरण',
          promo: 'सभी ऑर्डर आइटम पर मुफ्त शिपिंग'
        },
        {
          subtitle: 'लक्जरी स्पर्श चमड़े का डिज़ाइन',
          title: 'डिजाइनर पोर्टफोलियो',
          promo: 'पीढ़ियों तक चलने के लिए हस्तनिर्मित'
        },
        {
          subtitle: 'विंटेज सिलवाया श्रृंखला',
          title: 'उड़ान जैकेट',
          promo: 'उत्कृष्ट सीमों पर 25% तक की छूट'
        }
      ]
    },
    Spanish: {
      call: 'LLAMAR: +91-999-000-111',
      myAccount: 'Mi Cuenta',
      getOption: 'Obtenga Opción Aquí',
      viewCollection: 'Ver Colección',
      supportTitle: 'Soporte Gratis 24x7',
      supportDesc: 'Solicite ayuda técnica',
      guaranteeTitle: 'Garantía De Devolución',
      guaranteeDesc: 'Garantía de devolución de 30 días',
      shippingTitle: 'Envío Gratis India',
      shippingDesc: 'En todos los envíos de diseño',
      bestProducts: 'Mejores Productos',
      featured: 'Destacados',
      newArrivals: 'Novedades',
      signIn: 'Iniciar Sesión',
      selectPortal: 'Seleccione Su Portal',
      selectPortalDesc: 'Elija el rol de puerta de enlace correspondiente a continuación para ingresar a su panel de control seguro.',
      customerBtn: 'Iniciar sesión como cliente',
      sellerBtn: 'Iniciar sesión como vendedor',
      adminBtn: 'Inicio de sesión de administrador',
      searchPlaceholder: 'Buscar en el catálogo...',
      footerDesc: 'Hermosos bolsos, carteras y chaquetas con estampados personalizados. Creados por vendedores asociados verificados y entregados de forma segura en la India.',
      pagesTitle: 'Páginas',
      policiesTitle: 'Políticas',
      contactTitle: 'Datos de Contacto',
      slides: [
        {
          subtitle: 'COLECCIÓN DE CUERO DE TODOS LOS PRODUCTOS 2026',
          title: 'BOLSOS DE MUJER 2026',
          promo: 'OBTENGA UN 20% DE DESCUENTO EN PRODUCTOS DE CUERO'
        },
        {
          subtitle: 'COLECCIÓN EXCLUSIVA DE SILLINES KANPUR',
          title: 'ACCESORIOS DE HERENCIA',
          promo: 'ENVÍO GRATUITO EN TODOS LOS ARTÍCULOS'
        },
        {
          subtitle: 'DISEÑO DE CUERO TÁCTIL DE LUJO',
          title: 'PORTAFOLIOS DE DISEÑO',
          promo: 'HECHO A MANO PARA DURAR GENERACIONES'
        },
        {
          subtitle: 'SERIE DE VUELO SASTRE VINTAGE',
          title: 'CHAQUETAS DE VUELO',
          promo: 'HASTA 25% DE DESCUENTO EN COSTURAS EXQUISITAS'
        }
      ]
    },
    German: {
      call: 'ANRUF: +91-999-000-111',
      myAccount: 'Mein Konto',
      getOption: 'Hier Option Wählen',
      viewCollection: 'Kollektion Ansehen',
      supportTitle: '24x7 Kostenloser Support',
      supportDesc: 'Fragen Sie nach technischer Hilfe',
      guaranteeTitle: 'Geld-Zurück-Garantie',
      guaranteeDesc: '30 Tage Geld-zurück-Garantie',
      shippingTitle: 'Kostenloser Versand Indien',
      shippingDesc: 'Auf alle Designer-Lieferungen',
      bestProducts: 'Beste Produkte',
      featured: 'Beliebt',
      newArrivals: 'Neuheiten',
      signIn: 'Anmelden',
      selectPortal: 'Wählen Sie Ihr Portal',
      selectPortalDesc: 'Wählen Sie unten die passende Gateway-Rolle aus, um auf Ihr sicheres Dashboard oder Ihren Katalog zuzugreifen.',
      customerBtn: 'Als Kunde anmelden',
      sellerBtn: 'Als Partner-Verkäufer anmelden',
      adminBtn: 'Admin-Tresor-Anmeldung',
      searchPlaceholder: 'Katalog durchsuchen...',
      footerDesc: 'Wunderschöne Geldbörsen, Taschen & Jacken mit individuellem Aufdruck. Hergestellt von verifizierten Partner-Verkäufern.',
      pagesTitle: 'Seiten',
      policiesTitle: 'Richtlinien',
      contactTitle: 'Kontaktinformationen',
      slides: [
        {
          subtitle: 'ALLE LEDERPRODUKTE KOLLEKTION 2026',
          title: 'DAMEN HANDTASCHEN 2026',
          promo: 'ERHALTEN SIE 20% RABATT AUF LEDERPRODUKTE'
        },
        {
          subtitle: 'EXKLUSIVE KANPUR SATTEL KOLLEKTION',
          title: 'HERITAGE LEDERWAREN',
          promo: 'KOSTENLOSER VERSAND AUF ALLE BESTELLUNGEN'
        },
        {
          subtitle: 'LUXUS TCH-LEDER DESIGN',
          title: 'DESIGNER PORTFOLIOS',
          promo: 'HANDGEFERTIGT FÜR GENERATIONEN'
        },
        {
          subtitle: 'VINTAGE FLIEGER-SERIE',
          title: 'FLIEGERJACKEN',
          promo: 'BIS ZU 25% RABATT AUF EXQUISITE NÄHTE'
        }
      ]
    }
  }

  // 2. DYNAMIC CURRENCY STATE, CONVERTERS & FORMATTERS
  const [selectedCurrency, setSelectedCurrency] = useState('INR') // 'INR', 'USD', 'EUR', 'GBP'
  
  // Exchange rates relative to base currency (USD)
  const currencyRates = {
    INR: 83.0,
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79
  }
  
  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  }

  const formatPrice = (usdValue) => {
    const converted = usdValue * currencyRates[selectedCurrency]
    const symbol = currencySymbols[selectedCurrency]
    return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  // 3. PRODUCT FILTERING STATE & SECTION PRODUCTS
  const [activeCategory, setActiveCategory] = useState('Fashion') // 'Fashion', 'Electronics', 'Baby & Kids', 'Automobiles', 'Featured'
  
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setTimeout(() => {
      const catalogSection = document.getElementById('product-catalog')
      if (catalogSection) {
        catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  const catalogProducts = {
    Fashion: [
      {
        id: 1,
        name: 'Consectetur Hampden',
        usdPrice: 98.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=600',
        desc: 'Premium full-grain leather flight jacket featuring soft cream shearling collar warmth.'
      },
      {
        id: 2,
        name: 'Accusantium Doloremque',
        usdPrice: 110.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600',
        desc: 'Bespoke camel brown leather shopper handbag decorated with traditional saddle stitching.'
      },
      {
        id: 3,
        name: 'Nostrud Exercitation',
        usdPrice: 93.10,
        originalUsdPrice: 98.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600',
        desc: 'Grained vegetable-tanned bifold leather wallet featuring six custom card slot inserts.'
      },
      {
        id: 3.1,
        name: 'Premium Leather Trench',
        usdPrice: 220.0,
        originalUsdPrice: 250.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600',
        desc: 'High-fashion double-breasted steerhide trench coat offering absolute insulation and tailored sleek fit.'
      },
      {
        id: 3.2,
        name: 'Classic Chelsea Boot',
        usdPrice: 135.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600',
        desc: 'Handcrafted premium aniline leather Chelsea boot completed with double-stitched wear soles.'
      },
      {
        id: 3.3,
        name: 'Elite Messenger Bag',
        usdPrice: 165.0,
        originalUsdPrice: 195.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600',
        desc: 'Spacious high-end messenger bag crafted from thick oiled steerhide leather, with brass latch.'
      }
    ],
    Electronics: [
      {
        id: 4,
        name: 'Cyber Leather Sleeve',
        usdPrice: 65.0,
        originalUsdPrice: 75.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600',
        desc: 'Ultra-slim water-resistant steerhide leather sleeve protector custom fitted for laptops.'
      },
      {
        id: 5,
        name: 'Acoustic Leather Case',
        usdPrice: 35.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600',
        desc: 'Molded raw organic leather protective vault case designed with heavy gold key clips.'
      },
      {
        id: 5.1,
        name: 'Saddle Leather Desk Mat',
        usdPrice: 55.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600',
        desc: 'Exquisite, spacious desk mat cut from premium saddle leather for an elegant tactile work experience.'
      },
      {
        id: 5.2,
        name: 'Heritage Phone Holster',
        usdPrice: 28.0,
        originalUsdPrice: 35.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600',
        desc: 'Custom-fit protective phone case wrapped in rich hand-polished steerhide leather.'
      },
      {
        id: 5.3,
        name: 'Lux Headphone Wrap',
        usdPrice: 45.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600',
        desc: 'Snug organizer casing for high-fidelity over-ear headphones made of thick vegetable-tanned hide.'
      },
      {
        id: 5.4,
        name: 'Luxury Stylus Cover',
        usdPrice: 18.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600',
        desc: 'Form-fitting raw vegetable-tanned leather stylus envelope to keep your pencil safe.'
      }
    ],
    'Baby & Kids': [
      {
        id: 6,
        name: 'Mini Leather Satchel',
        usdPrice: 78.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
        desc: 'Kid-sized vintage school bag satchel made of highly durable double-stitched leather.'
      },
      {
        id: 7,
        name: 'Artisan Soft Moccasins',
        usdPrice: 42.0,
        originalUsdPrice: 48.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600',
        desc: 'Ultra-supple organic vegetable-tanned baby moccasins carefully crafted for infant comfort.'
      },
      {
        id: 7.1,
        name: 'Art Toy Collector Bear',
        usdPrice: 60.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600',
        desc: 'Charming vintage teddy bear handmade entirely from supple scrap leather cuts.'
      },
      {
        id: 7.2,
        name: 'Kid Tan Suspenders',
        usdPrice: 24.0,
        originalUsdPrice: 30.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600',
        desc: 'Elegant premium leather suspenders designed for children, featuring polished brass adjusters.'
      },
      {
        id: 7.3,
        name: 'Toddler Trailpack',
        usdPrice: 85.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600',
        desc: 'Sturdy small scale vintage backpack complete with dual brass buckle fasteners.'
      },
      {
        id: 7.4,
        name: 'Artisan Height Ribbon',
        usdPrice: 32.0,
        originalUsdPrice: 38.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600',
        desc: 'Beautifully engraved growth charting ribbon designed to track kids heights over decades.'
      }
    ],
    Automobiles: [
      {
        id: 8,
        name: 'Prestige Seat Covers',
        usdPrice: 195.0,
        originalUsdPrice: 245.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600',
        desc: 'Custom-tailored premium genuine leather seat covers offering absolute comfort and pristine protection.'
      },
      {
        id: 9,
        name: 'Artisan Leather Key Fob',
        usdPrice: 22.0,
        originalUsdPrice: 28.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600',
        desc: 'Heavy vegetable-tanned authentic key casing completed with durable solid brass loop clip.'
      },
      {
        id: 9.1,
        name: 'Steerhide Driving Gloves',
        usdPrice: 95.0,
        originalUsdPrice: 110.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600',
        desc: 'Soft, breathable perforated steerhide driving gloves designed for optimal wheel grip and luxurious touch.'
      },
      {
        id: 9.2,
        name: 'Console Hanging Pouch',
        usdPrice: 48.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600',
        desc: 'Organized travel accessory hanging pouch that fits consoles, hand-stitched from durable hide.'
      },
      {
        id: 9.3,
        name: 'Steering Hide Wrap',
        usdPrice: 85.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600',
        desc: 'Perforated premium black leather wrap tailored specifically for premium luxury steering wheels.'
      },
      {
        id: 9.4,
        name: 'Prestige Leather Mats',
        usdPrice: 75.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600',
        desc: 'Double-stitched premium steerhide floor mats, custom-fit for all luxury vehicle floorboards.'
      }
    ],

    Featured: [
      {
        id: 10,
        name: 'Consectetur Hampden',
        usdPrice: 98.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=600',
        desc: 'Premium full-grain leather flight jacket featuring soft cream shearling collar warmth.'
      },
      {
        id: 11,
        name: 'Cyber Leather Sleeve',
        usdPrice: 65.0,
        originalUsdPrice: 75.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600',
        desc: 'Ultra-slim water-resistant steerhide leather sleeve protector custom fitted for laptops.'
      },
      {
        id: 12,
        name: 'Mini Leather Satchel',
        usdPrice: 78.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
        desc: 'Kid-sized vintage school bag satchel made of highly durable double-stitched leather.'
      },
      {
        id: 12.1,
        name: 'Steering Hide Wrap',
        usdPrice: 85.0,
        originalUsdPrice: 0,
        onSale: false,
        img: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600',
        desc: 'Perforated premium black leather wrap tailored specifically for premium luxury steering wheels.'
      },
      {
        id: 12.2,
        name: 'Premium Leather Duffel',
        usdPrice: 220.0,
        originalUsdPrice: 250.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600',
        desc: 'Spacious luxury travel duffel crafted from full-grain saddle leather, completed with sturdy reinforced handles.'
      },
      {
        id: 12.3,
        name: 'Elite Messenger Bag',
        usdPrice: 165.0,
        originalUsdPrice: 195.0,
        onSale: true,
        img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600',
        desc: 'Spacious high-end messenger bag crafted from thick oiled steerhide leather, with brass latch.'
      }
    ]
  }

  const getFilteredProducts = () => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return catalogProducts[activeCategory] || []
    }
    return Object.keys(catalogProducts).reduce((acc, cat) => {
      const filtered = catalogProducts[cat].filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query)
      )
      filtered.forEach(item => {
        if (!acc.some(exist => exist.id === item.id)) {
          acc.push(item)
        }
      })
      return acc
    }, [])
  }

  const filteredProducts = getFilteredProducts()

  // Active translation shorthand
  const t = translations[selectedLanguage]

  const slides = [
    { img: '/landing_hero_woman_handbag.png' },
    { img: '/landing_hero_man_backpack.png' },
    { img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200' },
    { img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200' }
  ]

  // Rotating accessories slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % t.slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [t.slides.length])

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'client') {
        navigate('/store')
      } else if (user.role === 'seller') {
        navigate('/seller/dashboard')
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard')
      }
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-white text-[#3E3A35] font-sans relative pb-0 overflow-x-hidden flex flex-col justify-between select-none">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="w-full bg-[#9c6a46] text-white py-2.5 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-[10px] font-extrabold tracking-wider border-b border-[#8c5a36] gap-2.5">
        
        {/* Sleek GitHub and LinkedIn Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#FAF7F2] transition-colors p-1 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#FAF7F2] transition-colors p-1 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <span className="h-3.5 w-[1px] bg-white/20" />
          <span className="opacity-90">{t.call}</span>
        </div>

        {/* Localized Dropdown Selections & Sign In Link */}
        <div className="flex items-center gap-3 uppercase text-[9px] font-black">
          
          {/* Dynamic Language Selector */}
          <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/30 transition-all duration-300 relative group cursor-pointer animate-in zoom-in-95 duration-200">
            <Globe size={11} className="text-white/80 transition-transform duration-300 group-hover:rotate-12" />
            <span className="tracking-wider">{selectedLanguage}</span>
            <div className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-white text-[#2c2925] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-30 min-w-[100px] animate-in fade-in slide-in-from-top-1 duration-200">
              {['English', 'Hindi', 'Spanish', 'German'].map((l) => (
                <div
                  key={l}
                  onClick={() => setSelectedLanguage(l)}
                  className={`px-3 py-2 normal-case font-bold border-b border-gray-50 last:border-0 transition-colors duration-200 hover:bg-[#9c6a46]/10 hover:text-[#9c6a46] ${
                    selectedLanguage === l ? 'bg-[#9c6a46]/5 text-[#9c6a46]' : ''
                  }`}
                >
                  {l === 'Hindi' ? 'हिन्दी' : l === 'Spanish' ? 'Español' : l}
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Currency Selector */}
          <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/30 transition-all duration-300 relative group cursor-pointer animate-in zoom-in-95 duration-200">
            <Landmark size={11} className="text-white/80 transition-transform duration-300 group-hover:scale-110" />
            <span className="tracking-wider">{selectedCurrency} ({currencySymbols[selectedCurrency]})</span>
            <div className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-white text-[#2c2925] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-30 min-w-[90px] animate-in fade-in slide-in-from-top-1 duration-200">
              {['INR', 'USD', 'EUR', 'GBP'].map((curr) => (
                <div
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-2 normal-case font-bold border-b border-gray-50 last:border-0 transition-colors duration-200 hover:bg-[#9c6a46]/10 hover:text-[#9c6a46] ${
                    selectedCurrency === curr ? 'bg-[#9c6a46]/5 text-[#9c6a46]' : ''
                  }`}
                >
                  {curr}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 2. DITTO REPLICA HEADER AREA (Shopping Cart completely removed, My Account relocated to the RIGHT) */}
      <header className="w-full bg-white py-6 px-6 md:px-12 border-b border-gray-100 flex items-center justify-between gap-6 relative z-20">
        
        {/* Left Side: Elegant Kanpur Stamp Seal replacing empty space */}
        <div className="flex items-center gap-2 select-none opacity-20 hidden md:flex">
          <Sparkles size={16} className="text-[#9c6a46]" />
          <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-walnut">Authentic Tanneries</span>
        </div>

        {/* Center: HUGE DITTO LOGO "THE TANNERY INDIA" WITH BEAUTIFUL CORNER EDGES */}
        <div className="relative px-8 py-3 bg-[#FAF7F2] border border-[#eae1d8] rounded-xl flex items-center justify-center group shadow-sm select-none">
          {/* Decorative Corner Brackets ("edges and all") */}
          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#9c6a46] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#9c6a46] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#9c6a46] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
          <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#9c6a46] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

          {/* Central Logo Typography */}
          <span className="font-serif font-black text-2xl sm:text-3xl tracking-[0.18em] uppercase leading-none text-[#2c2925] flex items-center gap-2">
            <span className="text-[#9c6a46]">THE TANNERY</span>
            <span className="text-[#1a1816] font-normal italic">INDIA</span>
          </span>
        </div>

        {/* Right Side: Sign In Block (Relocated Here & Replacing My Account) */}
        <button
          onClick={() => setShowPortalModal(true)}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 group-hover:border-[#9c6a46] group-hover:text-[#9c6a46] transition-colors">
            <User size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#2c2925]">{t.signIn}</p>
            <span className="text-[9px] text-[#9c6a46] font-extrabold uppercase">{t.getOption}</span>
          </div>
        </button>

      </header>

      {/* 3. DITTO BOTTOM HEADER NAVBAR WITH SEARCH BAR */}
      <div 
        className="w-full bg-[#fbfbfa] border-b border-gray-200 px-6 md:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 z-30 relative animate-in fade-in"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        
        {/* Navigation Categories mockup */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-extrabold uppercase tracking-widest text-[#4A4640]">
          {['Fashion', 'Electronics', 'Baby & Kids', 'Automobiles', 'Featured'].map((cat) => (
            <span
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              onMouseEnter={() => setHoveredCategory(cat)}
              className={`cursor-pointer pb-0.5 border-b-2 transition-all ${
                activeCategory === cat 
                  ? 'text-[#9c6a46] border-[#9c6a46]' 
                  : 'text-[#4A4640] border-transparent hover:text-[#9c6a46]'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Right Search Input Box */}
        <TypewriterSearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} setSearchQuery={setSearchQuery} />

        {/* Absolute Hover Dropdown Mega Menu */}
        {hoveredCategory && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_20px_45px_rgba(0,0,0,0.08)] py-8 px-12 z-40 animate-in slide-in-from-top-3 fade-in duration-300 ease-out grid grid-cols-1 md:grid-cols-4 gap-8 select-none text-left">
            
            {/* Column 1: Header & Highlight Description */}
            <div className="space-y-4 col-span-1 md:border-r md:border-gray-100 pr-6 animate-in fade-in slide-in-from-left-2 duration-300 ease-out">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9c6a46] block">
                {hoveredCategory} Collection
              </span>
              <h4 className="text-sm font-serif font-black text-[#2c2925] uppercase tracking-wider leading-snug">
                Genuine Leather Goods & Accessories
              </h4>
              <p className="text-[9px] text-gray-400 font-semibold leading-relaxed uppercase">
                Handcrafted from authentic steerhide and Kanpur saddle leather. Delivered safely nationwide.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    handleCategoryChange(hoveredCategory);
                    setHoveredCategory(null);
                  }}
                  className="px-3.5 py-1.5 bg-[#9c6a46] hover:bg-[#8c5a36] text-white rounded text-[8px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Full Catalog
                </button>
              </div>
            </div>

            {/* Column 2 & 3: Interactive Grid of 10-12 Leather Goods Available */}
            <div className="col-span-1 md:col-span-2 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                Kinds Of Goods Crafted:
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-bold text-[#4A4640]">
                {megaMenuData[hoveredCategory]?.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      handleCategoryChange(hoveredCategory);
                      setHoveredCategory(null);
                    }}
                    className="flex items-center gap-2.5 hover:text-[#9c6a46] hover:-translate-y-1 transform transition-all duration-300 ease-out cursor-pointer py-1.5 border-b border-gray-50 hover:border-[#9c6a46]/20 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9c6a46] transition-all duration-300 ease-out group-hover:scale-150 group-hover:bg-[#dfa85c]" />
                    <span className="transition-transform duration-300 ease-out transform group-hover:translate-x-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Quality Stamp & Preview image */}
            <div className="col-span-1 bg-[#FAF7F2] rounded-2xl p-4 border border-[#eae1d8] flex flex-col justify-between items-center text-center relative overflow-hidden group">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#dfa85c]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#dfa85c]" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#dfa85c]" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#dfa85c]" />
              
              <div className="space-y-1.5">
                <Sparkles size={16} className="text-[#9c6a46] mx-auto animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest text-[#9c6a46] block">
                  100% Genuine Hide
                </span>
                <p className="text-[8.5px] text-[#2c2925] font-extrabold uppercase leading-snug">
                  Traditional Saddle Stitching & Hand Finished Edges
                </p>
              </div>

              <div className="w-full aspect-[16/10] bg-white rounded-lg border border-gray-100 overflow-hidden mt-3">
                <img
                  src={
                    hoveredCategory === 'Fashion' ? 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=300' :
                    hoveredCategory === 'Electronics' ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300' :
                    hoveredCategory === 'Baby & Kids' ? 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300' :
                    hoveredCategory === 'Automobiles' ? 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=300' :
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300'
                  }
                  alt="Quality Leather Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Main Layout Contents */}
      <div className="flex-1 w-full relative z-10 flex flex-col space-y-0">
        
        {/* ================= HERO SLIDER WITH FASHION MODEL WALKING (DITTO MOCKUP!) ================= */}
        <section className="w-full relative overflow-hidden bg-[#FAF7F2] aspect-[21/9] min-h-[360px] md:min-h-[500px] flex items-center border-b border-gray-150 animate-in fade-in duration-700">
          
          {/* Transparent slide elements */}
          <div className="absolute inset-0 w-full h-full flex items-center">
            {/* Photo on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 h-full">
              {slides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.img}
                  alt={`Model Leather Fashion walking ${idx}`}
                  className={`absolute inset-0 w-full h-full object-cover object-left transition-opacity duration-1000 ease-in-out ${
                    idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none z-20" />
            </div>

            {/* Localized typography details */}
            <div key={activeSlide} className="max-w-7xl mx-auto w-full px-8 md:px-16 relative z-20 flex flex-col items-start space-y-3 md:space-y-4 animate-in fade-in duration-1000 slide-in-from-bottom-2">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#9c6a46] block animate-pulse">
                {t.slides[activeSlide].subtitle}
              </span>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#2a2622] tracking-tight uppercase leading-[1.05] max-w-xl">
                {t.slides[activeSlide].title.split(' ')[0]} <br/>
                <span className="text-[#9c6a46]">{t.slides[activeSlide].title.split(' ')[1] || ''}</span>
              </h1>
              
              <p className="text-xs md:text-sm font-extrabold text-[#4A4640] tracking-wide uppercase">
                {t.slides[activeSlide].promo}
              </p>

              <button
                onClick={() => setShowPortalModal(true)}
                className="rounded bg-[#9c6a46] hover:bg-[#8c5a36] text-white px-7 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md hover:scale-105 duration-300 cursor-pointer"
              >
                {t.viewCollection}
              </button>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
                  idx === activeSlide ? 'bg-[#9c6a46] scale-110' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

        </section>

        {/* 4. DITTO ROW BADGES */}
        <div className="w-full bg-[#fcfcfc] border-b border-gray-150 py-5 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="flex items-center justify-center gap-3.5 text-left py-2 md:py-0">
            <Phone size={18} className="text-[#9c6a46]" />
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2c2925]">{t.supportTitle}</h4>
              <p className="text-[9px] text-gray-400 font-extrabold uppercase">{t.supportDesc}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3.5 text-left py-2 md:py-0">
            <RotateCcw size={18} className="text-[#9c6a46]" />
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2c2925]">{t.guaranteeTitle}</h4>
              <p className="text-[9px] text-gray-400 font-extrabold uppercase">{t.guaranteeDesc}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3.5 text-left py-2 md:py-0">
            <Truck size={18} className="text-[#9c6a46]" />
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2c2925]">{t.shippingTitle}</h4>
              <p className="text-[9px] text-gray-400 font-extrabold uppercase">{t.shippingDesc}</p>
            </div>
          </div>
        </div>

        {/* 5. DITTO DYNAMIC CATALOG GRID SECTION */}
        <section id="product-catalog" className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full space-y-10 animate-in fade-in duration-300">
          
          {/* Header Row */}
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-[#9c6a46] text-white px-5 py-2 rounded text-[10px] font-black uppercase tracking-widest">
                {searchQuery ? `Search: "${searchQuery}"` : t.bestProducts}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[9px] font-black uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors border border-gray-200 px-2.5 py-1.5 rounded bg-gray-50 flex items-center gap-1 cursor-pointer"
                >
                  <X size={9} /> Clear Search
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="text-[#9c6a46] cursor-pointer">{t.featured}</span>
              <span className="cursor-pointer hover:text-walnut">{t.newArrivals}</span>
            </div>
          </div>

          {/* Dynamic category cards list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setShowPortalModal(true)}
                  className="bg-white rounded border border-gray-150 hover:border-[#9c6a46] p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl group cursor-pointer relative"
                >
                  
                  {/* Visual Frame */}
                  <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center p-2 rounded overflow-hidden relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.onSale && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                        On Sale!
                      </span>
                    )}
                  </div>

                  {/* Localized Descriptive Details */}
                  <div className="space-y-2 mt-4 flex-1 flex flex-col justify-between w-full">
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-[#3E3A35] group-hover:text-[#9c6a46] transition-colors leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-[9px] text-gray-400 font-semibold leading-relaxed min-h-[30px] line-clamp-2 px-1">
                        {product.desc}
                      </p>
                    </div>

                    {/* Dynamically Converted Money Values */}
                    <div className="flex items-center justify-center gap-2.5 pt-2">
                      {product.originalUsdPrice > 0 && (
                        <span className="text-[10px] text-gray-400 line-through font-semibold">
                          {formatPrice(product.originalUsdPrice)}
                        </span>
                      )}
                      <span className="text-[12px] font-black text-walnut">
                        {formatPrice(product.usdPrice)}
                      </span>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <Search size={32} className="text-gray-300 mx-auto animate-bounce" />
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400">
                  No leather items match your search
                </h4>
                <p className="text-[10px] text-gray-400 font-semibold max-w-md mx-auto leading-relaxed">
                  We couldn't find any products matching <span className="text-[#9c6a46]">"{searchQuery}"</span>. Try searching for popular items like <span className="underline cursor-pointer text-[#9c6a46] hover:text-[#8c5a36]" onClick={() => handleSearchChange('bag')}>"bags"</span>, <span className="underline cursor-pointer text-[#9c6a46] hover:text-[#8c5a36]" onClick={() => handleSearchChange('seat')}>"seats"</span>, or <span className="underline cursor-pointer text-[#9c6a46] hover:text-[#8c5a36]" onClick={() => handleSearchChange('jacket')}>"jackets"</span>!
                </p>
              </div>
            )}
          </div>

        </section>

      </div>

      {/* ================= DITTO MOCKUP FOOTER ================= */}
      <footer className="w-full bg-[#150a05] text-[#FAF7F2]/60 border-t border-white/5 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-12 items-start text-xs font-semibold leading-relaxed">
          
          {/* Brand Col */}
          <div className="sm:col-span-5 space-y-6">
            {/* Footer Logo Frame with Corner Edges */}
            <div className="relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center w-fit select-none">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#dfa85c]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#dfa85c]" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#dfa85c]" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#dfa85c]" />
              
              <span className="font-sans font-black text-lg tracking-widest text-white uppercase">
                <span className="text-[#dfa85c]">THE TANNERY </span>
                <span>INDIA</span>
              </span>
            </div>
            
            <p className="max-w-xs text-[10px] text-[#FAF7F2]/50 leading-relaxed font-semibold">
              {t.footerDesc}
            </p>
            
            {/* Github / Linkedin items */}
            <div className="flex gap-4 items-center pt-2 text-[10px] text-[#dfa85c] font-black uppercase tracking-widest">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="sm:col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-[9px] border-b border-white/10 pb-1.5">{t.pagesTitle}</h4>
              <div className="flex flex-col gap-2 font-semibold text-[10px]">
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Shops</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Our Stories</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Mission & Vision</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Company Overview</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">NEWS</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-[9px] border-b border-white/10 pb-1.5">{t.policiesTitle}</h4>
              <div className="flex flex-col gap-2 font-semibold text-[10px]">
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
                <span onClick={() => setShowPortalModal(true)} className="hover:text-white transition-colors cursor-pointer">FAQs</span>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div className="sm:col-span-3 space-y-4">
            <h4 className="font-bold text-white uppercase tracking-widest text-[9px] border-b border-white/10 pb-1.5">{t.contactTitle}</h4>
            <div className="flex flex-col gap-2 font-semibold text-[10px]">
              <p className="text-white/80">
                Address:<br/>
                <span className="text-[#FAF7F2]/60">220/A Kanpur Springs Rd, Kanpur, India</span>
              </p>
              <p className="text-white/80 mt-1">
                Email:<br/>
                <span className="text-[#dfa85c] hover:underline cursor-pointer">admin@leathercraft.com</span>
              </p>
              <p className="text-white/80 mt-1">
                Customer Support:<br/>
                <span className="text-[#FAF7F2]/60">+91-999-000-111</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright board line */}
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 text-center text-[9px] uppercase tracking-widest text-[#FAF7F2]/30 font-extrabold select-none">
          © 2026 The Tannery India. All rights reserved.
        </div>
      </footer>

      {/* High-End Selection Modal Dialog Overlay */}
      {showPortalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/75 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 border border-sand/40 shadow-[0_30px_80px_rgba(78,26,18,0.22)] space-y-6 animate-in zoom-in duration-200">
            
            <button
              onClick={() => setShowPortalModal(false)}
              className="absolute top-5 right-5 h-9 w-9 bg-ivory rounded-full border border-sand/30 hover:border-sand flex items-center justify-center text-walnut/60 hover:text-walnut transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="text-center space-y-2">
              <span className="font-sans font-black text-2xl tracking-widest text-walnut uppercase">
                <span className="text-[#9c6a46]">THE TANNERY </span>
                <span>INDIA</span>
              </span>
              <h3 className="text-xl font-serif font-extrabold text-walnut uppercase tracking-widest text-[13px] mt-2">
                {t.selectPortal}
              </h3>
              <p className="text-[11px] text-walnut/60 font-semibold leading-relaxed">
                {t.selectPortalDesc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  setShowPortalModal(false);
                  navigate('/login?role=client');
                }}
                className="w-full py-4 bg-walnut hover:bg-walnut/90 text-white rounded-2xl font-extrabold uppercase tracking-widest text-[10px] shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/5"
              >
                <User size={13} className="text-[#dfa85c]" />
                <span>{t.customerBtn}</span>
              </button>

              <button
                onClick={() => {
                  setShowPortalModal(false);
                  navigate('/login?role=seller');
                }}
                className="w-full py-4 bg-white hover:bg-ivory text-walnut rounded-2xl font-extrabold uppercase tracking-widest text-[10px] shadow-sm hover:border-walnut transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#eae1d8]"
              >
                <User size={13} className="text-[#dfa85c]" />
                <span>{t.sellerBtn}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#eae1d8]/40 text-center">
              <Link
                to="/admin/login"
                onClick={() => setShowPortalModal(false)}
                className="inline-flex items-center gap-1.5 text-[9px] font-bold text-walnut/40 hover:text-walnut/70 uppercase tracking-widest transition-colors"
              >
                <Lock size={10} />
                <span>{t.adminBtn}</span>
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

function TypewriterSearchInput({ searchQuery, onSearchChange, setSearchQuery }) {
  const [typewriterPlaceholder, setTypewriterPlaceholder] = useState('Search our catalog...')

  useEffect(() => {
    const placeholders = [
      'Search bags...',
      'Search seats...',
      'Search jackets...',
      'Search key fobs...',
      'Search accessories...',
      'Search our catalog...'
    ]
    let currentIdx = 0
    let charIdx = 0
    let isDeleting = false
    let timer

    const type = () => {
      const fullText = placeholders[currentIdx]
      if (!isDeleting) {
        setTypewriterPlaceholder(fullText.substring(0, charIdx + 1))
        charIdx++
        if (charIdx === fullText.length) {
          isDeleting = true
          timer = setTimeout(type, 1500)
        } else {
          timer = setTimeout(type, 80)
        }
      } else {
        setTypewriterPlaceholder(fullText.substring(0, charIdx - 1))
        charIdx--
        if (charIdx === 0) {
          isDeleting = false
          currentIdx = (currentIdx + 1) % placeholders.length
          timer = setTimeout(type, 300)
        } else {
          timer = setTimeout(type, 40)
        }
      }
    }

    type()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center rounded overflow-hidden border border-gray-200 bg-white relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={typewriterPlaceholder}
        className="px-3 py-1.5 text-[10px] font-semibold outline-none w-48 text-[#4A4640] placeholder:text-gray-400"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-9 text-gray-400 hover:text-walnut p-1"
        >
          <X size={10} />
        </button>
      )}
      <button
        onClick={() => {
          const catalogSection = document.getElementById('product-catalog')
          if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        className="bg-[#f0f0ee] border-l border-gray-200 hover:bg-[#e2e2df] px-3.5 py-2 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
      >
        <Search size={11} />
      </button>
    </div>
  )
}
