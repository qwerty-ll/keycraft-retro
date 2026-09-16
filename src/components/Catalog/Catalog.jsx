import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../../data/products';
import { FilterBar } from './FilterBar';
import { ProductCard } from './ProductCard';
import { CatalogSkeletons } from './ProductSkeleton';
import { Pagination } from './Pagination';
import { PackageSearch } from 'lucide-react';

export function Catalog({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onOpenProduct,
  onQuickView 
}) {
  const [sortBy, setSortBy] = useState('popular');
  const [priceLimit, setPriceLimit] = useState(25000);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    setCurrentPage(1);

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy, priceLimit]);

  const maxCatalogPrice = useMemo(() => {
    return Math.max(...PRODUCTS.map(p => p.price), 25000);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.categoryName.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCat) {
          return false;
        }
      }

      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      if (item.price > priceLimit) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, priceLimit]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setPriceLimit(maxCatalogPrice);
    setSortBy('popular');
  };

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-retro text-stone-900">
            Каталог товаров
          </h2>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Кастомные механические клавиатуры, свитчи, кейкапы и аксессуары ручной сборки
          </p>
        </div>
      </div>

      {/* Filter and View Options */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        maxPrice={maxCatalogPrice}
        priceLimit={priceLimit}
        onPriceLimitChange={setPriceLimit}
        totalFound={filteredProducts.length}
        onResetFilters={handleResetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Product List/Grid View */}
      {isLoading ? (
        <CatalogSkeletons count={itemsPerPage} />
      ) : paginatedProducts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="list"
                onOpenProduct={onOpenProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="border border-stone-200 bg-white rounded-xl p-8 text-center max-w-sm mx-auto my-8 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <PackageSearch className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">
            Ничего не найдено
          </h3>
          <p className="text-xs text-stone-500">
            Попробуйте сбросить фильтры или изменить поисковый запрос.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-retro text-xs py-1.5 px-3 bg-stone-900 text-white hover:bg-stone-800"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && paginatedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </section>
  );
}
