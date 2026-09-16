import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-vintage-borderDark select-none">
      
      <div className="flex items-center gap-2 text-xs font-mono text-vintage-muted">
        <span>Показывать по:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="bg-white border-2 border-vintage-dark rounded py-1 px-2 text-xs font-mono font-bold focus:outline-none cursor-pointer"
        >
          <option value={6}>6 товаров</option>
          <option value={9}>9 товаров</option>
          <option value={12}>12 товаров</option>
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border-2 border-vintage-dark bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-200 active:translate-x-[1px] active:translate-y-[1px] transition-all shadow-retro-sm"
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => handlePageClick(p)}
              className={`min-w-[36px] h-9 px-2 rounded-lg border-2 border-vintage-dark font-mono text-xs font-bold transition-all shadow-retro-sm ${
                isActive
                  ? 'bg-vintage-accent text-white scale-105'
                  : 'bg-white text-vintage-dark hover:bg-cream-200 active:translate-x-[1px] active:translate-y-[1px]'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border-2 border-vintage-dark bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-200 active:translate-x-[1px] active:translate-y-[1px] transition-all shadow-retro-sm"
          aria-label="Следующая страница"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs font-mono text-vintage-muted">
        Страница <strong className="text-vintage-dark">{currentPage}</strong> из <strong>{totalPages}</strong>
      </div>
    </div>
  );
}
