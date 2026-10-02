// главный файл приложения
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

// страницы сайта
const PAGES = ['home', 'catalog', 'favorites'];

// магазин
function MainShop() {
  // текущая страница и выбранные фильтры
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProductId, setActiveProductId] = useState('kb-lumina-75');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // запоминаем прокрутку страниц
  const location = useRef({ page: 'home', productId: null });
  const scrollMemory = useRef({});
  const pendingScroll = useRef(null);
  const keyOf = ({ page, productId }) => (page === 'product' ? `product/${productId}` : page);

  // переход на страницу
  const go = (page, productId = null, { restore = false } = {}) => {
    const next = { page, productId: page === 'product' ? productId : null };
    if (keyOf(next) === keyOf(location.current)) return false;
    scrollMemory.current[keyOf(location.current)] = window.scrollY;
    pendingScroll.current = restore ? scrollMemory.current[keyOf(next)] ?? 0 : 0;
    location.current = next;
    setCurrentPage(page);
    if (next.productId) setActiveProductId(next.productId);
    return true;
  };

  // прокрутка после смены страницы
  useLayoutEffect(() => {
    if (pendingScroll.current === null) return;
    window.scrollTo({ top: pendingScroll.current, behavior: 'instant' });
    pendingScroll.current = null;
  }, [currentPage, activeProductId]);

  // следим за адресом страницы
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('product/')) go('product', hash.slice('product/'.length), { restore: true });
      else go(PAGES.includes(hash) ? hash : 'home', null, { restore: true });
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // перейти на страницу
  const navigateTo = (page, productId = null, category = null, { restore = false } = {}) => {
    if (category) setSelectedCategory(category);
    const changed = go(page, productId, { restore: restore && !category });
    if (changed) window.location.hash = productId ? `product/${productId}` : page;
    else window.scrollTo({ top: 0, behavior: 'smooth' }); // повторное нажатие прокручивает наверх
  };
  // быстрые переходы
  const openProduct = (id) => navigateTo('product', id);
  const openCatalog = (category = null) => navigateTo('catalog', null, category);
  const backToCatalog = () => navigateTo('catalog', null, null, { restore: true });
  const openChatBot = () => setIsChatBotOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-vintage-dark font-sans selection:bg-vintage-accent selection:text-white pb-16 md:pb-0">
      
      {/* шапка */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenChatBot={openChatBot}
      />

      <main className="flex-1">
        
        {/* главная */}
        {currentPage === 'home' && (
          <div className="space-y-6 sm:space-y-8">
            
            {/* 3d клавиатура */}
            <HeroExplodedParallax
              onExploreCatalog={() => openCatalog()}
              onOpenChatBot={openChatBot}
            />

            {/* категории */}
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

            {/* карусель акций */}
            <PromoCarousel onOpenProduct={openProduct} />

            {/* баннер мастерской */}
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

                {/* пятно света */}
                <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              </div>
            </section>

          </div>
        )}

        {/* каталог */}
        {currentPage === 'catalog' && (
          <div>
            <Breadcrumbs
              currentCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onHome={() => navigateTo('home')}
            />

            <Catalog
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenProduct={openProduct}
            />
          </div>
        )}

        {/* товар */}
        {currentPage === 'product' && (
          <ProductDetailPage
            key={activeProductId}
            productId={activeProductId}
            onBackToCatalog={backToCatalog}
            onOpenProduct={openProduct}
          />
        )}

        {/* избранное */}
        {currentPage === 'favorites' && (
          <FavoritesPage
            onBackToCatalog={() => openCatalog()}
            onOpenProduct={openProduct}
          />
        )}

      </main>

      {/* подвал */}
      <Footer onSelectCategory={openCatalog} />

      {/* корзина */}
      <CartDrawer onOpenProduct={openProduct} onOpenCatalog={() => openCatalog()} />

      {/* оформление заказа */}
      <CheckoutModal />

      {/* чат бот */}
      <ClackBotModal
        isOpen={isChatBotOpen}
        onClose={() => setIsChatBotOpen(false)}
        onOpenProduct={openProduct}
      />

      {/* уведомление */}
      <Toast />
    </div>
  );
}

// подключаем корзину и избранное
export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <MainShop />
      </FavoritesProvider>
    </CartProvider>
  );
}
