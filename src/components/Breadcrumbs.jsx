// «Хлебные крошки»: Главная › Каталог › Категория
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES } from '../data/products';

// Стили ссылок и разделитель-стрелка
const linkClass = 'hover:text-vintage-accent transition-colors py-1 px-1.5 rounded hover:bg-cream-200';
const activeClass = 'text-vintage-dark font-bold underline decoration-vintage-accent underline-offset-4';
const separator = (
  <li className="flex items-center">
    <ChevronRight className="w-3.5 h-3.5" />
  </li>
);

export function Breadcrumbs({ currentCategory, onSelectCategory, onHome }) {
  const category = CATEGORIES.find((c) => c.id === currentCategory);
  const isAll = currentCategory === 'all';

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 select-none" aria-label="Хлебные крошки">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-vintage-muted">
        <li className="flex items-center">
          <button onClick={onHome} className={`flex items-center gap-1 ${linkClass}`}>
            <Home className="w-3.5 h-3.5" />
            <span>Главная</span>
          </button>
        </li>
        {separator}
        <li className="flex items-center">
          <button onClick={() => onSelectCategory('all')} className={`${linkClass} ${isAll ? activeClass : ''}`}>
            Каталог
          </button>
        </li>
        {!isAll && (
          <>
            {separator}
            <li className="flex items-center">
              <button className={`${linkClass} ${activeClass}`}>{category?.name ?? 'Все товары'}</button>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
