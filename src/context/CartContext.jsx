import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMOCODES } from '../data/products';

const CartContext = createContext();

const CART_STORAGE_KEY = 'keycraft_retro_cart_v1';
const ORDERS_STORAGE_KEY = 'keycraft_retro_orders_v1';

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Ошибка загрузки корзины из localStorage:', e);
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Ошибка сохранения корзины в localStorage:', e);
    }
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1, selectedOption = null) => {
    const opt = selectedOption || (product.options && product.options.length > 0 ? product.options[0] : 'Стандарт');
    
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedOption === opt);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          id: `${product.id}-${opt}`,
          product,
          quantity,
          selectedOption: opt,
          addedAt: Date.now()
        }];
      }
    });

    showToast(`«${product.title}» добавлен в корзину`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (PROMOCODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...PROMOCODES[cleanCode]
      });
      setPromoError('');
      showToast(`Промокод ${cleanCode} успешно применён!`);
      return true;
    } else {
      setPromoError('Неверный промокод (попробуйте VINTAGE10 или THOCK20)');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.discountPercent) / 100) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  const createOrder = (customerData) => {
    const orderNumber = `KC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal,
      discountAmount,
      totalPrice,
      promoCode: appliedPromo?.code || null,
      customer: customerData,
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Ошибка сохранения заказа:', e);
    }

    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
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
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      createOrder,
      toastMessage,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
}
