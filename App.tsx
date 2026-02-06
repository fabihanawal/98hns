
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_MENU_DATA, INITIAL_CATEGORIES, INITIAL_HERO_IMAGES } from './constants';
import { MenuItem, MenuItemOption, CartItem, Order } from './types';
import Logo from './components/Logo';
import MenuCard from './components/MenuCard';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import BookingForm from './components/BookingForm';
import { ShoppingBag, Flame, MapPin, Phone, Instagram, Facebook, Clock, UtensilsCrossed, CheckCircle2, X, Lock, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  // Persistence Initialization
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('98_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_DATA;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('98_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [heroImages, setHeroImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('98_slides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_IMAGES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('98_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Admin States
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });

  // Sync with LocalStorage
  useEffect(() => { localStorage.setItem('98_menu', JSON.stringify(menu)); }, [menu]);
  useEffect(() => { localStorage.setItem('98_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('98_slides', JSON.stringify(heroImages)); }, [heroImages]);
  useEffect(() => { localStorage.setItem('98_orders', JSON.stringify(orders)); }, [orders]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (heroImages.length > 0) {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages]);

  const filteredMenu = useMemo(() => 
    menu.filter(item => item.category === activeCategory),
    [activeCategory, menu]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  const handleAddToCart = (item: MenuItem, option?: MenuItemOption) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedOptionLabel === option?.label);
      if (existing) {
        return prev.map(i => 
          i.id === item.id && i.selectedOptionLabel === option?.label 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { 
        ...item, 
        quantity: 1, 
        selectedOptionLabel: option?.label,
        finalPrice: option ? option.price : Number(item.price)
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, label: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedOptionLabel === label) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string, label: string | undefined) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedOptionLabel === label)));
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setShowBookingForm(true);
  };

  const handleOrderSubmit = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: Date.now()
    };
    setOrders([newOrder, ...orders]);
    setShowBookingForm(false);
    setIsOrderSuccess(true);
    setCart([]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === 'admin' && loginForm.pass === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginForm({ user: '', pass: '' });
    } else {
      alert('ভুল ইউজারনেম বা পাসওয়ার্ড!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0a0a0a]">
      {/* Admin Panel Overlay */}
      {isAdmin && (
        <AdminPanel 
          menu={menu}
          categories={categories}
          heroImages={heroImages}
          orders={orders}
          onUpdateMenu={setMenu}
          onUpdateCategories={setCategories}
          onUpdateHeroImages={setHeroImages}
          onUpdateOrders={setOrders}
          onClose={() => setIsAdmin(false)}
          onLogout={() => setIsAdmin(false)}
        />
      )}

      {/* Booking Form Overlay */}
      {showBookingForm && (
        <BookingForm
          cart={cart}
          total={totalPrice}
          onClose={() => setShowBookingForm(false)}
          onSubmit={handleOrderSubmit}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowLogin(false)} />
          <form onSubmit={handleLogin} className="relative bg-[#1a1a1a] p-8 rounded-3xl border border-[#FF4500]/30 w-full max-w-sm shadow-2xl animate-scale-in">
            <h3 className="text-3xl font-black italic mb-6 fire-text text-center">অ্যাডমিন লগইন</h3>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="ইউজারনেম"
                value={loginForm.user}
                onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FF4500]"
                required
              />
              <input 
                type="password"
                placeholder="পাসওয়ার্ড"
                value={loginForm.pass}
                onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FF4500]"
                required
              />
              <button type="submit" className="w-full py-4 bg-[#FF4500] text-white font-black rounded-xl hover:shadow-[0_0_20px_rgba(255,69,0,0.4)] transition-all">
                প্রবেশ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Modal */}
      {isOrderSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsOrderSuccess(false)} />
          <div className="relative bg-[#1a1a1a] border border-[#FF4500]/30 p-8 rounded-3xl max-w-sm w-full text-center fire-shadow animate-scale-in">
            <button onClick={() => setIsOrderSuccess(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="mb-6 flex justify-center">
              <div className="bg-[#FF4500]/20 p-4 rounded-full"><CheckCircle2 size={64} className="text-[#FF4500] animate-bounce" /></div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2 italic">বুকিং সফল হয়েছে!</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">আপনার অর্ডারটি আমাদের কাছে পৌঁছেছে। এডমিন শীঘ্রই আপনার মোবাইলে কল দিয়ে অর্ডারটি কনফার্ম করবেন।</p>
            <button onClick={() => setIsOrderSuccess(false)} className="w-full py-4 bg-gradient-to-r from-[#B22222] to-[#FF4500] text-white font-bold rounded-xl">ধন্যবাদ!</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-3 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-black italic fire-text leading-none uppercase tracking-tighter">98 Hot & Spicy</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Spicy Fast Food</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-gradient-to-r from-[#B22222] to-[#FF4500] rounded-full text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] transition-all active:scale-90"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-[#B22222] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#B22222]">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentHeroImage ? 'opacity-40 scale-110 animate-ken-burns' : 'opacity-0 scale-100'}`}
              style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8 scale-110">
            <Logo size="lg" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black italic mb-6 leading-tight tracking-tighter">
            <span className="text-white drop-shadow-2xl">৯৮</span> <span className="fire-text drop-shadow-2xl">হট অ্যান্ড স্পাইসি</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed font-bold drop-shadow-lg">
            স্পাইসি লাভারদের জন্য সেরা স্বাদ আর সেরা অফার! আমাদের <span className="text-[#FFD700]">চুই ঝাল</span> এবং <span className="text-[#FFD700]">মোমো</span> ট্রাই করেছেন তো?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#menu" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-[#B22222] to-[#FF4500] text-white font-black rounded-2xl text-xl hover:shadow-[0_0_40px_rgba(255,69,0,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tighter">
              <UtensilsCrossed size={24} /> অর্ডার করতে নিচে যান
            </a>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <div id="menu" className="sticky top-[60px] md:top-[80px] z-30 bg-[#0a0a0a]/80 backdrop-blur-md py-4 border-y border-white/5 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 min-w-max pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-black text-sm transition-all whitespace-nowrap flex items-center gap-2 border uppercase tracking-tighter ${activeCategory === cat ? 'bg-gradient-to-r from-[#B22222] to-[#FF4500] border-transparent text-white' : 'bg-white/5 text-gray-400 hover:text-white border-white/5 hover:border-white/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-4xl font-black italic flex items-center gap-4 text-white uppercase tracking-tighter">
            <span className="w-3 h-10 bg-[#FF4500] rounded-full"></span> {activeCategory}
          </h2>
          <span className="text-gray-500 font-black text-sm border-b-2 border-[#FF4500]/30 pb-1">{filteredMenu.length} টি আইটেম</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMenu.map(item => (
            <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
             <div className="space-y-8">
              <Logo size="sm" />
              <p className="text-gray-400 leading-relaxed font-medium">ঝাল আর মুখরোচক খাবারের এক বিশ্বস্ত ঠিকানা। আমরা গর্বের সাথে চুই ঝালের ঐতিহ্যবাহী স্বাদ পরিবেশন করি।</p>
            </div>
            <div className="space-y-8">
              <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">যোগাযোগ</h4>
              <ul className="space-y-5 text-gray-400 font-medium">
                <li className="flex items-start gap-4"><MapPin size={22} className="text-[#FF4500]" /> <span>৯৮ হট অ্যান্ড স্পাইসি, আপনার এলাকার ঠিকানা এখানে হবে।</span></li>
                <li className="flex items-center gap-4"><Phone size={22} className="text-[#FF4500]" /> <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">অ্যাডমিন</h4>
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#FF4500] transition-all font-bold group"
              >
                <Lock size={16} className="group-hover:animate-pulse" /> অ্যাডমিন লগইন
              </button>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} ৯৮ হট অ্যান্ড স্পাইসি। ডিজাইন ও ডেভেলপমেন্ট বাই টিম ৯৮।</p>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckoutClick}
      />

      <style>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes kenBurns { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(1.15) translate(-2%, -2%); } }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        .animate-ken-burns { animation: kenBurns 12s ease-in-out infinite alternate; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default App;
