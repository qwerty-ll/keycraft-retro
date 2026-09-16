import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft, LayoutGrid, List } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from './Catalog/ProductCard';

export function FavoritesPage({ onBackToCatalog, onOpenProduct }) {
  const { favorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState('grid');
  const [allAdded, setAllAdded] = useState(false);

  // Find all products that match favorites IDs
  const favoritedProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  const handleAddAllToCart = () => {
    favoritedProducts.forEach(product => {
      addToCart(product, 1);
    });
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-retro text-stone-900">
              Избранное
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-mono font-bold border border-red-200">
              {favoritedProducts.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-1">
            Сохраненные кастомные клавиатуры, свитчи и комплектующие
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onBackToCatalog}
            className="btn-retro text-xs py-2 px-3.5 flex items-center gap-1.5 bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-vintage-accent" />
            <span>В каталог</span>
          </button>

          {favoritedProducts.length > 0 && (
            <>
              {/* Grid / List switcher */}
              <div className="flex items-center p-0.5 rounded-lg border border-stone-300 bg-stone-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md text-xs font-mono transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                  title="Сетка"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md text-xs font-mono transition-colors ${
                    viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                  title="Список"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Add all to cart */}
              <button
                onClick={handleAddAllToCart}
                className="btn-retro-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{allAdded ? 'Все в корзине!' : 'Добавить все в корзину'}</span>
              </button>

              {/* Clear favorites */}
              <button
                onClick={clearFavorites}
                className="p-2 rounded-lg border border-stone-300 bg-white hover:bg-red-50 hover:border-red-200 text-stone-500 hover:text-red-600 transition-colors"
                title="Очистить избранное"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {favoritedProducts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoritedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {favoritedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                layout="list"
                onOpenProduct={onOpenProduct}
              />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="max-w-md mx-auto py-16 text-center space-y-4 bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-500">
            <Heart className="w-8 h-8 fill-red-200" />
          </div>

          <h2 className="text-xl font-bold font-retro text-stone-900">
            В избранном пока ничего нет
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-sans">
            Нажимайте на иконку сердечка на карточках товаров, чтобы сохранить понравившиеся клавиатуры и аксессуары.
          </p>

          <button
            onClick={onBackToCatalog}
            className="btn-retro-primary text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2"
          >
            <span>Перейти в каталог</span>
          </button>
        </div>
      )}

    </div>
  );
}
