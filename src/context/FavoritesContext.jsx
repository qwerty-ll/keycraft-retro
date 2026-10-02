import { createContext, useContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { useTimedValue } from '../hooks/useTimedValue';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState('keycraft_retro_favorites_v1', []);
  const [favToastMessage, showToast] = useTimedValue(2800);

  const isFavorite = (productId) => favorites.includes(productId);

  const toggleFavorite = (productId, productName = 'Товар') => {
    const removing = isFavorite(productId);
    showToast(`${removing ? 'Удалено из избранного' : 'Добавлено в избранное'}: ${productName}`);
    setFavorites((prev) => (removing ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const clearFavorites = () => {
    setFavorites([]);
    showToast('Список избранного очищен');
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoritesCount: favorites.length, toggleFavorite, isFavorite, clearFavorites, favToastMessage }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
