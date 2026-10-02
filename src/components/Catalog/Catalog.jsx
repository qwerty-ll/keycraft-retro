import { useState, useMemo, useEffect, useRef } from 'react';
import { PackageSearch, Search, X } from 'lucide-react';
import { usePersistentState } from '../../hooks/usePersistentState';
import { PRODUCTS } from '../../data/products';
import { FilterBar } from './FilterBar';
import { ProductList } from './ProductCard';
import { Pagination } from './Pagination';

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price), 25000);

const SORTERS = {
  popular: (a, b) => b.reviewsCount - a.reviewsCount,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

const matchesQuery = (p, q) =>
  [p.title, p.description, p.categoryName].some((field) => field.toLowerCase().includes(q));

function ProductSkeleton() {
  return (
    <div className="card-retro p-4 flex flex-col justify-between bg-white border border-stone-200 animate-pulse">
      <div className="w-full h-48 sm:h-52 bg-stone-100 rounded-lg mb-3.5" />
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="h-4 w-24 bg-stone-200 rounded" />
        <div className="h-4 w-16 bg-stone-100 rounded" />
      </div>
      <div className="space-y-1.5 mb-3">
        <div className="h-5 w-5/6 bg-stone-200 rounded" />
        <div className="h-5 w-3/5 bg-stone-100 rounded" />
      </div>
      <div className="h-6 w-28 bg-stone-100 rounded-full mb-4" />
      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
        <div className="h-6 w-20 bg-stone-200 rounded" />
        <div className="h-8 w-20 bg-stone-200 rounded-lg" />
      </div>
    </div>
  );
}

const DEFAULT_VIEW = { sortBy: 'popular', priceLimit: 25000, currentPage: 1, itemsPerPage: 6, viewMode: 'grid' };

export function Catalog({ selectedCategory, onSelectCategory, searchQuery, onSearchChange, onOpenProduct }) {
  // Настройки каталога переживают переход на товар и обратно (в пределах вкладки)
  const [view, setView] = usePersistentState('keycraft_catalog_view', DEFAULT_VIEW, sessionStorage);
  const { sortBy, priceLimit, currentPage, itemsPerPage, viewMode } = view;
  const set = (key) => (value) => setView((v) => ({ ...v, [key]: value }));
  const [setSortBy, setPriceLimit, setCurrentPage, setItemsPerPage, setViewMode] =
    ['sortBy', 'priceLimit', 'currentPage', 'itemsPerPage', 'viewMode'].map(set);
  const [isLoading, setIsLoading] = useState(false);

  // При смене фильтров — на первую страницу и короткий «скелетон».
  // При возврате в каталог фильтры те же, поэтому страница сохраняется.
  const filterKey = JSON.stringify([selectedCategory, searchQuery, sortBy, priceLimit]);
  const prevFilterKey = useRef(filterKey);
  useEffect(() => {
    if (prevFilterKey.current === filterKey) return;
    prevFilterKey.current = filterKey;
    setView((v) => ({ ...v, currentPage: 1 }));
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 220);
    return () => clearTimeout(timer);
  }, [filterKey, setView]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) =>
      (!q || matchesQuery(p, q)) &&
      (selectedCategory === 'all' || p.category === selectedCategory) &&
      p.price <= priceLimit
    );
  }, [selectedCategory, searchQuery, priceLimit]);

  const sortedProducts = useMemo(() => [...filteredProducts].sort(SORTERS[sortBy]), [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const pageProducts = sortedProducts.slice(start, start + itemsPerPage);

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    setView((v) => ({ ...v, priceLimit: MAX_PRICE, sortBy: 'popular' }));
  };

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold font-retro text-stone-900">
          Каталог товаров
        </h2>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Кастомные механические клавиатуры, свитчи, кейкапы и аксессуары ручной сборки
        </p>

        {/* Поиск на мобильных (на десктопе он в шапке) */}
        <div className="relative mt-3 md:hidden">
          <input
            id="mobile-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск комплектующих..."
            className="w-full bg-white border border-stone-300 rounded-lg py-2.5 pl-9 pr-9 text-sm focus:outline-none focus:ring-1 focus:ring-vintage-accent"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" aria-label="Очистить поиск">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        maxPrice={MAX_PRICE}
        priceLimit={priceLimit}
        onPriceLimitChange={setPriceLimit}
        totalFound={filteredProducts.length}
        onResetFilters={handleResetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: itemsPerPage }, (_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : pageProducts.length > 0 ? (
        <>
          <ProductList products={pageProducts} layout={viewMode} onOpenProduct={onOpenProduct} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      ) : (
        <div className="border border-stone-200 bg-white rounded-xl p-8 text-center max-w-sm mx-auto my-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <PackageSearch className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">Ничего не найдено</h3>
          <p className="text-xs text-stone-500">Попробуйте сбросить фильтры или изменить поисковый запрос.</p>
          <button
            onClick={handleResetFilters}
            className="btn-retro text-xs py-1.5 px-3 bg-stone-900 text-white hover:bg-stone-800"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  );
}
