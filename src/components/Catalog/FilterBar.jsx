// панель фильтров
import { RotateCcw, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { rub } from '../../utils/format';

// варианты сортировки
const SORT_OPTIONS = [
  ['popular', 'По популярности'],
  ['price-asc', 'Сначала дешевле'],
  ['price-desc', 'Сначала дороже'],
  ['rating', 'По рейтингу'],
];

// сетка и список
const VIEW_MODES = [
  { id: 'grid', Icon: LayoutGrid, label: 'Сетка', aria: 'Сетка товаров' },
  { id: 'list', Icon: List, label: 'Построчно', aria: 'Список товаров' },
];

// переключатель сетка список
export function ViewModeToggle({ viewMode, onChange, className = 'flex', showLabels = false }) {
  return (
    <div className={`${className} items-center p-0.5 rounded-lg border border-stone-300 bg-stone-50`}>
      {VIEW_MODES.map(({ id, Icon, label, aria }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`p-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1 ${
            viewMode === id ? 'bg-white text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
          }`}
          title={label}
          aria-label={aria}
        >
          <Icon className="w-4 h-4" />
          {showLabels && <span className="hidden xl:inline text-[11px]">{label}</span>}
        </button>
      ))}
    </div>
  );
}

// панель фильтров
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
  viewMode,
  onViewModeChange,
}) {
  // включён ли какой нибудь фильтр
  const isFiltered = selectedCategory !== 'all' || priceLimit < maxPrice;

  return (
    <div className="space-y-3 mb-6">
      {/* категории */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar select-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all border ${
                isActive ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 rounded-full ${isActive ? 'bg-stone-700 text-white' : 'bg-stone-100 text-stone-500'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-center">
        <div className="lg:col-span-5 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-vintage-accent" />
              Ценовой диапазон:
            </span>
            <span className="font-semibold text-stone-800">до {rub(priceLimit)}</span>
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

        <div className="lg:col-span-7 flex items-center gap-2.5 justify-between sm:justify-end flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-stone-500 hidden sm:inline">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-lg py-1.5 px-3 text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-vintage-accent cursor-pointer"
            >
              {SORT_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} className="hidden sm:flex" showLabels />

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

      <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-1">
        <span>Найдено товаров: <strong className="text-stone-800 font-semibold">{totalFound}</strong></span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] text-stone-400">
            Режим: {viewMode === 'grid' ? 'Сетка' : 'Построчно'}
          </span>
          {isFiltered && <span className="text-vintage-accent font-medium">• Фильтры активны</span>}
        </div>
      </div>
    </div>
  );
}
