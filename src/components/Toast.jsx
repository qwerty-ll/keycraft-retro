import { Check, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export function Toast() {
  const { toastMessage, setIsCartOpen } = useCart();
  const { favToastMessage } = useFavorites();

  const message = toastMessage || favToastMessage;
  if (!message) return null;
  const isFav = !toastMessage;

  return (
    <aside aria-label="Уведомления" className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 animate-bounce select-none">
      <div className="flex items-center gap-3 p-3.5 bg-vintage-dark text-white rounded-xl border-2 border-vintage-accent max-w-sm">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${isFav ? 'bg-red-500' : 'bg-vintage-accent'}`}>
          {isFav ? <Heart className="w-4 h-4 fill-white" /> : <Check className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0 text-xs font-mono">
          <div className="text-[10px] text-vintage-accent font-bold uppercase">{isFav ? 'Избранное' : 'Корзина'}</div>
          <div className="truncate text-cream-100">{message}</div>
        </div>
        {!isFav && (
          <button onClick={() => setIsCartOpen(true)} className="btn-retro text-[11px] py-1 px-2.5 bg-cream-200 text-vintage-dark shrink-0">
            В корзину
          </button>
        )}
      </div>
    </aside>
  );
}
