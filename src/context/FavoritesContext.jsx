import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = 'keycraft_retro_favorites_v1';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Ошибка загрузки избранного:', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Ошибка сохранения избранного:', e);
    }
  }, [favorites]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleFavorite = (productId, productName = '') => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        showToast(`Удалено из избранного: ${productName || 'Товар'}`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Добавлено в избранное: ${productName || 'Товар'}`);
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const clearFavorites = () => {
    setFavorites([]);
    showToast('Список избранного очищен');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favToastMessage: toastMessage,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
