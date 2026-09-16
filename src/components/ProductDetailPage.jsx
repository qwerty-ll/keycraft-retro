import React, { useState } from 'react';
import { 
  ArrowLeft, Star, ShoppingBag, Heart, Check, ShieldCheck, 
  Truck, Wrench, Package, Info, Share2, CheckCircle2 
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from './Catalog/ProductCard';

export function ProductDetailPage({ 
  productId, 
  onBackToCatalog, 
  onOpenProduct 
}) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedOption, setSelectedOption] = useState(
    product.options && product.options.length > 0 ? product.options[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'box' | 'reviews'

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleToggleFav = () => {
    toggleFavorite(product.id, product.title);
  };

  // Related products from same category or fallback
  const relatedProducts = PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || product.category === 'all'))
    .slice(0, 3);

  // If not enough from same category, take other popular items
  if (relatedProducts.length < 3) {
    const extra = PRODUCTS.filter(p => p.id !== product.id && !relatedProducts.some(r => r.id === p.id)).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  // Realistic verified reviews for detail page
  const sampleReviews = [
    {
      author: 'Александр В.',
      date: '12 сентября 2026',
      rating: 5,
      text: 'Великолепная сборка! Корпус из массива ореха невероятно тактильный и тяжелый — клавиатура стоит на столе как влитая. Звук глубокий и чистый, стабилизаторы смазаны с завода идеально.',
      verified: true
    },
    {
      author: 'Михаил К.',
      date: '28 августа 2026',
      rating: 5,
      text: 'Брал для ежедневной работы за кодом. Печатать сплошное удовольствие. Доставка СДЭКом за 2 дня, упаковано в плотную фирменную коробку с демпферами.',
      verified: true
    },
    {
      author: 'Екатерина С.',
      date: '15 августа 2026',
      rating: 5,
      text: 'Выглядит как винтажное произведение искусства. Отдельное спасибо консультанту в чате за помощь с выбором свитчей!',
      verified: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fadeIn">
      
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg px-3 py-1.5 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-vintage-accent" />
          <span>Вернуться в каталог</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-mono text-stone-500">
          <span 
            onClick={onBackToCatalog}
            className="hover:underline cursor-pointer"
          >
            Каталог
          </span>
          <span>/</span>
          <span className="text-stone-700 font-semibold">{product.categoryName}</span>
          <span>/</span>
          <span className="text-stone-400 truncate max-w-[180px] sm:max-w-none">{product.title}</span>
        </div>
      </div>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Media & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-white rounded-2xl border border-stone-300 overflow-hidden shadow-sm flex items-center justify-center p-4 sm:p-6 group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-103"
            />

            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-stone-900 text-white font-mono text-xs font-medium tracking-wide shadow-sm">
                {product.badge}
              </div>
            )}

            <button
              onClick={handleToggleFav}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 backdrop-blur hover:bg-white text-stone-700 border border-stone-200 transition-all active:scale-90 shadow-sm"
              title={favorited ? 'В избранном' : 'Добавить в избранное'}
            >
              <Heart className={`w-5 h-5 ${favorited ? 'text-red-500 fill-red-500' : 'text-stone-500 hover:text-red-500'}`} />
            </button>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <ShieldCheck className="w-5 h-5 text-vintage-accent mx-auto" />
              <div className="text-[11px] font-mono font-bold text-stone-900">Гарантия 12 мес.</div>
              <div className="text-[10px] text-stone-500">Сервис мастерской</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <Truck className="w-5 h-5 text-vintage-accent mx-auto" />
              <div className="text-[11px] font-mono font-bold text-stone-900">Быстрая доставка</div>
              <div className="text-[10px] text-stone-500">СДЭК по всей РФ</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
              <Wrench className="w-5 h-5 text-vintage-accent mx-auto" />
              <div className="text-[11px] font-mono font-bold text-stone-900">Ручная сборка</div>
              <div className="text-[10px] text-stone-500">Контроль качества</div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Price, Options, Purchase */}
        <div className="lg:col-span-6 space-y-5">
          
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
              <span className="font-semibold text-vintage-accent uppercase tracking-wider">{product.categoryName}</span>
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-stone-500 font-normal">({product.reviewsCount} отзывов)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-retro text-stone-900 leading-tight">
              {product.title}
            </h1>

            <p className="text-sm text-stone-600 font-sans leading-relaxed mt-2.5">
              {product.description}
            </p>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-baseline gap-3 flex-wrap">
            <div className="font-mono font-bold text-2xl sm:text-3xl text-stone-900">
              {product.price.toLocaleString('ru-RU')} ₽
            </div>
            {product.oldPrice && (
              <div className="font-mono text-sm text-stone-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </div>
            )}
            {product.oldPrice && (
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Экономия {(product.oldPrice - product.price).toLocaleString('ru-RU')} ₽
              </span>
            )}
            <div className="ml-auto inline-flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              В наличии в мастерской
            </div>
          </div>

          {/* Options Selector (e.g. Switch variant) */}
          {product.options && product.options.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-stone-700">
                Конфигурация / Свитчи:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-sm ring-1 ring-stone-900'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart Row */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              
              {/* Quantity Counter */}
              <div className="flex items-center border border-stone-300 rounded-lg bg-white h-11 px-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded font-mono font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-9 text-center font-mono font-bold text-sm text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded font-mono font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 rounded-lg text-sm font-mono font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isAddedRecently
                    ? 'bg-emerald-600 text-white'
                    : 'bg-vintage-accent hover:bg-vintage-accentHover text-white active:scale-98'
                }`}
              >
                {isAddedRecently ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Добавить в корзину • {(product.price * quantity).toLocaleString('ru-RU')} ₽</span>
                  </>
                )}
              </button>

              {/* Favorite Button */}
              <button
                onClick={handleToggleFav}
                className={`h-11 w-11 rounded-lg border flex items-center justify-center transition-all ${
                  favorited
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
                title={favorited ? 'В избранном' : 'В избранное'}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Официальная гарантия, быстрая замена комплектующих и поддержка мастера</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Section: Specifications / Box Contents / Reviews */}
      <div className="pt-6 border-t border-stone-200">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 flex-wrap">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'specs'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Характеристики
          </button>
          <button
            onClick={() => setActiveTab('box')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'box'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Комплектация
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'reviews'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Отзывы ({product.reviewsCount})
          </button>
        </div>

        {/* Tab Content: Specifications */}
        {activeTab === 'specs' && (
          <div className="py-6 max-w-3xl">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-xs">
              {product.specs && Object.entries(product.specs).map(([key, val], idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs font-mono">
                  <span className="text-stone-500 font-medium">{key}</span>
                  <span className="sm:col-span-2 text-stone-900 font-semibold">{val}</span>
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs font-mono bg-cream-50/50">
                <span className="text-stone-500 font-medium">Артикул товара</span>
                <span className="sm:col-span-2 text-stone-700">{product.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Package Contents */}
        {activeTab === 'box' && (
          <div className="py-6 max-w-3xl">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold font-retro text-stone-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-vintage-accent" />
                <span>Что входит в комплект поставки:</span>
              </h3>
              <ul className="space-y-2 text-xs font-mono text-stone-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                  <span>Фирменная кастомная клавиатура KeyCraft {product.title}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                  <span>Витой авиатор-кабель USB Type-C в нейлоновой оплетке (1.8м)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                  <span>Двойной стальной пуллер для кейкапов и свитчей</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                  <span>3 запасных механических переключателя и акцентные кейкапы</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                  <span>Гарантийный талон мастерской с индивидуальным номером сборки</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-6 space-y-4 max-w-3xl">
            {sampleReviews.map((rev, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 rounded">
                        Проверенная покупка
                      </span>
                    )}
                  </div>
                  <span className="text-stone-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Related Products Section */}
      <div className="pt-8 border-t border-stone-200 space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-retro text-stone-900">
            Похожие и рекомендуемые товары
          </h2>
          <p className="text-xs text-stone-500 font-mono mt-0.5">
            Комплектующие и аксессуары, идеально сочетающиеся с этой моделью
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {relatedProducts.map(rel => (
            <ProductCard
              key={rel.id}
              product={rel}
              layout="grid"
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
