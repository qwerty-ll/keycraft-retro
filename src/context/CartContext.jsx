import { createContext, useContext, useState } from 'react';
import { PROMOCODES } from '../data/products';
import { usePersistentState } from '../hooks/usePersistentState';
import { useTimedValue } from '../hooks/useTimedValue';

const CartContext = createContext();

const FREE_DELIVERY_FROM = 5000;
const DELIVERY_PRICE = 350;

const defaultOption = (product) => product.options?.[0] ?? 'Стандарт';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = usePersistentState('keycraft_retro_cart_v1', []);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, showToast] = useTimedValue(3500);

  const addToCart = (product, quantity = 1, selectedOption = null) => {
    const opt = selectedOption || defaultOption(product);
    const id = `${product.id}-${opt}`;

    setCartItems((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item))
        : [...prev, { id, product, quantity, selectedOption: opt, addedAt: Date.now() }]
    );
    showToast(`«${product.title}» добавлен в корзину`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === cartItemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!PROMOCODES[cleanCode]) {
      setPromoError('Неверный промокод (попробуйте VINTAGE10 или THOCK20)');
      return false;
    }
    setAppliedPromo({ code: cleanCode, ...PROMOCODES[cleanCode] });
    setPromoError('');
    showToast(`Промокод ${cleanCode} успешно применён!`);
    return true;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);
  const deliveryCost = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_PRICE;

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

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeFromCart, clearCart,
      appliedPromo, promoError, applyPromo, removePromo,
      totalItems, subtotal, discountAmount, totalPrice, deliveryCost,
      isCartOpen, setIsCartOpen, isCheckoutOpen, setIsCheckoutOpen,
      createOrder, toastMessage,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
