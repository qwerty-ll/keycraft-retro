import { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { rub } from '../utils/format';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
    totalItems,
    subtotal,
    discountAmount,
    totalPrice,
    deliveryCost,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const close = () => setIsCartOpen(false);

  // Esc закрывает корзину, фон не скроллится
  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsCartOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    close();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      
      <div
        className="absolute inset-0 bg-stone-900/60 transition-opacity"
        onClick={close}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between">

          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-vintage-accent" />
              <h2 className="font-bold text-base text-stone-900 font-retro">
                Корзина
              </h2>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                {totalItems} шт.
              </span>
            </div>

            <button
              onClick={close}
              className="p-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
              aria-label="Закрыть корзину"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-stone-800">
                    Корзина пуста
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Выберите свитчи, кейкапы или клавиатуру в каталоге
                  </p>
                </div>
                <button
                  onClick={close}
                  className="btn-retro text-xs py-1.5 px-3 bg-stone-900 text-white hover:bg-stone-800"
                >
                  В каталог
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 pb-1">
                  <span>Выбранные позиции:</span>
                  <button
                    onClick={clearCart}
                    className="hover:text-red-600 underline text-[11px] transition-colors"
                  >
                    Очистить корзину
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 flex gap-3 items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-semibold text-xs text-stone-900 truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] font-mono text-stone-500 truncate">
                        {item.selectedOption}
                      </p>
                      <div className="font-mono font-bold text-xs text-stone-900 mt-0.5">
                        {rub(item.product.price * item.quantity)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        title="Удалить"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-1.5 py-0.5 text-xs font-mono font-bold hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-1.5 py-0.5 font-mono text-xs font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-1.5 py-0.5 text-xs font-mono font-bold hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-white space-y-3">
              
              <div className="space-y-1">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Промокод <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-stone-500 hover:text-red-600 underline text-[10px]"
                    >
                      Отмена
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-1.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Промокод (VINTAGE10)"
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg py-1.5 pl-7 pr-2.5 text-xs font-mono focus:outline-none uppercase"
                      />
                      <Tag className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="btn-retro text-xs py-1.5 px-3"
                    >
                      Применить
                    </button>
                  </form>
                )}

                {promoError && (
                  <p className="text-[10px] font-mono text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {promoError}
                  </p>
                )}
              </div>

              <div className="space-y-1 text-xs font-mono text-stone-600 border-t border-stone-100 pt-2">
                <div className="flex justify-between">
                  <span>Товары:</span>
                  <span>{rub(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Скидка:</span>
                    <span>-{rub(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{deliveryCost ? rub(deliveryCost) : 'Бесплатно'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>Итого:</span>
                  <span className="text-vintage-accent font-mono">
                    {rub(totalPrice + deliveryCost)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full btn-retro-primary py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold"
              >
                <span>Перейти к оформлению</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
