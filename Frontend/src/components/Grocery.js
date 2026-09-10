import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Search, Plus, Minus, X, Trash2, Leaf, Star, Loader2, CheckCircle2 } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Fresh Bananas', category: 'Fruits', price: 40, unit: 'dozen', emoji: '🍌', tag: 'Bestseller', rating: 4.5 },
  { id: 2, name: 'Red Apples', category: 'Fruits', price: 180, unit: 'kg', emoji: '🍎', rating: 4.2 },
  { id: 3, name: 'Strawberries', category: 'Fruits', price: 120, unit: 'box', emoji: '🍓', tag: 'Fresh', rating: 4.8 },
  { id: 4, name: 'Seedless Grapes', category: 'Fruits', price: 90, unit: 'kg', emoji: '🍇', rating: 4.0 },
  { id: 5, name: 'Oranges', category: 'Fruits', price: 70, unit: 'kg', emoji: '🍊', rating: 4.1 },
  { id: 6, name: 'Alphonso Mangoes', category: 'Fruits', price: 150, unit: 'kg', emoji: '🥭', tag: 'Seasonal', rating: 4.9 },

  { id: 7, name: 'Tomatoes', category: 'Vegetables', price: 30, unit: 'kg', emoji: '🍅', rating: 4.3 },
  { id: 8, name: 'Spinach', category: 'Vegetables', price: 25, unit: 'bunch', emoji: '🥬', tag: 'Fresh', rating: 4.5 },
  { id: 9, name: 'Carrots', category: 'Vegetables', price: 45, unit: 'kg', emoji: '🥕', rating: 4.2 },
  { id: 10, name: 'Bell Peppers', category: 'Vegetables', price: 80, unit: 'kg', emoji: '𫑑', rating: 4.0 },
  { id: 11, name: 'Onions', category: 'Vegetables', price: 35, unit: 'kg', emoji: '🧅', rating: 3.9 },
  { id: 12, name: 'Potatoes', category: 'Vegetables', price: 28, unit: 'kg', emoji: '🥔', rating: 4.1 },

  { id: 13, name: 'Whole Milk', category: 'Dairy', price: 64, unit: 'litre', emoji: '🥛', rating: 4.6 },
  { id: 14, name: 'Greek Yogurt', category: 'Dairy', price: 55, unit: 'cup', emoji: '🥣', rating: 4.4 },
  { id: 15, name: 'Cheddar Cheese', category: 'Dairy', price: 220, unit: 'block', emoji: '🧀', tag: 'Premium', rating: 4.7 },
  { id: 16, name: 'Farm Eggs', category: 'Dairy', price: 90, unit: 'dozen', emoji: '🥚', rating: 4.3 },
  { id: 17, name: 'Butter', category: 'Dairy', price: 180, unit: 'pack', emoji: '🧈', rating: 4.5 },
  { id: 18, name: 'Paneer', category: 'Dairy', price: 110, unit: 'pack', emoji: '🧀', tag: 'Fresh', rating: 4.6 },

  { id: 19, name: 'Whole Wheat Bread', category: 'Bakery', price: 45, unit: 'loaf', emoji: '🍞', rating: 4.2 },
  { id: 20, name: 'Croissants', category: 'Bakery', price: 35, unit: 'piece', emoji: '🥐', rating: 4.5 },
  { id: 21, name: 'Bagels', category: 'Bakery', price: 60, unit: 'pack of 4', emoji: '🥯', rating: 4.0 },
  { id: 22, name: 'Blueberry Muffins', category: 'Bakery', price: 50, unit: 'piece', emoji: '🧁', tag: 'New', rating: 4.8 },

  { id: 23, name: 'Basmati Rice', category: 'Pantry', price: 150, unit: '5kg bag', emoji: '🍚', rating: 4.4 },
  { id: 24, name: 'Olive Oil', category: 'Pantry', price: 450, unit: 'litre', emoji: '𫑓', tag: 'Premium', rating: 4.8 },
  { id: 25, name: 'Pasta', category: 'Pantry', price: 75, unit: 'pack', emoji: '🍝', rating: 4.1 },
  { id: 26, name: 'Red Lentils', category: 'Pantry', price: 95, unit: 'kg', emoji: '𫑘', rating: 4.2 },
  { id: 27, name: 'Honey', category: 'Pantry', price: 280, unit: 'jar', emoji: '🍯', rating: 4.6 },

  { id: 28, name: 'Orange Juice', category: 'Beverages', price: 90, unit: 'litre', emoji: '𧃃', rating: 4.1 },
  { id: 29, name: 'Green Tea', category: 'Beverages', price: 160, unit: 'box', emoji: '🍵', rating: 4.4 },
  { id: 30, name: 'Coffee Beans', category: 'Beverages', price: 380, unit: 'pack', emoji: '☕', tag: 'Bestseller', rating: 4.9 },
  { id: 31, name: 'Sparkling Water', category: 'Beverages', price: 50, unit: 'pack of 6', emoji: '🫧', rating: 4.0 },

  { id: 32, name: 'Mixed Nuts', category: 'Snacks', price: 320, unit: 'pack', emoji: '🥜', rating: 4.5 },
  { id: 33, name: 'Potato Chips', category: 'Snacks', price: 40, unit: 'pack', emoji: '🍟', rating: 3.8 },
  { id: 34, name: 'Dark Chocolate', category: 'Snacks', price: 130, unit: 'bar', emoji: '🍫', tag: 'New', rating: 4.7 },
  { id: 35, name: 'Granola Bars', category: 'Snacks', price: 150, unit: 'box of 6', emoji: '🍪', rating: 4.3 },

  { id: 36, name: 'Frozen Peas', category: 'Frozen', price: 60, unit: 'pack', emoji: '🟢', rating: 4.0 },
  { id: 37, name: 'Vanilla Ice Cream', category: 'Frozen', price: 220, unit: 'tub', emoji: '🍦', rating: 4.6 },
  { id: 38, name: 'Veggie Pizza', category: 'Frozen', price: 280, unit: 'piece', emoji: '🍕', rating: 4.2 },

  { id: 39, name: 'Chicken Breast', category: 'Meat & Seafood', price: 280, unit: 'kg', emoji: '🍗', rating: 4.5 },
  { id: 40, name: 'Salmon Fillet', category: 'Meat & Seafood', price: 650, unit: 'kg', emoji: '🐟', tag: 'Premium', rating: 4.8 },
  { id: 41, name: 'Tiger Shrimp', category: 'Meat & Seafood', price: 480, unit: '500g pack', emoji: '🍤', rating: 4.6 },

  { id: 42, name: 'Fresh Basil', category: 'Herbs & Spices', price: 30, unit: 'bunch', emoji: '🌿', rating: 4.4 },
  { id: 43, name: 'Turmeric Powder', category: 'Herbs & Spices', price: 60, unit: 'pack', emoji: '🟡', rating: 4.2 },
  { id: 44, name: 'Black Pepper', category: 'Herbs & Spices', price: 90, unit: 'pack', emoji: '🌶️', rating: 4.5 },
  { id: 45, name: 'Cinnamon Sticks', category: 'Herbs & Spices', price: 70, unit: 'pack', emoji: '𫑔', rating: 4.3 },
];

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const formatPrice = (n) => `₹${n.toFixed(2)}`;

