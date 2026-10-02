import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { HeroExplodedParallax } from './components/HeroExplodedParallax';
import { PromoCarousel } from './components/PromoCarousel';
import { Catalog } from './components/Catalog/Catalog';
import { ProductDetailPage } from './components/ProductDetailPage';
import { FavoritesPage } from './components/FavoritesPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ClackBotModal } from './components/ClackBotModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CATEGORIES } from './data/products';
import { ArrowRight, Wrench, Sparkles, Cpu } from 'lucide-react';

const PAGES = ['home', 'catalog', 'favorites'];

function MainShop() {
  // Навигация: 'home' | 'catalog' | 'product' | 'favorites' (через location.hash)
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProductId, setActiveProductId] = useState('kb-lumina-75');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('product/')) {
        setActiveProductId(hash.slice('product/'.length));
        setCurrentPage('product');
      } else {
        setCurrentPage(PAGES.includes(hash) ? hash : 'home');
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const navigateTo = (page, productId = null, category = null) => {
    setCurrentPage(page);
    if (productId) setActiveProductId(productId);
    if (category) setSelectedCategory(category);
    window.location.hash = productId ? `product/${productId}` : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openProduct = (id) => navigateTo('product', id);
  const openCatalog = (category = null) => navigateTo('catalog', null, category);
  const openChatBot = () => setIsChatBotOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-vintage-dark font-sans selection:bg-vintage-accent selection:text-white pb-16 md:pb-0">
      
      {/* Top Main Navbar with multi-page navigation links */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenChatBot={openChatBot}
      />

      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-6 sm:space-y-8">
            
            {/* Hero Section with 3D Exploded Perspective View */}
            <HeroExplodedParallax
              onExploreCatalog={() => openCatalog()}
              onOpenChatBot={openChatBot}
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
                  onClick={() => openCatalog('all')}
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
                    onClick={() => openCatalog(cat.id)}
                    className="p-3 rounded-xl bg-white border border-stone-200 hover:border-vintage-accent/60 transition-all text-center flex flex-col items-center justify-center gap-1.5 group"
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
            <PromoCarousel onOpenProduct={openProduct} />

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
                      onClick={() => openCatalog()}
                      className="btn-retro-primary px-5 py-2.5 flex items-center gap-2"
                    >
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={openChatBot}
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
          <div>
            <Breadcrumbs currentCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

            <Catalog
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onOpenProduct={openProduct}
            />
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAIL PAGE */}
        {currentPage === 'product' && (
          <ProductDetailPage
            key={activeProductId}
            productId={activeProductId}
            onBackToCatalog={() => openCatalog()}
            onOpenProduct={openProduct}
          />
        )}

        {/* VIEW 4: FAVORITES PAGE */}
        {currentPage === 'favorites' && (
          <FavoritesPage
            onBackToCatalog={() => openCatalog()}
            onOpenProduct={openProduct}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onSelectCategory={openCatalog} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* ClackBot AI Advisor Modal */}
      <ClackBotModal
        isOpen={isChatBotOpen}
        onClose={() => setIsChatBotOpen(false)}
        onOpenProduct={openProduct}
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
