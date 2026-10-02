import { ShoppingBag, Star, Check, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTimedValue } from '../../hooks/useTimedValue';
import { rub } from '../../utils/format';

// Сетка или список карточек
export function ProductList({ products, layout = 'grid', onOpenProduct }) {
  return (
    <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} layout={layout} onOpenProduct={onOpenProduct} />
      ))}
    </div>
  );
}

export function ProductCard({ product, onOpenProduct, layout = 'grid' }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAddedRecently, flashAdded] = useTimedValue(1500);
  const favorited = isFavorite(product.id);
  const isList = layout === 'list';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    flashAdded();
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(product.id, product.title);
  };

  const imageOverlays = (
    <>
      {product.badge && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-stone-900/85 text-white font-mono text-[10px] font-medium tracking-wide">
          {product.badge}
        </div>
      )}
      <button
        onClick={handleToggleFav}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur hover:bg-white text-stone-700 transition-transform active:scale-90 shadow-sm"
        aria-label="Добавить в избранное"
      >
        <Heart className={`w-4 h-4 ${favorited ? 'text-red-500 fill-red-500' : 'text-stone-500 hover:text-red-500'}`} />
      </button>
    </>
  );

  const image = <img src={product.image} alt={product.title} className="w-full h-full object-cover" loading="lazy" />;

  const rating = (
    <div className="flex items-center gap-1 text-amber-600 font-semibold">
      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
      <span>{product.rating}</span>
      {isList && <span className="text-stone-400 font-normal">({product.reviewsCount} отзывов)</span>}
    </div>
  );

  const price = (
    <div className={isList ? 'sm:text-right' : ''}>
      <div className={`font-mono font-bold text-stone-900 ${isList ? 'text-lg sm:text-xl' : 'text-base'}`}>
        {rub(product.price)}
      </div>
      {product.oldPrice && (
        <div className={`font-mono text-stone-400 line-through ${isList ? 'text-xs' : 'text-[11px]'}`}>
          {rub(product.oldPrice)}
        </div>
      )}
    </div>
  );

  const cartButton = (
    <button
      onClick={handleAddToCart}
      className={`btn-retro text-xs ${isList ? 'py-2 px-3.5' : 'py-1.5 px-3'} flex items-center gap-1.5 transition-all shadow-sm ${
        isAddedRecently ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-900 text-white hover:bg-stone-800'
      }`}
      aria-label={isList ? undefined : 'Добавить в корзину'}
    >
      {isAddedRecently ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
      <span>{isAddedRecently ? 'В корзине' : 'В корзину'}</span>
    </button>
  );

  const cardClass = 'card-retro card-retro-hover overflow-hidden bg-white group select-none cursor-pointer transition-all border border-stone-200';
  const open = () => onOpenProduct?.(product.id);

  if (isList) {
    return (
      <div onClick={open} className={`${cardClass} flex flex-col sm:flex-row items-stretch p-3 sm:p-4 gap-4`}>
        <div className="relative w-full sm:w-48 sm:h-36 h-48 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200/80">
          {image}
          {imageOverlays}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1 flex-wrap">
              <span className="font-semibold text-vintage-accent">{product.categoryName}</span>
              <span>•</span>
              {rating}
              <span className="inline-flex items-center gap-1 px-1.5 rounded text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200">
                В наличии
              </span>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-stone-900 group-hover:text-vintage-accent transition-colors leading-snug">
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        <div className="sm:w-44 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-stone-100 pt-3 sm:pt-0 sm:pl-4 shrink-0 gap-3">
          {price}
          <div className="flex items-center gap-2">{cartButton}</div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={open} className={`${cardClass} flex flex-col justify-between`}>
      <div className="relative p-3 pb-0">
        <div className="relative w-full h-44 sm:h-48 bg-stone-100 rounded-lg overflow-hidden border border-stone-200/80">
          {image}
          {imageOverlays}
          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
            <span className="btn-retro text-xs py-1 px-3 bg-white text-stone-800 flex items-center gap-1 font-medium shadow-sm">
              <span>Подробнее о товаре</span>
              <ArrowRight className="w-3 h-3 text-vintage-accent" />
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
            <span>{product.categoryName}</span>
            {rating}
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-stone-900 line-clamp-2 group-hover:text-vintage-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-0.5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-stone-600 bg-stone-100 border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            В наличии
          </span>
          <span className="text-[11px] font-mono text-stone-400">{product.reviewsCount} отзывов</span>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          {price}
          {cartButton}
        </div>
      </div>
    </div>
  );
}
