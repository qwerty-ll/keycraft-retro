import React, { useState } from 'react';
import { ShoppingBag, Search, Bot, X, Menu, ShieldCheck, Heart, Home, Grid, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export function Navbar({ 
  currentPage = 'home', 
  onNavigate, 
  searchQuery, 
  setSearchQuery, 
  onOpenChatBot 
}) {
  const { totalItems, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
        
        {/* Top Info Banner */}
        <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>KeyCraft — мастерская кастомных механических клавиатур</span>
            <span className="text-stone-500 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Скидка 10% по промокоду: <strong className="text-amber-400">VINTAGE10</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Гарантия 12 месяцев</span>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group select-none text-left"
          >
            <div className="w-9 h-9 bg-vintage-accent rounded-lg flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm group-hover:bg-vintage-accentHover transition-colors">
              KC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-stone-900 font-retro">
                  KeyCraft
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 bg-stone-100 text-stone-700 rounded border border-stone-300">
                  Retro
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                currentPage === 'home'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Главная</span>
            </button>

            <button
              onClick={() => handleNavClick('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                currentPage === 'catalog'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Каталог</span>
            </button>

            <button
              onClick={() => handleNavClick('favorites')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 relative ${
                currentPage === 'favorites'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              <span>Избранное</span>
              {favoritesCount > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  currentPage === 'favorites' ? 'bg-vintage-accent text-white' : 'bg-red-500 text-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Search Input (Desktop) */}
          <div className="flex-1 max-w-xs lg:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'catalog' && e.target.value.trim().length > 0) {
                    onNavigate('catalog');
                  }
                }}
                placeholder="Поиск комплектующих..."
                className="w-full bg-stone-50 border border-stone-300 rounded-lg py-1.5 pl-8 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-vintage-accent focus:bg-white transition-all placeholder:text-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* ClackBot Helper */}
            <button
              onClick={onOpenChatBot}
              className="btn-retro text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="Задать вопрос консультанту"
            >
              <Bot className="w-4 h-4 text-vintage-accent" />
              <span className="hidden sm:inline">Помощник</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-retro-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5"
              aria-label="Корзина товаров"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Корзина</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[11px] font-mono font-bold bg-white text-stone-900 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-700"
              aria-label="Открыть меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-3 bg-stone-50 border-t border-stone-200 space-y-3 animate-fadeIn">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'catalog' && e.target.value.trim().length > 0) {
                    onNavigate('catalog');
                  }
                }}
                placeholder="Поиск комплектующих..."
                className="w-full bg-white border border-stone-300 rounded-lg py-2 pl-9 pr-8 text-xs focus:outline-none"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`p-2.5 rounded-lg text-xs font-mono font-medium border text-center flex flex-col items-center gap-1 ${
                  currentPage === 'home'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Главная</span>
              </button>

              <button
                onClick={() => handleNavClick('catalog')}
                className={`p-2.5 rounded-lg text-xs font-mono font-medium border text-center flex flex-col items-center gap-1 ${
                  currentPage === 'catalog'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Каталог</span>
              </button>

              <button
                onClick={() => handleNavClick('favorites')}
                className={`p-2.5 rounded-lg text-xs font-mono font-medium border text-center flex flex-col items-center gap-1 relative ${
                  currentPage === 'favorites'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                <span>Избранное</span>
                {favoritesCount > 0 && (
                  <span className="absolute top-1.5 right-3 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Sticky Native Feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-300 py-1.5 px-3 flex items-center justify-around shadow-lg select-none">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors ${
            currentPage === 'home' ? 'text-vintage-accent font-bold' : 'text-stone-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Главная</span>
        </button>

        <button
          onClick={() => handleNavClick('catalog')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors ${
            currentPage === 'catalog' ? 'text-vintage-accent font-bold' : 'text-stone-500'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Каталог</span>
        </button>

        <button
          onClick={() => handleNavClick('favorites')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors relative ${
            currentPage === 'favorites' ? 'text-vintage-accent font-bold' : 'text-stone-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className="absolute -top-0.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center">
              {favoritesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-mono text-stone-500 relative"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Корзина</span>
          {totalItems > 0 && (
            <span className="absolute -top-0.5 right-1.5 bg-vintage-accent text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
