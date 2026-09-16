import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, Cpu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function QuickViewModal({ product, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedOption, setSelectedOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedOption(product.options && product.options.length > 0 ? product.options[0] : 'Стандарт');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedOption);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden z-10 my-6">
        
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors z-20"
          aria-label="Закрыть окно"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          
          <div className="md:col-span-5 space-y-3">
            <div className="relative w-full h-56 rounded-xl border border-stone-200 overflow-hidden bg-stone-50">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900 text-white font-mono text-[10px] font-medium">
                  {product.badge}
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs text-stone-600">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-vintage-accent" />
                Гарантия качества KeyCraft
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Оригинальные материалы и комплектующие. 100% совместимость со стандартами кастомизации.
              </p>
              <div className="pt-1 border-t border-stone-200/60 flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                <Truck className="w-3 h-3 text-vintage-accent" />
                <span>Быстрая бережная доставка по РФ</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                <span>{product.categoryName}</span>
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold font-retro text-stone-900 leading-snug">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-2.5 my-2">
                <span className="font-mono font-bold text-xl text-stone-900">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <span className="font-mono text-xs text-stone-400 line-through">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  В наличии
                </span>
              </div>

              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {product.description}
              </p>

              {product.options && product.options.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <label className="block text-[11px] font-mono text-stone-500">
                    Конфигурация:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {product.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedOption(opt)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border ${
                          selectedOption === opt
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.specs && (
                <div className="mt-3 border border-stone-200 rounded-lg overflow-hidden text-xs font-mono">
                  <div className="bg-stone-50 px-2.5 py-1 font-semibold text-stone-700 border-b border-stone-200 text-[11px]">
                    Характеристики:
                  </div>
                  <div className="divide-y divide-stone-100 bg-white">
                    {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="px-2.5 py-1 flex justify-between gap-2 text-[11px]">
                        <span className="text-stone-500">{key}:</span>
                        <span className="font-medium text-stone-800 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 hover:bg-stone-100 font-mono text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-mono text-xs font-semibold min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 hover:bg-stone-100 font-mono text-xs font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-retro text-xs py-2 px-3 flex items-center justify-center gap-1.5 ${
                    isAdded ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Добавлено в корзину</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>В корзину ({((product.price) * quantity).toLocaleString('ru-RU')} ₽)</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full btn-retro-primary text-xs py-2 px-3 flex items-center justify-center"
              >
                Оформить заказ сразу
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
