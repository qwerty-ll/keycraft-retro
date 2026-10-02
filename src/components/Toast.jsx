import { Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Короткое уведомление о добавлении в корзину: появляется один раз,
// не прыгает, закрывается крестиком и не показывается поверх открытой корзины
export function Toast() {
  const { toast, hideToast, isCartOpen, isCheckoutOpen, setIsCartOpen } = useCart();
  if (!toast || isCartOpen || isCheckoutOpen) return null;

  const openCart = () => {
    hideToast();
    setIsCartOpen(true);
  };

  return (
    <aside
      key={toast.id}
      aria-live="polite"
      className="fixed z-50 left-3 right-3 bottom-[72px] md:left-auto md:right-6 md:bottom-6 md:w-96 animate-toast-in select-none"
    >
      <div className="flex items-center gap-3 p-3 bg-vintage-dark text-white rounded-xl border-2 border-vintage-accent shadow-lg">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-vintage-accent shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 text-xs font-mono truncate text-cream-100">{toast.text}</div>
        <button onClick={openCart} className="btn-retro text-[11px] py-1 px-2.5 bg-cream-200 text-vintage-dark shrink-0">
          Корзина
        </button>
        <button onClick={hideToast} className="p-1 text-stone-400 hover:text-white shrink-0" aria-label="Закрыть уведомление">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
