import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { HeroExplodedParallax } from './components/HeroExplodedParallax';
import { PromoCarousel } from './components/PromoCarousel';
import { Catalog } from './components/Catalog/Catalog';
import { ProductDetailPage } from './components/ProductDetailPage';
import { FavoritesPage } from './components/FavoritesPage';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ClackBotModal } from './components/ClackBotModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/products';
import { 
  ArrowRight, ShieldCheck, Wrench, Sparkles, 
  CheckCircle2, PackageCheck, Cpu, Layers, Heart 
} from 'lucide-react';

function MainShop() {
  // Navigation: 'home' | 'catalog' | 'product' | 'favorites'
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProductId, setActiveProductId] = useState('kb-lumina-75');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('product/')) {
        const id = hash.replace('product/', '');
        setActiveProductId(id);
        setCurrentPage('product');
      } else if (hash === 'catalog') {
        setCurrentPage('catalog');
      } else if (hash === 'favorites') {
        setCurrentPage('favorites');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, productId = null, category = null) => {
    setCurrentPage(page);
    if (productId) {
      setActiveProductId(productId);
      window.location.hash = `product/${productId}`;
    } else {
      window.location.hash = page;
    }
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-vintage-dark font-sans selection:bg-vintage-accent selection:text-white pb-16 md:pb-0">
      
      {/* Top Main Navbar with multi-page navigation links */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenChatBot={() => setIsChatBotOpen(true)}
      />

      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            
            {/* Hero Section with 3D Exploded Perspective View */}
            <HeroExplodedParallax
              onExploreCatalog={() => navigateTo('catalog')}
              onOpenChatBot={() => setIsChatBotOpen(true)}
            />

            {/* Quick Category Navigation Shortcuts */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-vintage-accent" />
                  <h2 className="text-sm sm:text-base font-bold font-retro text-stone-900">
                    Популярные категории
                  </h2>
                </div>
                <button
                  onClick={() => navigateTo('catalog', null, 'all')}
                  className="text-xs font-mono text-vintage-accent hover:underline flex items-center gap-1"
                >
                  <span>Все категории</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo('catalog', null, cat.id)}
                    className="p-3 rounded-xl bg-white border border-stone-200 hover:border-vintage-accent/60 hover:shadow-xs transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
                  >
                    <span className="text-xs font-mono font-semibold text-stone-800 group-hover:text-vintage-accent transition-colors truncate w-full">
                      {cat.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {cat.count} шт.
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Special Offers Carousel */}
            <PromoCarousel 
              onQuickView={setQuickViewProduct}
              onOpenProduct={(id) => navigateTo('product', id)}
            />

            {/* Workshop Craftsmanship Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 border border-stone-800 relative overflow-hidden shadow-clean">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-mono font-medium border border-stone-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Философия мастерской KeyCraft</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-retro leading-tight">
                    Каждая клавиатура собирается вручную по индивидуальному заказу.
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                    Мы калибруем стабилизаторы Krytox 205g0 + XHT-BDZ, укладываем двойную виброизоляцию Poron и тестируем каждый свитч на стенде. На все кастомы действует гарантия 12 месяцев.
                  </p>

                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => navigateTo('catalog')}
                      className="btn-retro-primary px-5 py-2.5 flex items-center gap-2"
                    >
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsChatBotOpen(true)}
                      className="btn-retro px-4 py-2.5 flex items-center gap-2 bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700"
                    >
                      <Wrench className="w-4 h-4 text-amber-400" />
                      <span>Подобрать сборку</span>
                    </button>
                  </div>
                </div>

                {/* Subtle background decorative shapes */}
                <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: CATALOG PAGE */}
        {currentPage === 'catalog' && (
          <div className="animate-fadeIn">
            <Breadcrumbs
              currentCategory={selectedCategory}
              currentProduct={null}
              onSelectCategory={setSelectedCategory}
              onClearProduct={() => {}}
            />

            <Catalog
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onOpenProduct={(id) => navigateTo('product', id)}
              onQuickView={setQuickViewProduct}
            />
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAIL PAGE */}
        {currentPage === 'product' && (
          <ProductDetailPage
            productId={activeProductId}
            onBackToCatalog={() => navigateTo('catalog')}
            onOpenProduct={(id) => navigateTo('product', id)}
          />
        )}

        {/* VIEW 4: FAVORITES PAGE */}
        {currentPage === 'favorites' && (
          <FavoritesPage
            onBackToCatalog={() => navigateTo('catalog')}
            onOpenProduct={(id) => navigateTo('product', id)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer 
        onSelectCategory={(catId) => navigateTo('catalog', null, catId)} 
      />

      {/* Quick View Modal (Optional preview) */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* ClackBot AI Advisor Modal */}
      <ClackBotModal
        isOpen={isChatBotOpen}
        onClose={() => setIsChatBotOpen(false)}
        onQuickView={(p) => navigateTo('product', p.id)}
      />

      {/* Toast System (Unified Cart + Favorites) */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <MainShop />
      </FavoritesProvider>
    </CartProvider>
  );
}
