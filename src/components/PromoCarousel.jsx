// карусель акций
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Eye, ShoppingBag } from 'lucide-react';
import { PROMO_SLIDES, PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

// сколько слайдов
const SLIDES = PROMO_SLIDES.length;

export function PromoCarousel({ onOpenProduct }) {
  // текущий слайд и пауза
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();

  // каждые 5 секунд следующий слайд
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // листать слайды
  const step = (delta) => setCurrentIndex((prev) => (prev + delta + SLIDES) % SLIDES);

  const currentSlide = PROMO_SLIDES[currentIndex];
  // товар слайда
  const linkedProduct = PRODUCTS.find(p => p.id === currentSlide.productId);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-vintage-accent" />
          <h2 className="text-lg sm:text-xl font-bold font-retro text-stone-900">
            Специальные предложения
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => step(-1)}
            className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 transition-colors"
            aria-label="Предыдущий слайд"
          >
            <ChevronLeft className="w-4 h-4 text-stone-700" />
          </button>
          <button
            onClick={() => step(1)}
            className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 transition-colors"
            aria-label="Следующий слайд"
          >
            <ChevronRight className="w-4 h-4 text-stone-700" />
          </button>
        </div>
      </div>

      <div 
        className="relative overflow-hidden rounded-xl border border-stone-300 bg-stone-900 text-white min-h-[300px] sm:min-h-[340px] flex items-center shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/75 to-transparent" />

        <div className="relative z-10 max-w-xl p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vintage-accent text-white font-mono text-xs font-medium">
            {currentSlide.badge}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-retro leading-tight">
            {currentSlide.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-200 font-sans leading-relaxed line-clamp-2">
            {currentSlide.description}
          </p>

          <div className="font-mono font-bold text-amber-400 text-base sm:text-lg pt-0.5">
            {currentSlide.priceText}
          </div>

          <div className="flex items-center gap-2.5 pt-2 flex-wrap">
            {linkedProduct && (
              <>
                <button
                  onClick={() => onOpenProduct(linkedProduct.id)}
                  className="btn-retro text-xs py-2 px-3.5 bg-white text-stone-900 hover:bg-stone-100 flex items-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-vintage-accent" />
                  <span>Подробнее о товаре</span>
                </button>

                <button
                  onClick={() => addToCart(linkedProduct, 1)}
                  className="btn-retro-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>В корзину</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
          {PROMO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-vintage-accent' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Перейти к слайду ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
