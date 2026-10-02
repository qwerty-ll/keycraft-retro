// избранное для всего сайта
import { createContext, useContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';

const FavoritesContext = createContext();

// избранное
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState('keycraft_retro_favorites_v1', []);

  // есть ли товар в избранном
  const isFavorite = (productId) => favorites.includes(productId);

  // добавить или убрать из избранного
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

// достать избранное
export function useFavorites() {
  return useContext(FavoritesContext);
}
