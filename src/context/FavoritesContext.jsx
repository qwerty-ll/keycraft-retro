import { createContext, useContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';

const FavoritesContext = createContext();

// Без тостов: результат и так виден (сердце на карточке + счётчик в меню)
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState('keycraft_retro_favorites_v1', []);

  const isFavorite = (productId) => favorites.includes(productId);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, favoritesCount: favorites.length, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
