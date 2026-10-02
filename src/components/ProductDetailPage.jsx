// страница товара
import { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, Heart, Check, ShieldCheck, Truck, Wrench, Package, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTimedValue } from '../hooks/useTimedValue';
import { ProductList } from './Catalog/ProductCard';
import { rub } from '../utils/format';

// преимущества
const VALUE_BADGES = [
  [ShieldCheck, 'Гарантия 12 мес.', 'Сервис мастерской'],
  [Truck, 'Быстрая доставка', 'СДЭК по всей РФ'],
  [Wrench, 'Ручная сборка', 'Контроль качества'],
];

// комплектация
const BOX_CONTENTS = (title) => [
  `Фирменная кастомная клавиатура KeyCraft ${title}`,
  'Витой авиатор-кабель USB Type-C в нейлоновой оплетке (1.8м)',
  'Двойной стальной пуллер для кейкапов и свитчей',
  '3 запасных механических переключателя и акцентные кейкапы',
  'Гарантийный талон мастерской с индивидуальным номером сборки',
];

// отзывы
const SAMPLE_REVIEWS = [
  {
    author: 'Александр В.',
    date: '12 сентября 2026',
    text: 'Великолепная сборка! Корпус из массива ореха невероятно тактильный и тяжелый — клавиатура стоит на столе как влитая. Звук глубокий и чистый, стабилизаторы смазаны с завода идеально.',
  },
  {
    author: 'Михаил К.',
    date: '28 августа 2026',
    text: 'Брал для ежедневной работы за кодом. Печатать сплошное удовольствие. Доставка СДЭКом за 2 дня, упаковано в плотную фирменную коробку с демпферами.',
  },
  {
    author: 'Екатерина С.',
    date: '15 августа 2026',
    text: 'Выглядит как винтажное произведение искусства. Отдельное спасибо консультанту в чате за помощь с выбором свитчей!',
  },
];

export function ProductDetailPage({ 
  productId, 
  onBackToCatalog, 
  onOpenProduct 
}) {
  const { addToCart, productQty, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  // ищем товар
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  // вариант количество и открытая вкладка
  const [selectedOption, setSelectedOption] = useState(product.options?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedRecently, flashAdded] = useTimedValue(1800);
  const [activeTab, setActiveTab] = useState('specs');

  const favorited = isFavorite(product.id);
  const inCart = productQty(product.id);
  const handleToggleFav = () => toggleFavorite(product.id);
  // добавить в корзину
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption, { silent: true });
    flashAdded();
  };

  // похожие товары
  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const relatedProducts = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, 3);

  // вкладки
  const tabs = [
    ['specs', 'Характеристики'],
    ['box', 'Комплектация'],
    ['reviews', `Отзывы (${product.reviewsCount})`],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      
      {/* кнопка назад */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg px-3 py-1.5 transition-colors"
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

      {/* основной блок */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* фото */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full bg-white rounded-2xl border border-stone-300 overflow-hidden shadow-sm flex items-center justify-center p-4 sm:p-6 group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-500"
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

          {/* преимущества */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            {VALUE_BADGES.map(([Icon, title, text]) => (
              <div key={title} className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
                <Icon className="w-5 h-5 text-vintage-accent mx-auto" />
                <div className="text-[11px] font-mono font-bold text-stone-900">{title}</div>
                <div className="text-[10px] text-stone-500">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* правая колонка */}
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

          {/* цена */}
          <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-baseline gap-3 flex-wrap">
            <div className="font-mono font-bold text-2xl sm:text-3xl text-stone-900">
              {rub(product.price)}
            </div>
            {product.oldPrice && (
              <div className="font-mono text-sm text-stone-400 line-through">
                {rub(product.oldPrice)}
              </div>
            )}
            {product.oldPrice && (
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Экономия {rub(product.oldPrice - product.price)}
              </span>
            )}
            <div className="ml-auto inline-flex items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              В наличии в мастерской
            </div>
          </div>

          {/* выбор варианта */}
          {product.options?.length > 0 && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-stone-700">
                Конфигурация / Свитчи:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={opt}
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

          {/* количество и кнопка в корзину */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              
              {/* счётчик */}
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

              {/* кнопка в корзину */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 px-6 rounded-lg text-sm font-mono font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isAddedRecently
                    ? 'bg-emerald-600 text-white'
                    : 'bg-vintage-accent hover:bg-vintage-accentHover text-white'
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
                    <span>Добавить в корзину • {rub(product.price * quantity)}</span>
                  </>
                )}
              </button>

              {/* сердечко */}
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

            {inCart > 0 && (
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-vintage-accentLight border border-vintage-accent/30 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-stone-800">
                  <ShoppingBag className="w-3.5 h-3.5 text-vintage-accent" />
                  В корзине уже <strong>{inCart} шт.</strong>
                </span>
                <button onClick={() => setIsCartOpen(true)} className="text-vintage-accent font-semibold hover:underline">
                  Открыть корзину →
                </button>
              </div>
            )}

            <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Официальная гарантия, быстрая замена комплектующих и поддержка мастера</span>
            </div>
          </div>

        </div>

      </div>

      {/* вкладки */}
      <div className="pt-6 border-t border-stone-200">
        
        {/* кнопки вкладок */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 flex-wrap">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === id ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* характеристики */}
        {activeTab === 'specs' && (
          <div className="py-6 max-w-3xl">
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs font-mono">
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

        {/* комплектация */}
        {activeTab === 'box' && (
          <div className="py-6 max-w-3xl">
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
              <h3 className="text-sm font-bold font-retro text-stone-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-vintage-accent" />
                <span>Что входит в комплект поставки:</span>
              </h3>
              <ul className="space-y-2 text-xs font-mono text-stone-700">
                {BOX_CONTENTS(product.title).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vintage-accent"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* отзывы */}
        {activeTab === 'reviews' && (
          <div className="py-6 space-y-4 max-w-3xl">
            {SAMPLE_REVIEWS.map((rev) => (
              <div key={rev.author} className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{rev.author}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 rounded">
                      Проверенная покупка
                    </span>
                  </div>
                  <span className="text-stone-400">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
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

      {/* похожие товары */}
      <div className="pt-8 border-t border-stone-200 space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-retro text-stone-900">
            Похожие и рекомендуемые товары
          </h2>
          <p className="text-xs text-stone-500 font-mono mt-0.5">
            Комплектующие и аксессуары, идеально сочетающиеся с этой моделью
          </p>
        </div>

        <ProductList products={relatedProducts} onOpenProduct={onOpenProduct} />
      </div>

    </div>
  );
}
