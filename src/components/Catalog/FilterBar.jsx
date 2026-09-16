import React from 'react';
import { CATEGORIES } from '../../data/products';
import { RotateCcw, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  maxPrice,
  priceLimit,
  onPriceLimitChange,
  totalFound,
  onResetFilters,
  viewMode = 'grid',
  onViewModeChange,
}) {
  const isFiltered = selectedCategory !== 'all' || priceLimit < maxPrice;

  return (
    <div className="space-y-3 mb-6">
      
      {/* Category Pills (Horizontal scrollable on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none select-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-stone-700 text-white' : 'bg-stone-100 text-stone-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Filter & View Options Bar */}
      <div className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">

        {/* Price Slider */}
        <div className="lg:col-span-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-vintage-accent" />
              Ценовой диапазон:
            </span>
            <span className="font-semibold text-stone-800">до {priceLimit.toLocaleString('ru-RU')} ₽</span>
          </div>
          <input
            type="range"
            min={500}
            max={maxPrice}
            step={500}
            value={priceLimit}
            onChange={(e) => onPriceLimitChange(Number(e.target.value))}
            className="w-full accent-vintage-accent cursor-pointer h-1.5 bg-stone-200 rounded-lg"
          />
        </div>

        {/* Sorting + Grid/List Mode Toggle */}
        <div className="lg:col-span-7 flex items-center gap-2.5 justify-between sm:justify-end flex-wrap">
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-stone-500 hidden sm:inline">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-lg py-1.5 px-3 text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-vintage-accent cursor-pointer"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {/* Grid vs List View Mode Toggle - Hidden on mobile, only shown on tablet & desktop */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg border border-stone-300 bg-stone-50">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1 ${
                viewMode === 'grid' 
                  ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Сетка (плиткой)"
              aria-label="Сетка товаров"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px]">Сетка</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1 ${
                viewMode === 'list' 
                  ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Список (построчно)"
              aria-label="Список товаров"
            >
              <List className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px]">Построчно</span>
            </button>
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="p-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors flex items-center gap-1 text-xs font-mono"
              title="Сбросить фильтры"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Сброс</span>
            </button>
          )}
        </div>

      </div>

      {/* Found stats & layout indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-1">
        <span>Найдено товаров: <strong className="text-stone-800 font-semibold">{totalFound}</strong></span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] text-stone-400">
            Режим: {viewMode === 'grid' ? 'Сетка' : 'Построчно'}
          </span>
          {isFiltered && (
            <span className="text-vintage-accent font-medium">• Фильтры активны</span>
          )}
        </div>
      </div>
    </div>
  );
}
