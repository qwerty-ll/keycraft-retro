// шапка сайта
import { ShoppingBag, Search, Bot, X, ShieldCheck, Heart, Home, Grid } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

// пункты меню
const NAV_ITEMS = [
  { page: 'home', label: 'Главная', Icon: Home },
  { page: 'catalog', label: 'Каталог', Icon: Grid },
  { page: 'favorites', label: 'Избранное', Icon: Heart },
];

// поле поиска
function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Поиск комплектующих..."
        className="w-full bg-stone-50 border border-stone-300 rounded-lg py-1.5 pl-8 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-vintage-accent focus:bg-white transition-all placeholder:text-stone-400"
      />
      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
      {value && (
        <button onClick={onClear} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// шапка
export function Navbar({ currentPage = 'home', onNavigate, searchQuery, setSearchQuery, onOpenChatBot }) {
  const { totalItems, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const handleNavClick = (page) => onNavigate(page);

  // поиск на телефоне
  const openMobileSearch = () => {
    onNavigate('catalog');
    setTimeout(() => document.getElementById('mobile-search')?.focus(), 50);
  };

  // поиск открывает каталог
  const searchProps = {
    value: searchQuery,
    onChange: (e) => {
      setSearchQuery(e.target.value);
      if (currentPage !== 'catalog' && e.target.value.trim()) onNavigate('catalog');
    },
    onClear: () => setSearchQuery(''),
  };

  // иконка пункта меню
  const navIcon = ({ page, Icon }, size) => (
    <Icon className={`${size} ${page === 'favorites' && favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
  );
  const showFavCount = (page) => page === 'favorites' && favoritesCount > 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
        {/* верхняя полоска */}
        <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-mono flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
            <span className="truncate">KeyCraft — мастерская кастомных механических клавиатур</span>
            <span className="text-stone-500 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Скидка 10% по промокоду: <strong className="text-amber-400">VINTAGE10</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Гарантия 12 месяцев</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 group select-none text-left">
            <div className="w-9 h-9 bg-vintage-accent rounded-lg flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm group-hover:bg-vintage-accentHover transition-colors">
              KC
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-stone-900 font-retro">KeyCraft</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 bg-stone-100 text-stone-700 rounded border border-stone-300">
                Retro
              </span>
            </div>
          </button>

          {/* меню */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 relative ${
                  currentPage === item.page ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {navIcon(item, 'w-3.5 h-3.5')}
                <span>{item.label}</span>
                {showFavCount(item.page) && (
                  <span className={`text-[10px] font-bold px-1.5 rounded-full text-white ${currentPage === 'favorites' ? 'bg-vintage-accent' : 'bg-red-500'}`}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
            <SearchInput {...searchProps} />
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button onClick={onOpenChatBot} className="btn-retro text-xs py-1.5 px-3 flex items-center gap-1.5" title="Задать вопрос консультанту">
              <Bot className="w-4 h-4 text-vintage-accent" />
              <span className="hidden sm:inline">Помощник</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-retro-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5"
              aria-label="Корзина товаров"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Корзина</span>
              {totalItems > 0 && (
                <span key={totalItems} className="inline-flex items-center justify-center min-w-[18px] px-1 text-[11px] font-mono font-bold bg-white text-stone-900 rounded-full animate-pop">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={openMobileSearch}
              className="md:hidden p-1.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-700"
              aria-label="Поиск"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

      </header>

      {/* нижняя панель на телефоне */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-300 py-1.5 px-3 flex items-center justify-around shadow-lg select-none">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => handleNavClick(item.page)}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors relative ${
              currentPage === item.page ? 'text-vintage-accent font-bold' : 'text-stone-500'
            }`}
          >
            {navIcon(item, 'w-4 h-4')}
            <span>{item.label}</span>
            {showFavCount(item.page) && <MobileBadge bg="bg-red-500">{favoritesCount}</MobileBadge>}
          </button>
        ))}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono text-stone-500 relative"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Корзина</span>
          {totalItems > 0 && <MobileBadge key={totalItems} bg="bg-vintage-accent animate-pop">{totalItems}</MobileBadge>}
        </button>
      </div>
    </>
  );
}

// кружок с числом
function MobileBadge({ bg, children }) {
  return (
    <span className={`absolute -top-0.5 right-1.5 ${bg} text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center`}>
      {children}
    </span>
  );
}