// Exact mappings of every specific product to a high-quality real Unsplash photo of that item
const EXACT_PRODUCT_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600', // Bananas
  2: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=600', // Red Apples
  3: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600', // Strawberries
  4: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=600', // Grapes
  5: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600', // Oranges
  6: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=600', // Mangoes
  7: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', // Tomatoes
  8: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600', // Spinach
  9: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600', // Carrots
  10: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=600', // Bell Peppers
  11: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=600', // Onions
  12: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600', // Potatoes
  13: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600', // Whole Milk
  14: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600', // Greek Yogurt
  15: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=600', // Cheddar Cheese
  16: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600', // Farm Eggs
  17: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600', // Butter
  18: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&q=80&w=600', // Paneer
  19: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', // Wheat Bread
  20: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600', // Croissants
  21: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600', // Bagels
  22: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=600', // Blueberry Muffins
  23: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=600', // Basmati Rice
  24: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600', // Olive Oil
  25: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=600', // Pasta
  26: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&q=80&w=600', // Red Lentils
  27: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=600', // Honey
  28: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600', // Orange Juice
  29: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=600', // Green Tea
  30: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600', // Coffee Beans
  31: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600', // Sparkling Water
  32: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600', // Mixed Nuts
  33: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=600', // Potato Chips
  34: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600', // Dark Chocolate
  35: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=600', // Granola Bars
  36: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=600', // Frozen Peas
  37: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=600', // Vanilla Ice Cream
  38: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600', // Veggie Pizza
  39: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600', // Chicken Breast
  40: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600', // Salmon Fillet
  41: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600', // Tiger Shrimp
  42: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=600', // Fresh Basil
  43: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600', // Turmeric Powder
  44: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', // Black Pepper
  45: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=600', // Cinnamon Sticks
};

