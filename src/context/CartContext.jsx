// Корзина для всего сайта: товары, промокод, итоги, заказ, всплывашки
import { createContext, useContext, useState } from 'react';
import { PROMOCODES } from '../data/products';
import { usePersistentState } from '../hooks/usePersistentState';
import { useTimedValue } from '../hooks/useTimedValue';

// «Канал», через который корзина доступна любому компоненту
const CartContext = createContext();

// Бесплатная доставка от 5000 ₽, иначе 350 ₽
const FREE_DELIVERY_FROM = 5000;
const DELIVERY_PRICE = 350;

// Вариант по умолчанию — первый из списка
const defaultOption = (product) => product.options?.[0] ?? 'Стандарт';

// Провайдер: хранит корзину и раздаёт её всем вложенным компонентам
export function CartProvider({ children }) {
  // Корзина и промокод сохраняются в localStorage, остальное — только в памяти
  const [cartItems, setCartItems] = usePersistentState('keycraft_retro_cart_v1', []);
  const [appliedPromo, setAppliedPromo] = usePersistentState('keycraft_retro_promo_v1', null);
  const [promoError, setPromoError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useTimedValue(2500);

  // Тост «добавлено» — только когда корзина закрыта (иначе всё и так видно)
  const showToast = (text) => {
    if (!isCartOpen) setToast({ text, id: Date.now() });
  };
  const hideToast = () => setToast(null);

  // silent: место вызова само показывает результат (счётчик на карточке и т.п.)
  const addToCart = (product, quantity = 1, selectedOption = null, { silent = false } = {}) => {
    const opt = selectedOption || defaultOption(product);
    const id = `${product.id}-${opt}`;

    setCartItems((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item))
        : [...prev, { id, product, quantity, selectedOption: opt, addedAt: Date.now() }]
    );
    if (!silent) showToast(`«${product.title}» добавлен в корзину`);
  };

  // Сколько штук товара в корзине (по всем вариантам)
  const productQty = (productId) =>
    cartItems.reduce((acc, item) => (item.product.id === productId ? acc + item.quantity : acc), 0);

  // Минус одна штука товара — с последней добавленной позиции
  const decrementProduct = (productId) => {
    const item = cartItems.findLast((i) => i.product.id === productId);
    if (item) updateQuantity(item.id, -1);
  };

  // Изменить количество позиции; если стало 0 — позиция удаляется
  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Удалить позицию целиком
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Очистить корзину вместе с промокодом
  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  // Проверить промокод (регистр не важен) и применить
  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!PROMOCODES[cleanCode]) {
      setPromoError('Неверный промокод (попробуйте VINTAGE10 или THOCK20)');
      return false;
    }
    setAppliedPromo({ code: cleanCode, ...PROMOCODES[cleanCode] });
    setPromoError('');
    return true;
  };

  // Убрать промокод
  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Итоги считаем на лету из корзины, а не храним отдельно
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);
  const deliveryCost = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;
  const freeDeliveryLeft = Math.max(0, FREE_DELIVERY_FROM - subtotal);

  // Оформить заказ: собрать данные, сохранить в браузере, очистить корзину
  const createOrder = (customerData) => {
    const newOrder = {
      orderNumber: `KC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal,
      discountAmount,
      totalPrice,
      promoCode: appliedPromo?.code || null,
      customer: customerData,
    };

    try {
      const key = 'keycraft_retro_orders_v1';
      localStorage.setItem(key, JSON.stringify([newOrder, ...JSON.parse(localStorage.getItem(key) || '[]')]));
    } catch (e) {
      console.error('Ошибка сохранения заказа:', e);
    }

    clearCart();
    return newOrder;
  };

  // Отдаём наружу всё, что доступно через useCart()
  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeFromCart, clearCart, productQty, decrementProduct,
      appliedPromo, promoError, applyPromo, removePromo,
      totalItems, subtotal, discountAmount, totalPrice, deliveryCost, freeDeliveryLeft,
      isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen,
      createOrder, toast, showToast, hideToast,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Короткий способ достать корзину в любом компоненте
export function useCart() {
  return useContext(CartContext);
}
