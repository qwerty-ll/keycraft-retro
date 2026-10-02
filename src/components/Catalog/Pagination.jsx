// переключатель страниц
import { ChevronLeft, ChevronRight } from 'lucide-react';

// стиль стрелок
const arrowClass = 'p-2 rounded-lg border-2 border-vintage-dark bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cream-200 active:translate-x-[1px] active:translate-y-[1px] transition-all';

export function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  // если страница одна ничего не показываем
  if (totalPages <= 1) return null;

  // открыть страницу
  const goTo = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t-2 select-none">
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
          {[6, 9, 12].map((n) => <option key={n} value={n}>{n} товаров</option>)}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <button onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1} className={arrowClass} aria-label="Предыдущая страница">
          <ChevronLeft className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`min-w-[36px] h-9 px-2 rounded-lg border-2 border-vintage-dark font-mono text-xs font-bold transition-all ${
              p === currentPage
                ? 'bg-vintage-accent text-white scale-105'
                : 'bg-white text-vintage-dark hover:bg-cream-200 active:translate-x-[1px] active:translate-y-[1px]'
            }`}
          >
            {p}
          </button>
        ))}

        <button onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages} className={arrowClass} aria-label="Следующая страница">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs font-mono text-vintage-muted">
        Страница <strong className="text-vintage-dark">{currentPage}</strong> из <strong>{totalPages}</strong>
      </div>
    </div>
  );
}
