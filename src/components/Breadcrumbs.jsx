import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export function Breadcrumbs({ currentCategory, currentProduct, onSelectCategory, onClearProduct }) {
  const categoryObj = CATEGORIES.find(c => c.id === currentCategory) || { name: 'Все товары' };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 select-none" aria-label="Хлебные крошки">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-vintage-muted">
        
        <li className="flex items-center">
          <button
            onClick={() => {
              if (onClearProduct) onClearProduct();
              onSelectCategory('all');
            }}
            className="flex items-center gap-1 hover:text-vintage-accent transition-colors py-1 px-1.5 rounded hover:bg-cream-200"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Главная</span>
          </button>
        </li>

        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 text-vintage-borderDark" />
        </li>

        <li className="flex items-center">
          <button
            onClick={() => {
              if (onClearProduct) onClearProduct();
              onSelectCategory('all');
            }}
            className={`hover:text-vintage-accent transition-colors py-1 px-1.5 rounded hover:bg-cream-200 ${
              currentCategory === 'all' && !currentProduct ? 'text-vintage-dark font-bold underline decoration-vintage-accent underline-offset-4' : ''
            }`}
          >
            Каталог
          </button>
        </li>

        {currentCategory !== 'all' && (
          <>
            <li className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-vintage-borderDark" />
            </li>
            <li className="flex items-center">
              <button
                onClick={() => {
                  if (onClearProduct) onClearProduct();
                  onSelectCategory(currentCategory);
                }}
                className={`hover:text-vintage-accent transition-colors py-1 px-1.5 rounded hover:bg-cream-200 ${
                  !currentProduct ? 'text-vintage-dark font-bold underline decoration-vintage-accent underline-offset-4' : ''
                }`}
              >
                {categoryObj.name}
              </button>
            </li>
          </>
        )}

        {currentProduct && (
          <>
            <li className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-vintage-borderDark" />
            </li>
            <li className="flex items-center">
              <span className="text-vintage-dark font-bold py-1 px-1.5 bg-cream-200 border border-vintage-borderDark rounded text-[11px] truncate max-w-[220px]">
                {currentProduct.title}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