// --- API Service Simulation ---
const fetchRealPhotosAPI = async () => {
  return EXACT_PRODUCT_PHOTOS;
};

const Grocery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  
  // States for Real Photo API & Checkout
  const [productPhotos, setProductPhotos] = useState(EXACT_PRODUCT_PHOTOS);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Trigger the API Call on mount
  useEffect(() => {
    let isMounted = true;
    const loadPhotos = async () => {
      try {
        const fetchedPhotos = await fetchRealPhotosAPI();
        if (isMounted) setProductPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Failed to load real photos:", error);
      }
    };
    
    loadPhotos();
    return () => { isMounted = false; };
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const addToCart = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const decreaseFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return next;
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleCheckout = () => {
    // Process payment and show success UI
    setCheckoutSuccess(true);
    
    // Auto-close and clear cart after 3 seconds
    setTimeout(() => {
      setCart({});
      setCheckoutSuccess(false);
      setCartOpen(false);
    }, 3000);
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === Number(id));
      return { ...product, qty };
    });
  }, [cart]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-neutral-50 selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-neutral-950/0 to-transparent -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
        
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 mb-6 text-xs font-black uppercase tracking-widest text-emerald-400 border border-white/10 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Farm Fresh Delivery
          </div>
          <h1 className="max-w-4xl mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700">Groceries</span> Await.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
            Immerse yourself in a curated collection of farm-fresh produce and daily essentials. Handpicked for the discerning palate.
          </p>
        </div>

        {/* Highly Professional Sticky Control Panel */}
        <div className="sticky top-6 z-30 mb-12 flex flex-col gap-4 transition-all duration-300">
          
          {/* Top Row: Search & Cart (Frosted Glass Pill) */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between rounded-[2rem] sm:rounded-full bg-neutral-900/80 p-2 sm:pl-6 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            
            <div className="relative group w-full sm:max-w-md shrink-0 flex-1">
              <div className="absolute inset-y-0 left-4 sm:left-0 flex items-center pointer-events-none text-neutral-500 transition-colors group-focus-within:text-amber-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                className="w-full bg-transparent py-3 pl-12 sm:pl-8 pr-6 text-sm font-medium text-white placeholder-neutral-500 border-none focus:outline-none focus:ring-0"
                type="text"
                placeholder="Search premium produce, dairy, pantry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="shrink-0 w-full sm:w-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-8 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)] active:scale-95 flex items-center justify-center gap-3"
            >
              <ShoppingCart className="h-5 w-5" />
              Basket
              {totalItems > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950/20 text-neutral-950 text-xs font-black backdrop-blur-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Bottom Row: Elegant Filter Pills (Always wraps, never hides) */}
          <div className="flex flex-wrap gap-2.5 items-center justify-center w-full px-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative flex items-center gap-2.5 shrink-0 rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 border backdrop-blur-xl ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]"
                      : "bg-neutral-900/60 text-neutral-400 border-white/5 hover:bg-neutral-800 hover:text-white hover:border-white/10"
                  }`}
                >
                  {/* Glowing active dot indicator */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mx-auto max-w-2xl mt-12 flex flex-col items-center justify-center rounded-[3rem] border border-white/5 bg-neutral-900/30 py-32 px-8 backdrop-blur-md text-center shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none" />
             <div className="mb-8 rounded-full bg-neutral-950 p-8 text-neutral-600 border border-white/5 shadow-inner">
                 <Leaf className="h-16 w-16" />
             </div>
             <h3 className="mb-4 text-3xl font-black text-white tracking-tight">Zero Matches Found</h3>
             <p className="text-neutral-400 max-w-md text-base leading-relaxed font-medium">
                 The fresh produce you're searching for eludes us. Try altering your parameters.
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const qtyInCart = cart[product.id] || 0;
              const isPremium = product.tag === 'Premium';

              return (
                <div
                  key={product.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-neutral-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] hover:border-amber-500/40 will-change-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-10" />

                  {/* Image Header with API Integration */}
                  <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-t-[2.5rem] bg-neutral-950 flex items-center justify-center">
                    
                    {photosLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/80 z-10">
                        <Loader2 className="w-8 h-8 text-amber-500/50 animate-spin" />
                      </div>
                    ) : (
                      <img
                        src={productPhotos[product.id]}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:rotate-1 z-10"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'; // Hide broken image
                          e.currentTarget.nextElementSibling.style.display = 'flex'; // Show emoji fallback
                        }}
                      />
                    )}
                    
                    {/* Hidden Fallback view (shows emoji if API image breaks) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950" style={{ display: 'none' }}>
                      <span className="text-6xl drop-shadow-2xl">{product.emoji}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />

                    {product.tag && (
                      <div className="absolute top-5 left-5 z-20 flex items-center justify-between overflow-hidden rounded-2xl bg-black/50 px-3 py-1.5 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-1">
                        <span className={`text-xs font-bold uppercase tracking-widest drop-shadow-md ${isPremium ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {product.tag}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm font-bold backdrop-blur-md border border-white/10 shadow-inner">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="text-white/90">{product.rating}</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col p-6 z-20">
                    <h3 className="mb-2 line-clamp-2 text-xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-amber-400">
                      {product.name}
                    </h3>
                    
                    <p className="mb-6 text-sm font-medium text-neutral-400">
                      Sold per {product.unit}
                    </p>

                    <div className="mt-auto flex items-center justify-between rounded-2xl bg-neutral-950/50 p-3 border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-white">{formatPrice(product.price)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {qtyInCart === 0 ? (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-amber-400 transition-colors hover:bg-amber-500 hover:text-neutral-950 border border-white/10"
                          >
                            <Plus className="w-4 h-4" /> Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 px-2 py-1.5 border border-amber-500/30">
                            <button
                              onClick={() => decreaseFromCart(product.id)}
                              className="rounded-lg bg-neutral-950 p-1.5 text-neutral-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-4 text-center text-sm font-bold text-amber-500">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => addToCart(product.id)}
                              className="rounded-lg bg-amber-500 p-1.5 text-neutral-950 transition-colors hover:bg-amber-400"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Glassmorphic Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md h-full shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/10 bg-neutral-900 overflow-hidden transform transition-transform">
            
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-500/10 via-neutral-900/0 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-amber-500" />
                </div>
                Your Basket
              </h2>
              <button onClick={() => setCartOpen(false)} className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-4 scrollbar-none space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingCart className="w-16 h-16 mb-4 text-neutral-500" />
                  <p className="text-lg font-bold text-white">Your basket is empty</p>
                  <p className="text-sm text-neutral-400">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                cartItems.map((item) => {
                  return (
                    <div key={item.id} className="group flex items-center gap-4 rounded-[1.5rem] bg-neutral-950/50 p-3 border border-white/5 hover:border-amber-500/30 transition-colors">
                      
                      {/* Cart Item Image with API state integration */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center bg-neutral-800">
                        {photosLoading ? (
                          <Loader2 className="w-4 h-4 text-amber-500/50 animate-spin" />
                        ) : (
                          <img 
                            src={productPhotos[item.id]} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover z-10" 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        )}
                        <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900" style={{ display: 'none' }}>
                          <span className="text-2xl">{item.emoji}</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-white truncate group-hover:text-amber-400 transition-colors">{item.name}</p>
                        <p className="text-xs font-medium text-neutral-500 mt-0.5">{formatPrice(item.price)} / {item.unit}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => decreaseFromCart(item.id)} className="p-1 rounded-md bg-neutral-800 text-neutral-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-white w-4 text-center">{item.qty}</span>
                          <button onClick={() => addToCart(item.id)} className="p-1 rounded-md bg-neutral-800 text-neutral-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 pr-2">
                        <span className="text-sm font-black text-amber-500">{formatPrice(item.price * item.qty)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-rose-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Dynamic Footer: Success UI or Checkout Button */}
            {checkoutSuccess ? (
              <div className="relative z-10 px-6 py-12 border-t border-emerald-500/20 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Order Confirmed!</h3>
                <p className="text-sm text-neutral-400">Your farm-fresh groceries are securely on their way.</p>
              </div>
            ) : (
              cartItems.length > 0 && (
                <div className="relative z-10 px-6 py-6 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-neutral-400 font-medium">Subtotal</span>
                    <span className="text-2xl font-black text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 py-4 text-sm font-black uppercase tracking-widest text-neutral-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Grocery;